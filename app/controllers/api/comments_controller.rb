class Api::CommentsController < ApplicationController

    def create
        @comment = Comment.new(comment_params)
        @comment.author_id = current_user.id
        if @comment.save
            render :create
        else
            render json: @comment.errors.full_messages
        end
    end

    def update
        @comment = current_user.authored_comments.find_by(id: params[:id])
        if @comment
            if @comment.update(comment_params)
                render :update
            else
                render json: @comment.errors.full_messages, status: 422
            end
        else
            render json: ["You can only edit your own comments"], status: 422
        end
    end

    def destroy
        comment = current_user.profile_comments.find_by(id: params[:id])
        if !comment
            comment = current_user.authored_comments.find_by(id: params[:id])
        end
        if comment
            @comment = comment
            if comment.destroy
                render :destroy
            end 
        else
            render json: ["You can only delete comments on your timeline"], status: 422
        end
    end

    private

    def comment_params
        params.require(:comment).permit(:post_id, :parent_id, :body)
    end
end