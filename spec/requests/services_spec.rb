require "rails_helper"

RSpec.describe "Services", type: :request do
  let(:owner) { Client.create!(email: "owner@example.com", password: "password123") }
  let(:other_client) { Client.create!(email: "other@example.com", password: "password123") }
  let(:admin) { Client.create!(email: "admin@example.com", password: "password123", admin: true) }

  let!(:owners_service) do
    owner.services.create!(
      service: "Electrical installation",
      location: "Kilimani Duplex",
      address: "Off Argwings Kodhek Rd",
      contact_info: "+254712345678",
      description: "Rewire the kitchen."
    )
  end

  it "redirects to sign in when not authenticated" do
    get service_path(owners_service)
    expect(response).to redirect_to(new_client_session_path)
  end

  describe "as the owning client" do
    before { sign_in owner }

    it "can view its own service" do
      get service_path(owners_service)
      expect(response).to have_http_status(:ok)
    end

    it "only lists its own services in the index" do
      other_client.services.create!(
        service: "Plumbing",
        location: "Other Apartment",
        address: "Elsewhere",
        contact_info: "+254700000000",
        description: "Unrelated request."
      )

      get services_path
      expect(response.body).to include(owners_service.service)
      expect(response.body).not_to include("Other Apartment")
    end

    it "cannot set its own status via update" do
      patch service_path(owners_service), params: { service: { status: "completed" } }
      expect(owners_service.reload.status).to eq("requested")
    end
  end

  describe "as a different client" do
    before { sign_in other_client }

    it "cannot view another client's service" do
      get service_path(owners_service)
      expect(response).to redirect_to(services_path)
    end

    it "cannot update another client's service" do
      patch service_path(owners_service), params: { service: { description: "Hijacked" } }
      expect(owners_service.reload.description).to eq("Rewire the kitchen.")
    end

    it "cannot delete another client's service" do
      expect { delete service_path(owners_service) }.not_to change(Service, :count)
    end
  end

  describe "as an admin" do
    before { sign_in admin }

    it "can view any client's service" do
      get service_path(owners_service)
      expect(response).to have_http_status(:ok)
    end

    it "can update the status of any client's service" do
      patch service_path(owners_service), params: { service: { status: "quoted" } }
      expect(owners_service.reload.status).to eq("quoted")
    end

    it "sees every client's services in the index" do
      other_client.services.create!(
        service: "Plumbing",
        location: "Other Apartment",
        address: "Elsewhere",
        contact_info: "+254700000000",
        description: "Unrelated request."
      )

      get services_path
      expect(response.body).to include(owners_service.service)
      expect(response.body).to include("Other Apartment")
    end
  end
end
