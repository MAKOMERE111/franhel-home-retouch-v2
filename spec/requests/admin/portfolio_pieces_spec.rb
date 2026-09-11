require "rails_helper"

RSpec.describe "Admin::PortfolioPieces", type: :request do
  let(:client) { Client.create!(email: "client@example.com", password: "password123") }
  let(:admin) { Client.create!(email: "admin@example.com", password: "password123", admin: true) }

  describe "as a non-admin client" do
    before { sign_in client }

    it "is redirected away" do
      get admin_portfolio_pieces_path
      expect(response).to redirect_to(root_path)
    end
  end

  describe "as an admin" do
    before { sign_in admin }

    it "can create a portfolio piece" do
      expect {
        post admin_portfolio_pieces_path, params: {
          portfolio_piece: { title: "Riverside Garden", address: "Riverside Drive", service_type: "Interior design", year: 2025 }
        }
      }.to change(PortfolioPiece, :count).by(1)
    end

    it "can delete a portfolio piece" do
      piece = PortfolioPiece.create!(title: "Riverside Garden", address: "Riverside Drive", service_type: "Interior design")

      expect {
        delete admin_portfolio_piece_path(piece)
      }.to change(PortfolioPiece, :count).by(-1)
    end
  end
end
