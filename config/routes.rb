Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resource :users, only: [:update]
    resources :users, only: [:create, :show] do
      resources :posts, only: [:index]
      resources :friends, only: [:index]
      resource :friends, only: [:create, :update, :destroy]
    end
    resource :session, only: [:create, :destroy]
    resources :posts, only: [:index, :create, :update, :destroy]
    resources :comments, only: [:create, :update, :destroy]
    resources :friends, only: [:index]
    resources :search, only: [:index]
  end
  
end
