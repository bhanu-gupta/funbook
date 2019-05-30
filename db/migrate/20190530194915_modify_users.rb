class ModifyUsers < ActiveRecord::Migration[5.2]
  def change
    remove_index :users, :username
    change_column :users, :username, :string, :null => true
  end
end
