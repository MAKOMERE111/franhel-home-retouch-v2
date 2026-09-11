class AddNameToClients < ActiveRecord::Migration[8.1]
  def change
    add_column :clients, :name, :string
  end
end
