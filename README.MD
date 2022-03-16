This program has two parts.

The first part is an express JS app that is able to generate a one time access code.
It emails out a code to someone, checks that code to make sure its legit, and if it is makes a cookie.
The website grants access to people with the verification cookie and serves them the front end (the other part) of the app.
If the cookie doesn't exist it tells them to try to get a new email

One important thing is that this email is set to a random gmail I set up, it needs to be changed and for privacy I have removed it
from the files on git. It was a gmail account, you can make one, and put in the username and password. If that doesn't work in your
gmail settings you might have to allow less secure apps.

The second part is the front end, this part plays videos, on click and is supposed to have some hover effects. In the frontEnd.js file there
is more information about what it does in more detail.

Happy coding!