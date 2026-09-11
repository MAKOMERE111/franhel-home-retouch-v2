require "rails_helper"

RSpec.describe PortfolioPiece, type: :model do
  def build_piece(attrs = {})
    PortfolioPiece.new({
      title: "Riverside Garden",
      address: "Riverside Drive",
      service_type: "Interior design",
      year: 2025
    }.merge(attrs))
  end

  it "is valid with title, address, and service_type" do
    expect(build_piece).to be_valid
  end

  it "requires a title" do
    expect(build_piece(title: nil)).not_to be_valid
  end

  it "requires an address" do
    expect(build_piece(address: nil)).not_to be_valid
  end

  it "requires a service_type" do
    expect(build_piece(service_type: nil)).not_to be_valid
  end

  it "does not require a year" do
    expect(build_piece(year: nil)).to be_valid
  end
end
