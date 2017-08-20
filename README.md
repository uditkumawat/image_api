# Image_Management_System

Download or clone this repository.

Run these commands in sequence - 

1.npm install
2.nodemon server.js

Run browser and go to this url to get listing of API's - localhost:8000/swagger

# API specs-

# User Management

POST -> /api/user , Request Body Parameter required --> email

For User signup and getting accessKey

PUT  -> /api/user , Request Body Parameter required --> email

For regeneration of accessKey

# Image Management

POST -> /api/image , Request Body Parameter required --> accessKey , imageFile

GET  -> /api/image , Request Query Parameters required --> accessKey , name

GET  -> /api/imagesList , Request Query Parameters required --> accessKey

DELETE -> /api/image , Request Body Parameter required --> accessKey , name

PATCH -> /api/image , Request Body Parameter required --> accessKey , name , imageFile

