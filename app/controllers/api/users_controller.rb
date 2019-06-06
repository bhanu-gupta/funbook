class Api::UsersController < ApplicationController

    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user) 
            render :create
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def show
        user_id = params[:id] || current_user.id
        if user_id != current_user.id
            @user = User.find_by(id: user_id)
        end
        @user = (user_id != current_user.id) ? User.find_by(id: user_id) : current_user
        @top_friends = User.get_top_friends(user_id)
        render :show
    end

    def update
        @user = current_user
        if @user.update(user_params)
            render :update
        else 
            render json: @user.errors.full_messages, status: 422
        end 
    end

    private
    def user_params
        params.require(:user).permit(:email, :password, :first_name, :last_name, :birth_year, :birth_date, :birth_month, :gender, :email2, :profile_photo, :cover_photo)
    end
end