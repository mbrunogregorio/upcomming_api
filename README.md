# Upcomming movies API

This API provides an access to The Movie Database API through 2 endpoints listed below

## Available endpoints

### Upcomming Movies List and Movies search
#### /movies?page=value&filter=value

##### page and filter params are optional, if filter is given, the api will get the movies search's results from TMDb API
##### TBDb API respond each calling with 20 records per page, then the api needs to get the page from the frontend layer.

### Movie details
#### /movies/:id

##### The id params is the movie's Id on TMDb API


## Running application

Necessary Node.js installed
Run the following commands on terminal:
#### yarn
#### yarn dev

#### The API will be listening at:
##### http://localhost:3333

## Third-party packages and libraries

### Express.js
 It's a minimalist framework, used to handle routes, requisitions and responses.
 [Documentation](https://expressjs.com/en/5x/api.html)

 ### Axios
 Promise based HTTP client for the browser and node.js
 [Documentation](https://github.com/axios/axios)

 ### Eslint

 Find and fix problems in your JavaScript code and helps with code standardization