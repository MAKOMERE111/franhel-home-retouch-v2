require "rails_helper"

RSpec.describe "Admin::ServiceCatalogEntries", type: :request do
  let(:client) { Client.create!(email: "client@example.com", password: "password123") }
  let(:admin) { Client.create!(email: "admin@example.com", password: "password123", admin: true) }

  describe "as a non-admin client" do
    before { sign_in client }

    it "is redirected away" do
      get admin_service_catalog_entries_path
      expect(response).to redirect_to(root_path)
    end
  end

  describe "as an admin" do
    before { sign_in admin }

    it "can create a catalog entry priced in shillings" do
      post admin_service_catalog_entries_path, params: {
        service_catalog_entry: { name: "Interior Painting", price_shillings: "45000", duration_days: 3 }
      }

      entry = ServiceCatalogEntry.last
      expect(entry.name).to eq("Interior Painting")
      expect(entry.price_cents).to eq(45_000_00)
    end

    it "can delete a catalog entry" do
      entry = ServiceCatalogEntry.create!(name: "Interior Painting", price_shillings: 45_000)

      expect {
        delete admin_service_catalog_entry_path(entry)
      }.to change(ServiceCatalogEntry, :count).by(-1)
    end
  end
end
