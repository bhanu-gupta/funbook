# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  author_id  :integer          not null
#  post_id    :integer          not null
#  parent_id  :integer
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ApplicationRecord 

    validates :author_id, :post_id, :body, null: false 

    belongs_to :parent_comment,
        primary_key: :id,
        foreign_key: :parent_id,
        class_name: :Comment,
        dependent: :destroy
    
    belongs_to :author,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :user

    belongs_to :post
end
