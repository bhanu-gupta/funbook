json.key_format! camelize: :lower
json.extract! user, :id, :username, :email, :first_name, :last_name, :gender, :birthday, :post_ids
json.friend_ids user.get_all_friend_ids
if !params[:id] || (current_user.id == params[:id])
    json.received_friend_ids user.received_friend_ids
    json.sent_friend_ids user.sent_friend_ids
else 
    json.received_friend_ids []
    json.sent_friend_ids []
end