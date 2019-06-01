class CreateFriends < ActiveRecord::Migration[5.2]
  def change
    create_table :friends do |t|
      t.integer :requestor_id, null:false
      t.integer :receiver_id, null: false
      t.string :status, null: false, default: 'pending'
      t.timestamps
    end
    add_index :friends, :requestor_id
    add_index :friends, :receiver_id
  end
end
