require "rails_helper"

RSpec.describe "Quotes", type: :request do
  let(:owner) { Client.create!(email: "owner@example.com", password: "password123") }
  let(:admin) { Client.create!(email: "admin@example.com", password: "password123", admin: true) }
  let!(:service) do
    owner.services.create!(
      service: "Interior painting",
      location: "Kilimani Duplex",
      address: "Off Argwings Kodhek Rd",
      contact_info: "+254712345678",
      description: "Repaint the living room."
    )
  end

  describe "as an admin" do
    before { sign_in admin }

    it "issues a quote and moves the service to quoted" do
      post service_quotes_path(service), params: { quote: { price_dollars: "45000", notes: "Includes materials." } }

      expect(service.reload.status).to eq("quoted")
      expect(service.quote.price_cents).to eq(45_000_00)
      expect(service.quote.notes).to eq("Includes materials.")
    end

    it "sends an email to the client" do
      expect {
        perform_enqueued_jobs do
          post service_quotes_path(service), params: { quote: { price_dollars: "45000" } }
        end
      }.to change { ActionMailer::Base.deliveries.count }.by(1)
    end

    it "rejects a zero or blank price" do
      post service_quotes_path(service), params: { quote: { price_dollars: "0" } }
      expect(service.reload.status).to eq("requested")
    end

    it "cannot quote a service twice" do
      service.receive_quote!(price_cents: 45_000_00)

      post service_quotes_path(service), params: { quote: { price_dollars: "50000" } }

      expect(service.reload.quote.price_cents).to eq(45_000_00)
    end
  end

  describe "as the owning client (not admin)" do
    before { sign_in owner }

    it "cannot issue a quote" do
      post service_quotes_path(service), params: { quote: { price_dollars: "45000" } }
      expect(service.reload.status).to eq("requested")
    end
  end
end
