require "rails_helper"

RSpec.describe ServiceCatalogEntry, type: :model do
  it "requires a name" do
    expect(ServiceCatalogEntry.new(price_shillings: 100)).not_to be_valid
  end

  it "requires a positive price" do
    expect(ServiceCatalogEntry.new(name: "Painting", price_shillings: 0)).not_to be_valid
    expect(ServiceCatalogEntry.new(name: "Painting", price_shillings: 100)).to be_valid
  end

  it "stores price_shillings as price_cents" do
    entry = ServiceCatalogEntry.new(name: "Painting", price_shillings: 450)
    expect(entry.price_cents).to eq(45_000)
    expect(entry.price).to eq(450.0)
  end
end
