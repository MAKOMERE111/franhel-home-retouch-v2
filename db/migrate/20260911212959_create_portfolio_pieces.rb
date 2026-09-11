class CreatePortfolioPieces < ActiveRecord::Migration[8.1]
  def change
    create_table :portfolio_pieces do |t|
      t.string :title, null: false
      t.string :address, null: false
      t.integer :year
      t.string :service_type, null: false

      t.timestamps
    end
  end
end
