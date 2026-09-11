# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

admin = Client.find_or_create_by!(email: "admin@franhelhomeretouch.example") do |c|
  c.name = "Franhel Admin"
  c.password = "changeme123"
  c.admin = true
end
puts "Seeded admin login -> #{admin.email} / password: changeme123 (change this before deploying to production)"

[
  { name: "Interior Painting", description: "Full room repaint, prep and two coats included.", price_shillings: 45_000, duration_days: 3 },
  { name: "Exterior Painting", description: "Weatherproof exterior repaint.", price_shillings: 74_000, duration_days: 5 },
  { name: "Plumbing Repair", description: "Diagnose and fix leaks, blockages, and fittings.", price_shillings: 5_000, duration_days: 1 },
  { name: "Electrical Installation", description: "Wiring, sockets, and fixture installation.", price_shillings: 6_000, duration_days: 2 }
].each do |attrs|
  ServiceCatalogEntry.find_or_create_by!(name: attrs[:name]) do |entry|
    entry.description = attrs[:description]
    entry.price_shillings = attrs[:price_shillings]
    entry.duration_days = attrs[:duration_days]
  end
end
puts "Seeded #{ServiceCatalogEntry.count} service catalog entries"
