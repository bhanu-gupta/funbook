# README

# Funbook

    Funbook is a facebook clone which is a social media website where you can connect with your friends and family, see and share updates.

# Live App

    https://funnbook.herokuapp.com

# Technologies used

    * Backend: Ruby on Rails, Postgres
    * Frontend: React, Redux, Javascript, CSS, HTML
    * Services: AWS

# Features

    ![alt text](app/assets/images/profile.png)

    *User Authentication

        * Frontend signup validations

            ![alt text](app/assets/images/signup.png)
    
    * Posts and Comments
        * Ability to attach multiple photos with a post

            ![alt text](app/assets/images/create-post.png)

        * Ability to add or delete a photo while creating the post
        * Display the photos dynamically using CSS grid

            ![alt text](app/assets/images/post-view.png)

        * Use AWS to host all images
        * Control posting and commenting on a user profile based on users friends
        * Display and add nested comments 

            ![alt text](app/assets/images/comment.png)

    * Friending 
        * Accept, send, cancel friend request, unfriend a user and make the changes reflect across the application without even a page refresh

    * Search users and posts and filter search results

        ![alt text](app/assets/images/search.png)

# Code snippets

    * Get all sent and received friend ids easily using Rails Active Record Method in the User Model rather than a SQL query

        ```
            has_many :received_friend_requests, -> { where(status: 'pending').order("friends.created_at") },
                primary_key: :id, 
                foreign_key: :receiver_id,
                class_name: :Friend

            has_many :received_friends,
                through: :received_friend_requests,
                source: :requestor
            
        ```

    * Read all the uploaded photos of the user onChange event of the input field
    * Remove photo while uploading

        ```
        readFile(e) {
            let that = this;
            Object.values(e.target.files).forEach((file) => {
                const fileReader = new FileReader();
                that.photos.push(file);
                fileReader.onloadend = () => {
                    const photoUrls = this.state.photoUrls.concat([fileReader.result]);
                    this.setState({photoUrls});
                };
                fileReader.readAsDataURL(file);
            });
        }

        removePhoto(index) {
            return (e) => {
                this.photos = this.photos.filter((photo, idx) => idx !== index);
                const photoUrls = this.state.photoUrls.filter((url, idx2) => idx2 !== index);
                this.setState({photoUrls});
            }
        }

        ```


