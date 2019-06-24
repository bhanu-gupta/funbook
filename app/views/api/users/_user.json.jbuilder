json.key_format! camelize: :lower
json.extract! user, :id, :username, :email, :first_name, :last_name, :gender, :birthday, :bio
all_friend_ids = user.get_all_friend_ids
json.friend_ids all_friend_ids
friends = all_friend_ids.dup.concat([user.id])
all_post_ids = Post.where(user_id: friends).order('posts.created_at DESC').pluck(:id)
json.postIds all_post_ids
json.profilePhoto url_for(user.profile_photo) if user.profile_photo.attached?
json.coverPhoto url_for(user.cover_photo) if user.cover_photo.attached?
if !params[:id] || (current_user.id == params[:id])
    json.received_friend_ids user.received_friend_ids
    json.sent_friend_ids user.sent_friend_ids
else 
    json.received_friend_ids []
    json.sent_friend_ids [] 
end