WebsocketRails::EventMap.describe do
  # Events that can be triggered via the client.  This allows clients to privately
  # communicate with the server over the open socket.  It is then the servers job
  # to either respond privately to the client or broadcast information to all clients
  # via the public channels.

  subscribe :test, 'socket#test'
  namespace :fetch do
    subscribe :players, 'fetch_socket#players'
  end
  namespace :game do
    subscribe :join, 'game_socket#join'
    subscribe :leave, 'game_socket#leave'
    subscribe :draw, 'game_socket#draw'
    subscribe :turn, 'game_socket#turn'
    subscribe :start_round, 'game_socket#start_round'
    subscribe :get_role, 'game_socket#get_role'
    subscribe :submit_guess, 'game_socket#submit_guess'
    subscribe :end_round, 'game_socket#end_round'
    subscribe :get_score, 'game_socket#get_score'
  end

  subscribe :client_disconnected, 'game_socket#leave'
end
