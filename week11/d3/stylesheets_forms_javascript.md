# explain how to get style sheets or javascript in their pug file
  * need the following line of code in app.js in order to import stylesheets or javascript files 
```js
app.use(express.static(path.join(__dirname, 'public')));
```
  * This tells javascript to go into the public folder first when you try to import something 
  * now when you import a link or stylesheet you can just put something like this in pug: 
```js
link(rel="stylesheet" href="/stylesheets/css/entry.css", type="text/css")
```
  * same thing applies for javascript files
# talk about creating a single html page that will render different child pages
  * implement this by creating a users page that will render and "extend" the layout page

# add body_url_encoded line to the app.js file
  * app.use(express.urlencoded({extended: true}))
# creating a form
  * let's go ahead and create a new route that will take them to a page where they will be able to create a new user 
  * go ahead and write out the pug html that will accomplish this and talk about all the necessary components needed in order to do this
  * this includes the name attributes on each input, the labels for each input, the method that needs to be used in the form etc ...
  * after we successfully create a new user, we want to make sure to redirect them to the users page where they will be able to see the new user that they created. .

# talk about middle ware 
  * give examples about the anatomy of middle ware
  * forexample: 

```js

const middle = (req,res,next) {
  console.log("banana")
  next() // next is the next middle ware that will run after this one finishes
}

//middle will run before we get to the (req,res) function
app.get("/", middle, (req,res,) => {

})

```

  * Everything that uses app.use is essentailly middle ware

```js
app.use((req, res, next) => {
  req.isFunny = true;
  next()
})

```
  * If the defined function above is defined above your route, the app.use will run before the route
