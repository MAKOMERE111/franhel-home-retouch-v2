require "rails_helper"

RSpec.describe Client, type: :model do
  it "is not an admin by default" do
    client = Client.create!(email: "client@example.com", password: "password123")
    expect(client.admin?).to be false
  end

  it "destroys its services when destroyed" do
    client = Client.create!(email: "client@example.com", password: "password123")
    client.services.create!(
      service: "Plumbing",
      location: "Kilimani Duplex",
      address: "Off Argwings Kodhek Rd",
      contact_info: "+254712345678",
      description: "Fix a leaking pipe."
    )

    expect { client.destroy }.to change(Service, :count).by(-1)
  end

  describe "#display_name" do
    it "uses the name when present" do
      client = Client.create!(email: "client@example.com", password: "password123", name: "Amina")
      expect(client.display_name).to eq("Amina")
    end

    it "falls back to the email's local part when no name is set" do
      client = Client.create!(email: "client@example.com", password: "password123")
      expect(client.display_name).to eq("client")
    end
  end
end
