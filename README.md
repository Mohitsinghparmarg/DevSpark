##   

- Create a repository

- Initialize the repository

- node_modules, package.json, package-lock.json
    - https://stackoverflow.com/questions/76417762/  package-json-vs-package-lock-json-vs-semantic-versioning

- Install express

- Create a server

- Listen to port 7777

- Write request handlers for /test , /hello

         const express = require('express');
         const app = express();
          <!-- the problem of using .use() methos is that it will handle all of the methods like get,post,delete,patch and others which is not a good thing -->
         app.use("/hello",(req,res) => {
                  console.log("hello route is working .....");
                  res.send("this is /hello Route...")
         })

         app.use("/test",(req,res) =>{
                  console.log("/test route...");
                  res.send("this is /test Route...");
               
         })

         app.listen(7777,() =>{
               console.log("Server is running successfully on Port 7777")
         });


- Install nodemon and update scripts inside package.json

- What are dependencies

- What is the use of "-g" while npm install

- Difference between caret and tilde ( ^ vs ~ )
      -   https://stackoverflow.com/questions/22343224/whats-the-difference-between-tilde-and-caret-in-package-json

- initialize git

- .gitignore

- Create a remote repo on github

- Push all code to remote origin

- Play with routes and route extensions ex. /hello, / , hello/2, /test
     
               const express = require("express");
               const app = express();

               app.use("/hello",(req,res)=> {
                        console.log("it is the /hello Route....");
                        res.send("it is the /hello Route...app.");
               })
               app.use("/test",(req,res) =>{
                        console.log("response has been sent...");
                        res.send("\it is test Route...")
               })
               app.use("/",(req,res)=> {
                     console.log("it is the / Route....");
                     res.send("it is the / Route...app.");
               })
               app.listen(7777,()=>{
                        console.log("server is running on 7777...")
               })

- Order of the routes matters a lot
- Install Postman app and make a workspace/collectio > test API call
- Write logic to handle GET, POST, PATCH, DELETE API Calls and test them on Postman
             
            const express = require("express");
            const app = express();

            app.get("/user", (req,res) =>{
                     console.log("request has been sent...");
                     res.send("data has been fetched from the Database...");
            })

            app.post("/user",(req,res)=>{
                     console.log("yes it is the post method...");
                     res.send("data has been saved in the database successfully...");
            })

            app.delete("/user",(req,res)=>{
                     console.log("yes it is the delete method...");
                     res.send("data has been deleted successfully from database...");
            })
            app.listen(7777,()=>{
                     console.log("server is running on 7777...")
            })
## Explore Routing and use of ?,+,*() in the Routes...

 ## ?
         app.get("/ab?c", (req,res) =>{
              console.log("hello mohit what Darling...!!");
              res.send("data has been fetched from the Database...");
         })

 ## +
    app.get("/ab+c", (req,res) =>{
          console.log("hello mohit what Darling...!!");
          res.send("data has been fetched from the Database...");
    })

 ## *
    app.get("/ab*c", (req,res) =>{
          console.log("hello mohit what Darling...!!");
          res.send("data has been fetched from the Database...");
    })

 ## ()?
    app.get("/a(bc)?d", (req,res) =>{
          console.log("hello mohit what Darling...!!");
          res.send("data has been fetched from the Database...");
    })

## use of Regex in Routes like  /a/ , /.*fly$/
   
   ## /a/
      app.get(/a/, (req,res) =>{
          console.log("hello mohit  Darling...!!");
          res.send("data has been fetched from the Database...");
     })

   ## /.*fly$/
     app.get(/.*fly$/, (req,res) =>{
          console.log("hello mohit  Darling...!!");
          res.send("data has been fetched from the Database...");
     }) 

## Reading the query params in the routes
   ##  like this : /user?userId=038&password=mohitbhai
     app.get("/user", (req,res) =>{
          console.log(req.query);
          res.send("data has been fetched from the Database...");
     })

## Reading the dynamic routes
 ## like this : /user/038/mohitbhai/mohit@123
      app.get("/user/:userId/:name/:password", (req,res) =>{
          console.log(req.params);
          res.send("data has been fetched from the Database...");
     })

## Multiple Route Handlers - Play with the code
         
         app.use("/user",
         (req,res) =>{
            console.log("it is first one...")
            res.send("1st Route handler...");
      },
      (req,res,)=> {
            console.log("it is the second one...");
            res.send("2nd Route handler...");
      },
      (req,res)=> {
         console.log("it is the third one...");
         res.send("3rd Route handler...");
     },
    (req,res)=> {
         console.log("it is the fourth one...");
         res.send("4th Route handler...");
    }, ) 

## to handle multiple Route We use the next()

- next() -> it calls the next callback function 
    - so there are multiple scenarios which can happen ,so these are following,and yes it is very good concept to deep dive...

- 1. the output will be, it is first one...,it is the second one... and it will send the response as 2nd Route handler...
      but it will also give error on the console because after sending the response the another response which is just
      after the next() will be run since JS is single threaded language which will run the code line by line and since
       we have already sent the resonse so can not send the another response
     
          app.use("/user",
            (req,res,next) =>{
               console.log("it is first one...")
               next();
               res.send("1st Route handler...");
         },
         (req,res,next)=> {
               console.log("it is the second one...");
               res.send("2nd Route handler...");
         },
         (req,res,next)=> {
            console.log("it is the third one...");
            res.send("3rd Route handler...");
          },
         (req,res,next)=> {
            console.log("it is the fourth one...");
            res.send("4th Route handler...");
         }, )          
2. so there are others things can be done which are very interesting... for this the response will be 4th Route handler...
    and other things will be printed as JS does ,it will also give the error on console as I have discussed in first one.

             app.use("/user",
            (req,res,next) =>{
               console.log("it is first one...")
               next();
               // res.send("1st Route handler...");
         },
         (req,res,next)=> {
               console.log("it is the second one...");
               next();
               res.send("2nd Route handler...");
         },
         (req,res,next)=> {
            console.log("it is the third one...");
            next();
            res.send("3rd Route handler...");
       },
       (req,res,next)=> {
            console.log("it is the fourth one...");
            next();
            res.send("4th Route handler...");
       }, )
      

       app.listen(7777,()=>{
               console.log("server is running on 7777...")
       }) 
       
- 3. in this since the response is not send so it will simply say that bhai /path jo h wo uska response milaa hi nhi yaar...
        
      
           app.use("/user",
            (req,res,next) =>{
               console.log("it is first one...")
               next();
               // res.send("1st Route handler...");
         },
         (req,res,next)=> {
               console.log("it is the second one...");
               next();
               // res.send("2nd Route handler...");
         },
         (req,res,next)=> {
            console.log("it is the third one...");
            next();
            // res.send("3rd Route handler...");
         },
         (req,res,next)=> {
            console.log("it is the fourth one...");
            next();
            // res.send("4th Route handler...");
         }, ) 

- 4. aur isme jo last waala next() h wo find kregaa ki koi aur route h yaa nhi iske baad but as we see in the code nhi h
     to ye chupchaap se iske baad waalaa jo send function ka response h wo send kr dega which is : 4th Route handler...

           
               app.use("/user",
            (req,res,next) =>{
               console.log("it is first one...")
               next();
               // res.send("1st Route handler...");
         },
         (req,res,next)=> {
               console.log("it is the second one...");
               next();
               // res.send("2nd Route handler...");
         },
         (req,res,next)=> {
            console.log("it is the third one...");
            next();
            // res.send("3rd Route handler...");
         },
         (req,res,next)=> {
            console.log("it is the fourth one...");
            next();
            res.send("4th Route handler...");
         }, )

         
## next function and errors along with res.send()
 yes yes we have already discussed in the above section

## app.use("/route", rH, [rH2, rH3], rH4, rh5);
in this I can wrap the route handler in the form of array and yes they will work in the same way...

  - 1. like this
       
               app.use("/user",[
                  (req,res,next) =>{
                     console.log("it is first one...")
                     next();
                     // res.send("1st Route handler...");
               },
               (req,res,next)=> {
                     console.log("it is the second one...");
                     next();
                     // res.send("2nd Route handler...");
               },
               (req,res,next)=> {
                  console.log("it is the third one...");
                  next();
                  // res.send("3rd Route handler...");
            },
            (req,res,next)=> {
                  console.log("it is the fourth one...");
                  next();
                  res.send("4th Route handler...");
            }, ]) 

  - 2. like this
       
               app.use("/user",
               (req,res,next) =>{
                  console.log("it is first one...")
                  next();
                  // res.send("1st Route handler...");
            },
            [ (req,res,next)=> {
            console.log("it is the second one...");
                     next();
                     // res.send("2nd Route handler...");
               },
               (req,res,next)=> {
                  console.log("it is the third one...");
                  next();
                  // res.send("3rd Route handler...");
            }
           ],
            (req,res,next)=> {
                  console.log("it is the fourth one...");
                  next();
                  res.send("4th Route handler...");
            }, )

 - 3. app.get('/user/:id', (req, res, next) => {

            // if the user ID is 0, skip to the next route
            if (req.params.id === '0') next('route')

            // otherwise pass the control to the next middleware function in this stack
            else next()
      }, (req, res, next) => {

            // send a regular response
            res.send('regular')
      })
      
      // handler for the /user/:id path, which sends a special response
      app.get('/user/:id', (req, res, next) => {
            res.send('special')
      })


## What is a Middleware? Why do we need it? 
    https://www.ibm.com/topics/middleware

## How express JS basically handles requests behind the scenes
  https://expressjs.com/en/guide/using-middleware.html

## Difference  between app.use and app.all
     https://github.com/rohan-paul/Awesome-JavaScript-Interviews/blob/master/Node-Express/app.use-vs-app.get.md

## Write a dummy auth middleware for admin
     const adminAuth = (req,res,next)=>{
    console.log("check whether the Admin is Authorized or not");
       const token = "mohit";
       const IsAdminAuthorized = token === "mohit";
     if(!IsAdminAuthorized){
          res.status(401).send("Admin is not Authorized...")
     }
    else{
          next();
     }
  };

  app.use("/admin",adminAuth,(req,res)=>{
            res.send("admin is authorized...")
  });

## Write a dummy auth middleware for all user routes, except /user/login

     const userAuth = (req,res,next)=>{
    console.log("check whether the user is Authorized or not");
       const token = "mohit";
       const IsUserAuthorized = token === "mohit";
     if(!IsUserAuthorized){
          res.status(401).send("user is not Authorized...")
     }
    else{
          next();
     }
  };

    app.get("/user",userAuth,(req,res)=>{
      res.send("user data sent");
  })

## Error Handling using app.use("/", (err, req, res, next) = {});

       app.get("/user",(req,res)=>{
            try{
                  throw new Error("Something went wrong bhai!!!...");
                  res.send("ohh No you Found some Errors!!!...");
            }
            catch(err){
                  res.status(500).send("Something went wrong Mohit G");
            }
      })

      app.use("/",(err,req,res,next)=>{

            if(err){
            res.status(500).send("Something went wrong mohit bhai");
            }
      })
##
   - 
     https://mongoosejs.com/docs/guide.html
   - Create a free cluster on MongoDB official website (Mongo Atlas)
   - Install mongoose library
   - Connect your application to the Database "Connection-url"/
   - Call the connectDB function and connect to database before starting application on 7777
   - Create a userSchema & user Model
         
            const mongoose = require("mongoose");

            const userScema = new mongoose.Schema({
                  firstName : {
                        type : String
                  },
                  lastName : {
                        type : String
                  },
                  emailId : {
                        type : String
                  },
                  password : {
                        type : String
                  },
                  age : {
                        type : Number
                  },
                  gender : {
                        type : String
                  }
            })
         module.exports = mongoose.model("User",userScema);
         
- Create POST /sigup API to add data to database, Push some documents using API calls from postman, Error Handling using try , catch
    
                      app.post("/signup", async (req,res) => {
                            const user = new User({
                                    firstName : "mohit",
                                    lastName  : "parmar",
                                    emailId   : "mohitparmar1501@gmail.com",
                                    password  : "mohit@123",
                                    age       : 23
        
                          });
                   try{
                        await user.save();
                        res.send("user data has been successfully added...");
                  }catch(err){
                        res.send(400).send("Error found :" + err.message);
               }
              })

## difference between JavaScript object and JSON
    https://stackoverflow.com/questions/3975859/what-are-the-differences-between-json-and-javascript-object

## Add the express.json middleware to your app
 -  simply use it in app.js :
       - app.use(express.json());

## Make your signup API dynamic to receive data from the end user

              app.post("/signup", async (req,res) => {
                  const user = new User (req.body)
                  try{
                        await user.save();
                        res.send("user data has been successfully added...");
                  }catch(err){
                        res.send(400).send("Error found :" + err.message);
                  }
            
            })
## User.findOne with duplicate email ids, which object returned
  - it will return random ...


## findOne()  
  -    app.get("/user", async (req,res) => {

            const UserEmail = req.body.emailId;
            try{
                  console.log("yes it is...")
                  const user = await User.findOne({emailId : UserEmail});
                  
                  if(!user){
                        res.status(404).send("user not found...");
                  }
                  else{
                        res.send(user);
                  }
                  } catch(err){
                  res.send(400).send("Something went wrong...");
                  }
            })  
 ## findById(MongoDBID)

      app.get("/user", async (req, res) => {
            const Id = req.body._id;
      
            if (!Id) {
            return res.status(400).send("ID is required");
            }
      
            try {
            const user = await User.findById(Id).exec(); 
            if (!user) {
            return res.status(404).send("User not found");
            }
            res.status(200).json(user); 
            } catch (err) {
            res.status(500).send(`Something went wrong: ${err.message}`);
            }
      });

## findByIdAndDelete(MongoDBID)
         app.delete("/user", async (req, res) => {
      const Id = req.body._id;
    
      if (!Id) {
        return res.status(400).send("ID is required");
      }
    
      try {
        const user = await User.findByIdAndDelete(Id).exec();
        if (!user) {
          return res.status(404).send("User not found");
        }
        res.status(200).json({
          message: "User data is deleted successfully using MongoDB's _id",
          deletedUser: user,
        });
      } catch (err) {
        res.status(500).send(`Something went wrong: ${err.message}`);
      }
    });
         

## API - Feed API - GET /feed - get all the users from the database
     app.get("/feed", async(req,res) => {
            try {
                  const AllUsers = await User.find({});
                  res.send(AllUsers);
      
            }
            catch(err){
                  res.status(400).send("these is Error!!!")
            }
        })
## Create a delete user API
 
      app.delete("/user",async (req,res) =>{ 
         const UserId = req.body.UserId;
            try 
            {
                  //   const user = await User.findByIdAndDelete(UserId);
                  const user = await User.findByIdAndDelete({_id : UserId});
                  res.send("user deleted successfully...");
            }
            catch(err){
                  res.status(400).send("Something went wrong...");
                  }
            })

## Difference between PATCH and PUT
    https://stackoverflow.com/questions/21660791/what-is-the-main-difference-between-patch-and-put-request

## API - Update a user
       app.patch("/user", async (req,res) => {
            
            const UserId = req.body.UserId;
            const data = req.body;
            console.log(data);
            try{
                  await User.findByIdAndUpdate({_id : UserId},data);
                  res.send("user updated successfully...");
            }catch(err){
                  res.status(400).send("Something went wrong...");
            } 
      })

## Explore the Mongoose Documention for Model methods
  - https://mongoosejs.com/docs/api/model.html

## What are options in a Model.findOneAndUpdate method, explore more about it
 - https://github.com/Automattic/mongoose/issues/4221
 -  https://stackoverflow.com/questions/32811510/mongoose-findoneandupdate-doesnt-return-updated-document

          app.patch("/user", async (req,res) => {
            
            const UserId = req.body.UserId;
            const data = req.body;
            // console.log(data);
            try{
                 // const user =  await User.findByIdAndUpdate({_id : UserId},data,{returnDocument : "before"});
                  const user =  await User.findByIdAndUpdate({_id : UserId},data,{returnDocument : "after"});
                  console.log(user);
                  res.send("user updated successfully...");
            }catch(err){
                  res.status(400).send("Something went wrong...");
            } 
        })


## API - Update the user with email ID



 - app.patch("/user", async (req,res) => {

            const emailId = req.body.emailId;
            const data = req.body;
            // console.log(data);
            try{
                  const user =  await User.findOneAndUpdate({emailId : emailId},data,{returnDocument : "after"});
                 // console.log(user);
                  res.send("user updated successfully...");
            }catch(err){
                  console.log(err.message);
                  res.status(400).send("Something went wrong...");
            } 
      })

- API validation for each field

      app.patch("/user/:userId", async (req, res) => {
       const userId = req.params?.userId;
       const data = req.body;
  
      if (!userId) {
          return res.status(400).json({ error: "userId is required" });
      }
  
      try {
          const ALLOWED_UPDATE = [
              "firstName",
              "lastName",
              "password",
              "age",
              "gender",
              "photoUrl",
              "about",
              "skills",
          ];
  
          // Validate keys in the update data
          const isUpdateAllowed = Object.keys(data).every((key) =>
              ALLOWED_UPDATE.includes(key)
          );
  
          if (!isUpdateAllowed) {
              return res.status(400).json({ error: "Update contains invalid fields" });
          }
  
          // Validate skills length if skills are provided
          if (data?.skills && Array.isArray(data.skills) && data.skills.length > 50) {
              return res.status(400).json({ error: "Skills cannot exceed 50 items" });
          }
  
          // Update the user
          const user = await User.findByIdAndUpdate(userId, data, {
              new: true, // Return the updated document
              runValidators: true, // Apply schema validations
          });
  
          if (!user) {
              return res.status(404).json({ error: "User not found" });
          }
  
          res.status(200).json({
              message: "User updated successfully",
              user,
          });
      } catch (err) {
          res.status(500).json({ error: "Something went wrong", details: err.message });
      }
  });
  
- Add validators for email ,password and photoURL
   -
      https://www.npmjs.com/package/validator

- validate data in signup API
- install bcrypt package
 - https://www.npmjs.com/package/bcrypt
 
- create password using bcrypt.hash and save the user's encrypted password
- create login API
- compare the password and throw errors if email or password is invalid

- install cookies-parser
  - https://www.npmjs.com/package/cookie-parser
  - https://expressjs.com/en/5x/api.html#res.cookie

- send a dummy cookie to user

- install jsonwebtoken 
 - https://www.npmjs.com/package/jsonwebtoken
 - https://jwt.io/

- create GET /profile API and check if you get the cookie back in 
   in login API after email and password validation , create a JWT token and send it to user in cookies.

- read the cookies inside the profile API and find the logged in user.

- userAuth Middleware
- Add the userAuth Middleware in profile API and a new sendconnectionRequest API
- set the expiry of JWT token cookies to 10 days
     const token = await jwt.sign({_id: user._id},"mohit@123",{expiresIn : "10d"});
     
- create userSchema method to getJWT()
    userSchema.methods.getJWT = async function() {
         
    const user = this;
    const token = await jwt.sign({_id: user._id},"mohit@123",{expiresIn : "10d"});
    return token;
}
- create userSchema method to comparePassword(passwordInputByUser)
      userSchema.methods.validatePassword = async function(passwordInputByUser){
            
      const user = this;
      const passwordHash = user.password;

      const isPasswordValid = await bcrypt.compare(
            passwordInputByUser,
            passwordHash
      )
      return isPasswordValid;
      }
    

