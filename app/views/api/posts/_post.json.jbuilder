json.key_format! camelize: :lower
json.extract! post, :id, :body, :user_id, :author_id, :created_at, :updated_at, :comment_ids
json.photoUrls post.photos.map { |file| url_for(file) } if post.photos.attached?
json.attachments post.photos_attachment_ids