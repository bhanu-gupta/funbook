# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  gender          :string           not null
#  birthday        :date             not null
#  password_digest :string           not null
#  session_token   :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
    validates :username, :session_token, :email, presence: true, uniqueness: true
    validates :password_digest, :first_name, :last_name, :gender, :birthday, presence: true
    validates :password, length: {minimum: 6, message: 'Your password must be at least 6 characters long. Please try another.'}, allow_nil: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: 'Please enter a valid email address.'} 
    validates :gender, inclusion: { in: ['M', 'F'] }
    validates :first_name, :last_name, format: { with: /\A[a-z]+\z/i, message: 'This name has certain characters that aren\'t allowed.'} 
    validates :birth_month, :birth_year, :birth_date, format: { with: /\A[0-9]+\z/, message: 'This date has certain characters that aren\'t allowed.'}, allow_nil: true
    validate :validate_age

    after_initialize :ensure_session_token

    attr_reader :password, :birth_date, :birth_year, :birth_month

    def self.find_by_credentials(username, password)
        @user = User.find_by(username: username)
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

    def validate_age
        current_year = Time.current.year
        birth_year = self.birthday.year
        if (current_year - birth_year) >= 18 
            errors.add(:birthday, 'Sorry, we are not able to process your registration.')
        end
    end

    def birthday=(birthday)
        date = Date.new(self.birth_year, self.birth_month, self.birth_date)
        @birthday = date.to_s(:db)
    end

    def username=(username) 
        @username = (self.first_name + "_" + self.last_name)
    end
end
