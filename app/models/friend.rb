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
end
