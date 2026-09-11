require "rails_helper"

RSpec.describe Service, type: :model do
  let(:client) { Client.create!(email: "client@example.com", password: "password123") }

  def build_service(attrs = {})
    client.services.build({
      service: "Interior painting",
      location: "Kilimani Duplex",
      address: "Off Argwings Kodhek Rd",
      contact_info: "+254712345678",
      description: "Repaint the living room and hallway."
    }.merge(attrs))
  end

  describe "validations" do
    it "is valid with all required attributes" do
      expect(build_service).to be_valid
    end

    it "requires a service type" do
      expect(build_service(service: nil)).not_to be_valid
    end

    it "requires a location" do
      expect(build_service(location: nil)).not_to be_valid
    end

    it "requires an address" do
      expect(build_service(address: nil)).not_to be_valid
    end

    it "requires contact_info between 10 and 13 characters" do
      expect(build_service(contact_info: "12345")).not_to be_valid
      expect(build_service(contact_info: "+254712345678")).to be_valid
    end
  end

  describe "status" do
    it "defaults to requested" do
      service = build_service
      service.save!
      expect(service.status).to eq("requested")
      expect(service.requested?).to be true
    end

    it "moves through the intended lifecycle" do
      service = build_service
      service.save!

      service.send_quote!
      expect(service.status).to eq("quoted")

      service.schedule!
      expect(service.status).to eq("scheduled")

      service.complete!
      expect(service.status).to eq("completed")
    end

    it "can be cancelled from requested, quoted, or scheduled" do
      service = build_service
      service.save!

      expect { service.cancel! }.to change { service.status }.to("cancelled")
    end

    it "cannot be cancelled once completed" do
      service = build_service
      service.save!
      service.send_quote!
      service.schedule!
      service.complete!

      expect { service.cancel! }.to raise_error(AASM::InvalidTransition)
    end

    it "cannot skip from requested straight to scheduled" do
      service = build_service
      service.save!

      expect { service.schedule! }.to raise_error(AASM::InvalidTransition)
    end
  end
end
