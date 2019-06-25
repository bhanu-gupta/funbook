class Api::SearchController < ApplicationController

    def index
        search_term = search_params[:query].downcase
        @users = User.with_attached_profile_photo.where('lower(first_name) LIKE :search_term OR lower(last_name) LIKE :search_term', search_term:  "%#{search_term}%")
        @posts = Post.with_attached_photos.includes([:author, :user, :comments]).where('lower(body) LIKE :search_term', search_term: "%#{search_term}%")
        if @users || @posts
            render :index
        else
            render json: "No matching results", status: 404
        end
    end

    private

    def search_params
        params.require(:search).permit(:query)
    end
end