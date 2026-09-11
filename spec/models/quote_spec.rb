require "rails_helper"

RSpec.describe Quote, type: :model do
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

  it "requires a positive price" do
    expect(Quote.new(service: service, price_cents: 0)).not_to be_valid
    expect(Quote.new(service: service, price_cents: -100)).not_to be_valid
    expect(Quote.new(service: service, price_cents: 45_000_00)).to be_valid
  end

  it "converts cents to a shilling price" do
    quote = Quote.new(service: service, price_cents: 45_000_00)
    expect(quote.price).to eq(45_000.0)
  end
end
