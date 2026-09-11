class CreateServices < ActiveRecord::Migration[8.1]
  def change
    create_table :services do |t|
      t.string :service
      t.string :location
      t.string :address
      t.string :contact_info
      t.string :description
      t.string :status, default: "requested", null: false
      t.references :client, null: false, foreign_key: true

      t.timestamps
    end
  end
end
