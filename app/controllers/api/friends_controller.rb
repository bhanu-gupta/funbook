class FriendsController < ApplicationController
    
    def index
        user_id = params[:user_id] || current_user.id 
        if user_id != current_user.id 
            @friends = Friend.get_user_friends(user_id, "accepted")
        else
            @friends = Friend.get_user_friends(user_id)
        end
        render :index
    end

    def create
        @friend_request = current_user.sent_friend_requests.new(friend_params)
        if @friend_request.save
            render json: @friend_request
        else 
            render json: @friend_request.errors.full_messages
        end
    end

    def update
        @friend_request = current_user.received_friend_requests.find_by(id: params[:id])
        if @friend_request 
            friend_params[:status] = 'accepted'; 
            if @friend_request.update(friend_params)
                render json: @friend_request
            else
                render json: @friend_request.errors.full_messages, status: 422
            end 
        else
            render json: [], status: 422
        end
    end

    def destroy
         @friend_request = current_user.received_friend_requests.find_by(id: params[:id])
        if @friend_request
            if @friend_request.destroy
                render json: ['Friend successfully removed']
            end
        else 
            render json: [], status: 422
        end
    end

    private

    def friend_params
        params.require(:friend).permit(:receiver_id)
    end

end