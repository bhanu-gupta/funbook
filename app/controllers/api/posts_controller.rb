class Api::PostsController < ApplicationController

    def index
        user_id = params[:user_id] || current_user.id 
        @posts = Post.where(user_id: user_id).order("created_at DESC")
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
            @post.destroy
            render json: ['Post successfully removed']
        else 
            render json: ["You can delete your own posts"], status: 422
        end
    end

    private

    def post_params
        params.require(:post).permit(:body, :user_id)
    end
end