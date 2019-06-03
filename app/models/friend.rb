# == Schema Information
#
# Table name: friends
#
#  id           :bigint           not null, primary key
#  requestor_id :integer          not null
#  receiver_id  :integer          not null
#  status       :string           default("pending"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Friend < ApplicationRecord
    validates :requestor_id, :receiver_id, :status, null: false

    belongs_to :receiver,
        primary_key: :id,
        foreign_key: :receiver_id,
        class_name: :User

    belongs_to :requestor,
        primary_key: :id,
        foreign_key: :requestor_id,
        class_name: :User

    
    def self.get_user_friends(user_id, status = null)
        friends = User.joins("INNER JOIN friends 
                            ON (friends.requestor_id = users.id 
                            OR friends.receiver_id = users.id)")
                    .where("(requestor_id = ? OR receiver_id = ?) 
                    AND users.id != ?", user_id, user_id, user_id)
        friends = friends.where('friends.status = ?', status) if status
        friends = friends.distinct
    end

    def self.get_top_friends(user_id)
        Friend.get_user_friends(user_id, "accepted").limit(9)
    end
end
