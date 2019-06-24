json.key_format! camelize: :lower
json.friends do
    @friends.each do |friend|
        json.set! friend.id do
            json.key_format! camelize: :lower
            json.extract! friend, :id, :username, :first_name, :last_name, :bio
            json.friend_ids friend.get_all_friend_ids
            json.profilePhoto url_for(friend.profile_photo) if friend.profile_photo.attached?
        end
    end
end

json.user do 
    json.partial! 'api/users/user', user: @user if current_user.id != @user.id
end