json.key_format! camelize: :lower
users_arr = []

json.posts do
    @posts.each do |post|
        json.set! post.id do 
            json.extract! post, :id, :body, :user_id, :author_id, :created_at, :updated_at
            json.comment_ids post.comments.pluck(:id)
        end
        users_arr.push(post.author)
    end
end

json.comments do 
    @post.comments.each do |comment|
        json.set! comment.id do 
            json.extract! comment, :id, :body, :post_id, :author_id, :parent_id, :created_at, :updated_at
        end
        users_arr.push(comment.author)
    end
end

json.users do
    users_arr.each do |user|
        json.set! user.id do
            json.partial! 'api/users/user', user: user
        end
    end
end


