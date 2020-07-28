# Models

## Post Model

Schema:

```json
{
  "content": {
    "type": String,
    "maxlength": 280,
    "required": true
  }
}
```

# Views

**Home** - User sees list of latest posts, has a button to create a new post.
**Post Creation** - User sees form to create post.
**Single Post** - User can see details about one single post. Button that allows user to delete the post.
**Edit Post** - Form pre-populated with the post contents, when submitted will "update" the post in the database.

# Route Handlers

```
METHOD  ENDPOINT/ACTION      DESCRIPTION
GET  -  '/'                 -  Displays home view.
GET  -  '/post/create'      -  Post creation view.
POST -  '/post/create'      -  Handle post creation form submission. Redirect the user to home view.
GET  -  '/post/:id'         -  Display single post view.
POST -  '/post/:id/delete'  -  Delete single post
GET  -  '/post/:id/edit'    -  Display post edit view.
POST -  '/post/:id/edit'    -  Handle post editing form submission. Redirect the user to home view.
GET  -  '/error'            -  Display error message.
GET  -  '/profile/:id'      -  Display a specific user's profile view
GET  -  '/profile/edit'     -  Display edit form for profile
POST -  '/profile/edit'     -  Handle edit profile form submissions
```
