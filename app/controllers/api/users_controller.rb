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

    private
    def user_params
        params.require(:user).permit(:email, :password, :first_name, :last_name, :birth_year, :birth_date, :birth_month, :gender, :email2)
    end
end