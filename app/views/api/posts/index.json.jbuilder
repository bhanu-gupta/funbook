json.key_format! camelize: :lower
json.array! @posts, :body, :user_id, :author_id
