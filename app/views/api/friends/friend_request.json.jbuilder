json.key_format! camelize: :lower
json.friends do
    receiver = @friend_request.receiver
    requestor = @friend_request.requestor
    json.set! receiver.id do
        json.partial! 'api/users/user', user: @friend_request.receiver
    end
    json.set! requestor.id do
        json.partial! 'api/users/user', user: @friend_request.requestor
    end
end