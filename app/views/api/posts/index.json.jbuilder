json.key_format! camelize: :lower
users_arr = []
post_comments = []
json.posts do
    @posts.each do |post|
        json.set! post.id do 
            json.partial! 'api/posts/post', post: post
        end
        post_comments.concat(post.comments)
        users_arr.push(post.author)
    end
end

json.comments do 
    post_comments.each do |comment|
        json.set! comment.id do 
            json.partial! 'api/comments/comment', comment: comment
        end
        users_arr.push(comment.author)
    end
end

json.users do
    users_arr.each do |user|
        json.set! user.id do
            json.extract! user, :id, :username, :first_name, :last_name
            json.profilePhoto url_for(user.profile_photo) if user.profile_photo.attached?
        end
    end
end


