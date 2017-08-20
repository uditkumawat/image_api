# Image_Management_System

Image Management System based on File system (no use of database)

Download or clone this repository.

Run these commands in sequence - 

1.npm install
2.nodemon server.js

Run browser and go to this url to get listing of API's - localhost:8000/apidocs

# API specs-

# User Management

POST -> /api/user , Request Body Parameter required --> email

For User signup and getting accessKey

PUT  -> /api/user , Request Body Parameter required --> email

For regeneration of accessKey

# Image Management

POST -> /api/image , Request Body Parameter required --> accessKey , image

Example - localhost:8000/api/image

Form-Data => { accessKey : "WDWFCNdJMP", image : file }


GET  -> /api/image , Request Query Parameters required --> accessKey , name

Example - localhost:8000/api/image?accessKey=WDWFCNdJMP&name=fileName.png


GET  -> /api/imagesList , Request Query Parameters required --> accessKey

Example - localhost:8000/api/imagesList?accessKey=WDWFCNdJMP


DELETE -> /api/image , Request Body Parameter required --> accessKey , name


PATCH -> /api/image , Request Body Parameter required --> accessKey , name , image

Example - localhost:8000/api/image

Form-Data => { accessKey : "WDWFCNdJMP", name : fileName , image : file }