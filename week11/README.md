# Regular Expressions Objectives
* Define the effect of the * operator and use it in a regular expression
* Define the effect of the ? operator and use it in a regular expression
* Define the effect of the + operator and use it in a regular expression
* Define the effect of the . operator and use it in a regular expression
* Define the effect of the ^ operator and use it in a regular expression
* Define the effect of the $ operator and use it in a regular expression
* Define the effect of the [] bracket expression and use it in a regular expression
* Define the effect of the - inside brackets and use it in a regular expression
* Define the effect of the ^ inside brackets and use it in a regular expression

# Express Objectives
* Send plain text responses for any HTTP request
* Use pattern matching to match HTTP request paths to route handlers
* Use the Pug template engine to generate HTML from Pug templates to send to the browser
* Pass data to Pug templates to generate dynamic content
* Use the Router class to modularize the definition of routes

# Pug Template Objectives
* Declare HTML tags and their associated ids, classes, attributes, and content
* Use conditional statements to determine whether or not to render a block
* Use interpolation to mix static text and dynamic values in content and attributes
* Use iteration to generate multiple blocks of HTML based on data provided to the template

# HTML Forms Objectives
* Describe the interaction between the client and server when an HTML form is loaded into the browser, the user submits it, and the server processes it
* Create an HTML form using the Pug template engine
* Use express to handle a form's POST request
* Use the built-in express.urlencoded() middleware function to parse incoming request body form data
* Explain what data validation is and why it's necessary for the server to validate incoming data
* Validate user-provided data from within an Express route handler function
* Write a custom middleware function that validates user-provided data
* Use the csurf middleware to embed a token value in forms to protect against Cross-Site Request Forgery exploits

# Data-Driven Web Sites Objectives
* Use environment variables to specify configuration of or provide sensitive information for your code
* Use the dotenv npm package to load environment variables defined in an .env file
* Recall that Express cannot process unhandled Promise rejections from within route handler (or middleware) functions;
* Use a Promise catch block or a try/catch statement with async/await to properly handle errors thrown from within an asynchronous route handler (or middleware) function
* Write a wrapper function to simplify catching errors thrown within asynchronous route handler (or middleware) functions
* Use the morgan npm package to log requests to the terminal window to assist with auditing and debugging
* Add support for the Bootstrap front-end component library to a Pug layout template
* Install and configure Sequelize within an Express application.
* Use Sequelize to test the connection to a database before starting the HTTP server on application startup
* Define a collection of routes (and views) that perform CRUD operations against a single resource using Sequelize
* Handle Sequelize validation errors when users are attempting to create or update data and display error messages to the user so that they can resolve any data quality * issues
* Describe how an Express.js error handler function differs from middleware and route handler functions
* Define a global Express.js error-handling function to catch and process unhandled errors
* Define a middleware function to handle requests for unknown routes by returning a 404 NOT FOUND error