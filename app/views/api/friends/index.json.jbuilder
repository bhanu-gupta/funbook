json.key_format! camelize: :lower
json.friends do
    @friends.each do |friend|
        json.set! friend.id do
            json.extract! friend, :id, :username, :email, :first_name, :last_name, :gender, :birthday, :post_ids
        end
    end
end