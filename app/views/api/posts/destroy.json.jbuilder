json.key_format! camelize: :lower
json.extract! @post, :id, :body, :user_id, :author_id, :created_at, :updated_at