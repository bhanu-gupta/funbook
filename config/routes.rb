Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show] do
      resources :posts, only: [:index]
      resources :friends, only: [:index]
      resource :friends, only: [:create, :update, :destroy]
    end
    resource :session, only: [:create, :destroy]
    resources :posts, only: [:index, :create, :update, :destroy]
    resources :friends, only: [:index]
  end
  
end
