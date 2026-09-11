class CreateQuotes < ActiveRecord::Migration[8.1]
  def change
    create_table :quotes do |t|
      t.references :service, null: false, foreign_key: true
      t.integer :price_cents, null: false
      t.text :notes

      t.timestamps
    end
  end
end
