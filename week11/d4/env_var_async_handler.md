# make sure to reconfigure project to start up from the bin folder and use the sequelizerc file
* set up environment variablse for the application
  * adding variables to applicaion example 
    * `PORT=8080 node app.js` 
  * getting environment variable in project 
* follow instructions found in data-driven apps part 1 to set up the bin  folder 
* follow the instructions found  in  data-driven apps part 2 to set up sequelizerc file 
* follow instructions in enviornment variable reading to setup environment variables

# Talk about  asynch handlers and set one up for the breaddit project 
* first talk about what happens when you don't have a a handler and an error happens with an asynch function(it hangs) 
* talk about the quick fix which is to add an try catch.  Make sure that you explain that you need the next argument that takes in an error in order for it to go to expres's error handler 
* finally create a asynch handler within a util folder that you can start using in routes
```js
//util
const asyncHandler = (handler) => {
 return (req, res, next) => {
   return handler(req, res, next).catch(next);
 };
};

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

//some routes file 

app.get('*', asyncHandler(async (req, res) => {
  //some code here 
}));


```
