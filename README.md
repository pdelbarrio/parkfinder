# Park Finder

## Description

Search platform for parks in Barcelona to find parks filtering by some features and creating the favorite list of parks aswell as creating reviews.

## User Stories 

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- **Homepage** - As a user I want to be able to access the homepage and filter by type of park, log in and sign up.
- **Sign up** - As a user I want to sign up on the web page so that I can add favorite parks to my list and do reviews.
- **Login** - As a user I want to be able to log in on the web page so that I can get back to my account.
- **Logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account.
- **Favorite list** - As a user I want to see the list of my favorites and delete them.
- **Edit user** - As a user I want to be able to edit my profile.
- **Result** - As a user I want to see the list of parks filter by my preferences.
- **Park listing** - As a user I want to see more details of the restaurant, be able to call them and visit their website and save it as favorites.

## Server Routes (Back-end):

| Method | Route                      | Description                                                  | Request - Body                                           |
| ------ | -------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| GET    | /parks                     | Main page route. Renders home `index` view with list of parks. |                                                          |
| GET    | /auth/login                | Renders login form view.                                     |                                                          |
| POST   | /auth/login                | Sends Login form data to the server.                         | { email, password }                                      |
| GET    | /auth/signup               | Renders signup form view.                                    |                                                          |
| POST   | /auth/signup               | Sends Sign Up info to the server and creates user in the DB. Renders home `private` view. | { email, password }                                      |
| GET    | /auth/logout               | Disconnect user session. Renders home `index` view.          |                                                          |
| GET    | /private/edit-profile      | Private route. Renders edit-profile form view.               |                                                          |
| PUT    | /private/edit-profile      | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| GET    | /private/favorites         | Private route. Render the user profile view with his favorites and his reviews. |                                                          |
| POST   | /private/favorites         | Private route. Adds a new favorite for the current user.     | { parkname, district }                                   |
| DELETE | /private/favorites/:parkId | Private route. Deletes the existing favorite from the current user. |                                                          |
| GET    | /parks                     | Renders list view of parks.                                  |                                                          |
| GET    | /parks/:id                 | Renders details view for the particular park.                |                                                          |
| GET    | /parks/:id/reviews         | Renders reviews of park.                                     |                                                          |
| GET    | /parks/:id/reviews/add     | (private route?) Renders add-review form view.               |                                                          |
| POST   | /parks/:id/reviews/add     | (private route?) Sends review info to server and creates review in DB. | { parkname, userid, review}                              |
| GET    | /parks/:id/reviews/edit    | (private route?) Renders edit-review form view.              |                                                          |
| POST   | /parks/:id/reviews/edit    | (private route?) Sends edit-review info to server and updates review in DB and in reviews view. |                                                          |
| POST   | /parks/:id/reviews/delete  | (private route?) Executes delete button function and updated DB. Redirects to `/private/favorites` view. |                                                          |



## Models

### User model

{
   _id: _default,
   name: String,
  email: String,
  password: String,
  avatar: String,
  favoriteParks: [FavoriteId],
}

### Park model

{

_id: _default,
name: String,
description: String,
images: String,
location = {
	type: "Point",
	coordinates: [ 12.3445, -12.5069 ]
},
extension: { type: Number },
hasPublicDrinkingFountain: { type: Boolean },
hasFountain: { type: Boolean },
hasLake: { type: Boolean },
hasPlayGround: { type: Boolean },
hasPublicToilettes: { type: Boolean },
hasTrees: { type: Boolean }, (if yes: String?),
allowsDogs: { type: Boolean },
wifiService: { type: String, enum: [ "weak", "medium", "good" ] }
closeToBicing: { type: Boolean },
hasSoftFloor: { type: Boolean },
openRangeHour: { type: Date / Date },
district: { type: String, enum: [ desplegable ] },
hasSkateZone: { type: Boolean }
}

### Review model

{

_id: _default,
ParkId: { type: Schema.Types.ObjectId, ref: “Park” }
UserId: { type: Schema.Types.ObjectId, ref: “User” }
rating: { type: Number, }
content: { type: String, maxlength: 1000 }

}

## Backlog

- MapBox to implement search by closest parks.
- Use of Axios.
- Admin user can add parks.
- Nodemailer to send messages to user.

## Links

### Git

Repository Link

Deploy Link

### Trello

https://trello.com/b/FZoF6fWe/m2-proyect

### Slides

Slides Link