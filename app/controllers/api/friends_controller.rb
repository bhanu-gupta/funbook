class Api::FriendsController < ApplicationController
    
    def index
        user_id = params[:user_id] || current_user.id 
        if params[:type] == 'requests'
            @friends = User.get_user_friends(user_id, "pending")
        else
           @friends = User.get_user_friends(user_id, "accepted")
        end
        @user = (user_id != current_user.id) ? User.find_by(id: user_id) : current_user
        if @user
            render :index
        else
             render json: ['User does not exist'], status: 404
        end
    end

    def create
        @friend_request = current_user.sent_friend_requests.new(receiver_id: params[:user_id])
        if @friend_request.save
            render :friend_request
        else 
            render json: @friend_request.errors.full_messages
        end
    end

    def update
        @friend_request = current_user.received_friend_requests.find_by({requestor_id: params[:user_id]})
        if @friend_request
            if @friend_request.update({status: 'accepted'})
                render :friend_request
            else
                render json: @friend_request.errors.full_messages, status: 422
            end 
        else
            render json: [], status: 422
        end
    end

    def destroy
        friend_requests = Friend.where('(requestor_id=? AND receiver_id = ?) OR (receiver_id=? AND requestor_id = ?)', params[:user_id], current_user.id, params[:user_id], current_user.id)
        @friend_request = friend_requests.first
        if friend_requests
            if friend_requests.destroy_all
                render :friend_request
            end
        else 
            render json: [], status: 422
        end
    end

end