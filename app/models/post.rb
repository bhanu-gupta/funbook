# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  author_id  :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Post < ApplicationRecord
    validates :body, :author_id, :user_id, presence: true

    belongs_to :user

    belongs_to :author,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :User
    
    has_many :comments

    has_one_attached :photo
end
