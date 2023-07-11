# Student List - CRUD & Auth
CRUD de lista de alumnos con NodeJS Express MongoDB


To run this web aplication you need to create a .env file with the next varibles:

PORT, MONGODB_URI_LOCAL, AUTH_SECRET, RESET_SECRET, OAUTH2_CLIENT_ID, OAUTH2_CLIENT_SECRET, OAUTH2_REFRESH_TOKEN, OAUTH2_REDIRECT_URL, EMAIL_USER

As the next way:

PORT = 3000

MONGODB_URI_LOCAL = "url"

AUTH_SECRET = "your-secret-for-jwt"

RESET_SECRET = "ypur-secret-for-jwt"

OAUTH2_CLIENT_ID = '***'

OAUTH2_CLIENT_SECRET = '***'

OAUTH2_REFRESH_TOKEN = '***'

OAUTH2_REDIRECT_URL = '***'

EMAIL_USER = "a-user@gmail.com"

This tutorial could help you to get the oauth2 variables:
https://www.youtube.com/watch?v=-rcRf7yswfM&t=185s&ab_channel=MafiaCodes

And also you need to have mongodb, nodejs and npm in your computer, here´s a tutorial and a link to the oficial node js website:
* https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac
* https://nodejs.org/en/

Once you´re done with the previous steps open the terminal on the directory of the project and run: npm install

Then open your browser and go to localhost:3000 
