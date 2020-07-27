# Views

- Home - Display welcome message.
- Sign Up - Allows new users to create an account.
- Sign In - Allows existing users to sign in to their account.
- Private - Displays user information to signed in user.

# Route

- GET - / - Home view
- GET - /authentication/sign-up - Display sign up view
- POST - /authentication/sign-up - Handle sign up form submission
- GET - /authentication/sign-in - Display sign in view
- POST - /authentication/sign-in - Handle sign in form submission
- POST - /authentication/sign-out - Sign out the user
- GET - /authentication/private - Display private view

# User model

```
{
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
  },
  email: {
    type: String,
    required: true,
    minlength: 5
  },
  passwordHashAndSalt: {
    type: String
  }
}
```
