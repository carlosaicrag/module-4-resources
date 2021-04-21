# High level overview of request response cycle
* draw picture that takes students step by step on the request response cycle
* use Node.js Web Applications Lecture as a reference.  That has a nice picture that you can follow 
---
# URL Anatomy
  foo://example.com:8042/over/there?name=ferret#nose
  ```md
  \_/   \______________/\_________/ \_________/ \__/
   |           |            |            |        |
scheme     authority       path        query   fragment
```

- The scheme (required),
- The authority (required),
- The path (optional),
- The query (optional), and
- The fragment (optional, not sent to the server).

---

# Setting express up  
1. npm init -y (we've already done this so we're just reviewing)
  * we are initilaizing npm and should get something that looks like this: 
  ```js
    {
  "name": "my-project-folder-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  }
  ```
  * here we are specificing descriptions for our application.  
2. npm install express@^4.0.0
  * we should now see that expess is a dependency in our application 
---

# create .gitignore file 
* we are going to be creating a .gitignore file in order to ignore the node_modules folder which gets extremely big.  Don't want to be pushing this to git
---

# create app.js file in breaddit application 
* we are going to create an app.js file and place the following code in it: 
```js
const express = require('express');

// Create the Express app.
const app = express();
```

* The app object contains a collection of methods for defining an application's routes: 

- get() - to handle GET requests
- post() - to handle POST requests
- put() - to handle PUT requests
- delete() - to handle DELETE requests
# Listening for HTTP connections 

```js
const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```
# defining our first route 
```js
app.get('/', (req, res) => {
  //send allows us to send the http response
  res.send('Hello from Express!');
});
```
# let's test it out! 
`node app.js`

# let's talk about nodemon 
* nodemon is a package that allows the server to reset everytime there is something that is changed to the server
* let's download the package and create a script to run it

# Here comes PUG!
* This is what we can do but it can become pretty tedious 
```js
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>Welcome</head></title>
      <body>
        <h1>Hello from Express!</h1>
      </body>
    </html>
  `);
});
```
* The page will render but there is an error here, go ahead and fix the error and tell them that it can get pretty tedious if we were to send html like this

* luckily there is PUG!

# what's a template? 
* A template allows you send html in a way that is less tedious but it does come with a learning curve.  They have their own propietary syntax that you will have to learn.  Below is an example.  Notice that there aren't any angle brackets, something that you're use to seeing on regular html

```pug
html
  head
    title Welcome
  body
    h1 Welcome!
```

# setting up our application to be able to render pug templates 
1. npm install pug@^2.0.0 #install pug package
2. `app.set('view engine', 'pug');` # put this in your app.js file (sets up the view engine to be pug)


# let's render our first template!
1. let's create a views folder where we will create a new file called layout.pug
2. change the route in our app.js to be:

* change this route in the app.js to be

```js
app.get('/', (req, res) => {
  res.render("layout")
});
```

* now let's add some stuff to the template and mess around with it
* render some unordered list items: 
```pug
ul
  li Item A
  li Item B
  li Item C
```

# setting element attributes 
```js
a(href='/about' class='menu-button') About
```
* shortcut for setting class and id attribute values 
```pug
  div#container
    a.button Cancel
```
* renders to 
```html
<div id="container">
  <a class="button">Cancel</a>
</div>
```

# rendering data 
* let's render some data in the templates by passing in data when we render 

```js
app.get('/', (req, res) => {
  res.render("layout", {firstname: "carlos", lastname:"garcia"})
});
```

```pug
ul
  li= firstName
  li= lastName
```
* would render: 

```html
<ul>
  <li>Carlos</li>
  <li>Garcia</li>
</ul>
```

* Variables can be used to set element attribute values 

```pug
form
  div
    label First Name:
    input(type='text' name='firstName' value=firstName)
  div
    label Last Name:
    input(type='text' name='lastName' value=lastName)
```

* would render 

```html
<form>
  <div>
    <label>First Name:</label>
    <input type="text" name="firstName" value="Grace"/>
  </div>
  <div>
    <label>Last Name:</label>
    <input type="text" name="lastName" value="Hopper"/>
  </div>
</form>
```

* you can also interpolate variables into templates 
```pug
p Welcome #{firstName} #{lastName}!
```

```html
<p>Welcome Grace Hopper!</p>
```

# using loops in Pug template 
* adding an array to the data we can use in pug 
```js
app.get('/', (req, res) => {
  res.render("layout", {firstname: "carlos", lastname:"garcia", colors:['Red', 'Green', 'Blue']})
});
```

* let's generate an ordered list with the array of values 
```pug
ul
  each color in colors
    li= color
```

# using conditionals
```js
app.get('/', (req, res) => {
  res.render("layout", {firstname: "carlos", lastname:"garcia", colors:['Red', 'Green', 'Blue'],userLoggedIn:true})
});
```
```pug
if userIsLoggedIn
  h2 Welcome!
else
  a(href='/login') Please login
```
# let's create a path that leads you to a specific product using the "id" of the product 
* right now we are not going to be using an actual id that is connected to something in our database but we'll simulate it 

* add the following route 
```js
app.get("/product/:id", (req,res) => {
  const productId = parseInt(req.params.id,10);

  res.send(`product ID: ${productId}`)

})
```
* the route that we have defined includes a wild card (:id).  this wild card can be anything
* now the above code will do the job but it would allow us to also pass in things into the wildcard that are not integers
* so how can we make sure that we only pass integers into the wild card? 
  * we use regex

```js
app.get("/product/:id(\\d+)", (req,res) => {
  const productId = parseInt(req.params.id,10);

  res.send(`product ID: ${productId}`)

})
```

# let's create a home page where we have all of our users displayed.  Let's also be able to create links for each user so that we go to their profile page

* you should create a route that looks something like this:
```js
const express = require('express')
const router = express.Router()
const {User} = require("./models")

router.get("/users", async (req,res) => {
  users = await User.findAll()
  res.render("layout", {users})
})

module.exports = router
```
* go ahead and setup the layout file to be able to render all of the users with links that take them to their profile page based on their id
# let's modularize our routes so that we have a separate file for each route that starts with something different

* create a routes folder 
* create a separate route file for users and import it into the app.js file 
* make sure that you export the router in the other file

* your users route file should look something like this:

```js
const express = require('express')
const router = express.Router()

router.get("/", (req,res) => {
  //feel free to create another view that will render all of the users in your database currently
  res.send("these are all of the users")
})

module.exports = router
```

* in this file you can create a collection of routes that connect to the route that starts with "/users"
* make sure that you export from this file and that you import it into the app.js file

* importing in app.js:
```js
const express = require('express');
const usersRouter = require("./routes/users")
// Create the Express app.
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.use("/users",usersRouter)
const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

* Now go ahead and take them through creating a quick pug template that renders all of the users (send data to the template where there is a key called users that points to an array of users you insert)



