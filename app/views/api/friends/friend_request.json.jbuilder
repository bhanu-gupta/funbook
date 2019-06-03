json.key_format! camelize: :lower
json.extract! @friend_request, :requestor_id, :receiver_id, :status, :created_at, :updated_at
