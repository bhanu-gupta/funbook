# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


demo_login = User.create!({
    username: 'test_user',
    email: 'test_user@test.com', 
    first_name: 'Test',
    last_name: 'Demo',
    gender: 'M',
    birthday: '1994-12-02',
    password_digest: '$2a$10$1sXKKpo6AQc3v7BaV3Op6.QHE7DGLLIu4sObE2oA2zTctNIB18eeC', 
    session_token: 'FHyK4OcQ2s49J4ZxDpSEpp'
})