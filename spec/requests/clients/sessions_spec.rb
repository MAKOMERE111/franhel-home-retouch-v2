require "rails_helper"

RSpec.describe "Clients::Sessions (JSON)", type: :request do
  let!(:client) { Client.create!(email: "client@example.com", password: "password123", name: "Amina") }

  it "signs in and returns client info as JSON, without redirecting" do
    post client_session_path, params: { client: { email: "client@example.com", password: "password123" } }.to_json,
      headers: { "Content-Type" => "application/json", "Accept" => "application/json" }

    expect(response).to have_http_status(:ok)
    expect(JSON.parse(response.body)).to eq({ "name" => "Amina", "admin" => false })
  end

  it "signs the client in for subsequent requests" do
    post client_session_path, params: { client: { email: "client@example.com", password: "password123" } }.to_json,
      headers: { "Content-Type" => "application/json", "Accept" => "application/json" }

    get services_path
    expect(response).to have_http_status(:ok)
  end

  it "returns 401 JSON on a bad password, without signing in" do
    post client_session_path, params: { client: { email: "client@example.com", password: "wrong" } }.to_json,
      headers: { "Content-Type" => "application/json", "Accept" => "application/json" }

    expect(response).to have_http_status(:unauthorized)
    expect(JSON.parse(response.body)).to eq({ "error" => "Invalid email or password." })

    get services_path
    expect(response).to redirect_to(new_client_session_path)
  end
end
