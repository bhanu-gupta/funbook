# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string
#  email           :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  gender          :string           not null
#  birthday        :date             not null
#  password_digest :string           not null
#  session_token   :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  bio             :text
#

class User < ApplicationRecord
    validates :first_name, :last_name, :gender, :password_digest, presence: true
    validates :session_token, :email, presence: true, uniqueness: true
    validates :first_name, :last_name, format: { with: /\A[a-z]+\z/i, message: 'This name has certain characters that aren\'t allowed.'} 
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: 'It looks like you may have entered an incorrect email address. Please correct it if necessary, then click to continue.'} 
    validates :password, length: {minimum: 6, message: 'Your password must be at least 6 characters long. Please try another.'}, allow_nil: true
    validates :birth_month, :birth_year, :birth_date, format: { with: /\A[0-9]+\z/, message: 'This date has certain characters that aren\'t allowed.'}, allow_nil: true
    validates :gender, inclusion: { in: ['M', 'F'] }
    validate :validate_email, :validate_birthday

    after_initialize :generate_username, :ensure_session_token

    attr_reader :password, :birth_date, :birth_year, :birth_month, :email2

    has_many :posts

    has_many :authored_posts,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :Post
    
    has_many :authored_comments,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :Comment

    has_many :received_friend_requests, -> { where(status: 'pending').order("friends.created_at") },
        primary_key: :id, 
        foreign_key: :receiver_id,
        class_name: :Friend

    has_many :sent_friend_requests, -> { where(status: 'pending').order("friends.created_at") },
        primary_key: :id,
        foreign_key: :requestor_id,
        class_name: :Friend

    has_many :profile_comments,
        through: :posts,
        source: :comments

    has_many :received_friends,
        through: :received_friend_requests,
        source: :requestor

    has_many :sent_friends,
        through: :sent_friend_requests,
        source: :receiver

    has_one_attached :profile_photo

    has_one_attached :cover_photo

    # has_many :accepted_received_friend_requests, -> { where(status: 'accepted').order("created_at")},
    #     primary_key: :id, 
    #     foreign_key: :receiver_id,
    #     class_name: :Friend

    # has_many :accepted_sent_friend_requests, -> { where(status: 'accepted').order("created_at") },
    #     primary_key: :id,
    #     foreign_key: :requestor_id,
    #     class_name: :Friend
    
    # has_many :accepted_received_friends,
    #     through: :accepted_received_friend_requests,
    #     source: :requestor

    # has_many :accepted_sent_friends,
    #     through: :accepted_sent_friend_requests,
    #     source: :receiver
    
    # has_many :friends, -> {
    #      where(status: 'accepted')
    #      .order('updated_at DESC') }, 
    #     class_name: :Friend

    def self.find_by_credentials(email, password)
        @user = User.find_by(email: email)
        @user && @user.is_password?(password) ? @user : nil
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def reset_session_token!
        self.session_token = User.generate_session_token
        self.save!
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

    def self.generate_session_token
        SecureRandom::urlsafe_base64(16)
    end

    def generate_birthday
        if self.birth_month && self.birth_date && self.birth_year
            date = Date.new(self.birth_year, self.birth_month, self.birth_date)
            self.birthday = date.to_s(:db)
        end
    end

    def birth_year=(birth_year)
        @birth_year = birth_year.to_i
    end

     def birth_month=(birth_month)
        @birth_month = birth_month.to_i
    end

    def birth_date=(birth_date)
        @birth_date = birth_date.to_i
    end

    def generate_username
        if (self.email)
            email_arr = self.email.split("@")
            self.username = email_arr.first.downcase if email_arr.first
        end
    end

    def validate_age
        begin
            if (Time.current.year - self.birthday.year) < 18 
                errors.add(:birthday, 'Sorry, we are not able to process your registration.')
            end
        rescue => exception
            errors.add(:birthday, 'Sorry, we are not able to process your registration.')
        end
    end

    def email2=(email2)
        @email2 = email2
    end

    def validate_email
        if self.email2 && self.email != self.email2
            errors.add(:email2, 'Your emails do not match. Please try again.')
        end
    end

    def validate_birthday
        begin
            if self.birth_date && self.birth_month && self.birth_month
                date = Date.new(self.birth_year, self.birth_month, self.birth_date)
                self.birthday = date.to_s(:db)
                self.validate_age
            end
        rescue => exception
            errors.add(:birthday, 'The selected date is not valid.')
        end
    end

    def get_all_friend_ids
        User.get_user_friends(self.id, "accepted").pluck(:id)
    end

    def self.get_user_friends(user_id, status = null)
        friends = User.joins("INNER JOIN friends 
                            ON (friends.requestor_id = users.id 
                            OR friends.receiver_id = users.id)")
                    .where("(requestor_id = ? OR receiver_id = ?) 
                    AND users.id != ?", user_id, user_id, user_id)
        friends = friends.where('friends.status = ?', status) if status
        friends = friends.distinct
    end

    def self.get_top_friends(user_id)
        User.get_user_friends(user_id, "accepted").limit(9)
    end
end
