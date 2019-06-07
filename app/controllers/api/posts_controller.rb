class Api::PostsController < ApplicationController

    def index
        user_id = params[:user_id] || current_user.id
        if (params[:user_id]) 
            @posts = Post.with_attached_photos.includes([:author, comments: [:author, :parent_comment]]).where(user_id: params[:user_id])
        else
            friend_ids = current_user.get_all_friend_ids
            friend_ids.push(current_user.id)
            @posts = Post.with_attached_photos.includes([:author, comments: [:author, :parent_comment]]).where(user_id: friend_ids)
        end
        render :index
    end

    def create
        @post = current_user.authored_posts.new(post_params)
        if @post.save
            render :create
        else
            render json: @post.errors.full_messages 
        end
    end

    def update
        @post = current_user.authored_posts.find_by(id: params[:id])
        if @post 
            if @post.update(post_params)
                render :update
            else
                render json: @post.errors.full_messages, status: 422
            end 
        else
            render json: ["You can only edit your own posts"], status: 422
        end
    end

    def destroy
        @post = current_user.authored_posts.find_by(id: params[:id])
        if @post
            if @post.destroy
                @post.comments.destroy_all
                render json: ['Post successfully removed']
            end
        else 
            render json: ["You can only delete your own posts"], status: 422
        end
    end

    private

    def post_params
        params.require(:post).permit(:body, :user_id, photos: [])
    end
end