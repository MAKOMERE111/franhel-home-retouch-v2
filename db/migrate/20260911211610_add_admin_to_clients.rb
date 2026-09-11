class AddAdminToClients < ActiveRecord::Migration[8.1]
  def change
    add_column :clients, :admin, :boolean, default: false, null: false
  end
end
