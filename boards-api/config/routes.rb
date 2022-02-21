Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/boards/:link', to: 'boards#show'
      put '/cards/move/:id(.:format)', to: 'cards#move'
      put '/cards/move_left/:id(.:format)', to: 'cards#move_left'
      put '/cards/move_right/:id(.:format)', to: 'cards#move_right'
      resources :boards, only: [:index, :create, :destroy]
      resources :board_columns
      resources :cards
    end
  end
end