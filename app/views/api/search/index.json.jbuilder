json.key_format! camelize: :lower

userIds = []
postIds = []
postUsers = []

json.posts do 
    @posts.each do |post|
        json.set! post.id do 
            json.partial! 'api/posts/post', post: post
            postIds.push(post.id)
            postUsers.push(post.author)
            postUsers.push(post.user)
        end
    end
end

json.users do
    @users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :username, :email, :first_name, :last_name, :bio
            json.profilePhoto url_for(user.profile_photo) if user.profile_photo.attached?
            userIds.push(user.id)
        end
    end
    postUsers.each do |user|
        json.set! user.id do
            json.extract! user, :id, :username, :email, :first_name, :last_name, :bio
            json.profilePhoto url_for(user.profile_photo) if user.profile_photo.attached?
        end
    end
end

json.search do 
    json.userIds userIds
    json.postIds postIds
end