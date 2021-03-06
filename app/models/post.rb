# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  body       :text
#  author_id  :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Post < ApplicationRecord
    validates :author_id, :user_id, presence: true

    belongs_to :user

    belongs_to :author,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :User
    
    has_many :comments,  -> { order("comments.created_at ASC") }

    has_many_attached :photos
end
