json.key_format! camelize: :lower
json.extract! user, :id, :username, :email, :first_name, :last_name, :gender, :birthday, :post_ids
if current_user.id == params[:id]
    json.received_friend_ids user.received_friend_requests.pluck(:requestor_id)
    json.sent_friend_ids user.sent_friend_requests.pluck(:receiver_id)
else 
    json.received_friend_ids []
    json.sent_friend_ids []
end