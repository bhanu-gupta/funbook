json.key_format! camelize: :lower

json.friends do
    @top_friends.each do |friend|
        json.set! friend.id do
            json.partial! 'api/users/user', user: friend
        end
    end
end

json.user do 
    json.partial! 'api/users/user', user: @user
end