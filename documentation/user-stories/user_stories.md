# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the log-in form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-in form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a page displaying recent songs.
      * So that I can easily log out to keep my information secure.

## Spots

### Create a Spot

* As a logged in user, I want to be able to post a new spot.
  * When I'm on the `/new-spot` page:
    * I can post a new Spot.
      * Able to specify: Title, Description, Details (hours, address, payment options), Category, Address, Rating based on current reviews.
      * Able to upload: Images.

### Viewing Spots - Categories

* As a logged in user, I want to be able to view a custom home page containing:
    * Nearby Spots
    * Friends Reviews
    * Categories - Tiles pop up for Restaurants, Shopping, Active Life, Beauty & Spas.

* As a logged in _or_ logged out user, I want to be able to view a selection of the most recent spots.
  * `/Restaurants` page:
    * I can view all restaurants.
    * I have the ability to select categories of Food
  * `/Shopping`page:
    * View all places
    * Filter by features (accepts credit cards, open now, dogs allowed, hot and new, offers delivery)
  * `/Active Life`page:
    * View all places
    * Filter by features (accepts credit cards, open now, dogs allowed, hot and new, offers delivery)
  * `/Beauty&Spas` page:
    * View all places
    * Filter by features (accepts credit cards, open now, dogs allowed, hot and new, offers delivery)

### Viewing Spots - Single Page

* As a logged in _or_ logged out user, clicking a spot page will take me to that page directly:
  * Header with recently uploaded photos from reviews
  * Profile picture of the spot
  * Spot name
  * Total of reviews
  * Claimed - Categories
  * Hours open

* As a logged in user, below the header picture a tool bar will appear that will allow user specific actions:
  * Write a review
  * Add photo
  * Share (copy link to clipboard)
  * Save
  * Follow

* As a logged in _or_ out user, I can see: 
  * Location & hours details
  * Business description
  

## Reviews

### Main Page - Review Content
* As a logged in _or_ out user, the main page will contain reviews information relevant to each spot.
  * Recent reviews.
  * Average review for the spot
  

### Review Page - Single Spot

* As a logged in _or_ out user, I can see:
  * Overall Review (over all rating, with stars count)
  * Reviews Totals (sort options, filter options by star count)
  * Review page on the spot:
    * Pagination at 10 reviews per page
    * User details of the reviewer (Name, Location, total reviews, total photos, total favorites)
    * If owner comments on the review
    * Reactions to "helpful", "thanks", "love this", and "oh no" on the page.

* As a logged in user, I can write a review.
  * Review has a pop up for guidelines
  * Ratings can be added to the review ( 1 - 5 stars)
  * Photos can be attached
  * Validations exist that prevent the user from posting a review (minimum 85 characters).

* For reviews that the user owns:
  * Options details that click and drops down the following options:
    * Share Review (copy link to clipboard)
    * Write an update
    * Delete the review

* For reviews that the user doesn't own:
  * Can "react" to it ("helpful", "thanks", "love this", and "oh no")



## User Page

### Main Page

* As a logged in _or_ logged out user, clicking user page will take me to the profile that
  * Lists user details (Profile picture, Location, Total Reviews, Total Favorites)
  * Review reactions Count
  * Review distribution (Ratings)
  * Top Categories
  * Recent Reviews

* As a logged in user:
  * Edit profile:
    * Add photo
    * Add friends
    * Edit profile
  * Manage Reviews:
    * Update Review
    * Share Review
    * Delete Review
  






