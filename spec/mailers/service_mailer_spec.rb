require "rails_helper"

RSpec.describe ServiceMailer, type: :mailer do
  let(:admin) { Client.create!(email: "admin@example.com", password: "password123", admin: true) }
  let(:client) { Client.create!(email: "client@example.com", password: "password123") }
  let(:service) do
    client.services.create!(
      service: "Interior painting",
      location: "Kilimani Duplex",
      address: "Off Argwings Kodhek Rd",
      contact_info: "+254712345678",
      description: "Repaint the living room."
    )
  end

  describe "new_request_notification" do
    before { admin }
    let(:mail) { ServiceMailer.new_request_notification(service) }

    it "is sent to every admin client" do
      expect(mail.to).to eq(["admin@example.com"])
    end

    it "mentions the requesting client and the service" do
      expect(mail.body.encoded).to include("client@example.com")
      expect(mail.body.encoded).to include("Interior painting")
    end

    it "sends nothing when there are no admins" do
      admin.destroy
      expect { ServiceMailer.new_request_notification(service).deliver_now }
        .not_to change { ActionMailer::Base.deliveries.count }
    end
  end

  describe "quote_issued" do
    let(:quote) do
      service.receive_quote!(price_cents: 45_000_00, notes: "Includes materials.")
      service.quote
    end
    let(:mail) { ServiceMailer.quote_issued(quote) }

    it "is sent to the requesting client" do
      expect(mail.to).to eq(["client@example.com"])
    end

    it "includes the price and notes" do
      expect(mail.body.encoded).to include("45,000")
      expect(mail.body.encoded).to include("Includes materials.")
    end
  end
end
