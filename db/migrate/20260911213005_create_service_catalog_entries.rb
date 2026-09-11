class CreateServiceCatalogEntries < ActiveRecord::Migration[8.1]
  def change
    create_table :service_catalog_entries do |t|
      t.string :name, null: false
      t.text :description
      t.integer :price_cents, null: false
      t.integer :duration_days

      t.timestamps
    end
  end
end
