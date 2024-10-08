

## 
   - we can also match the regular expressions in Routing

     - ? -> optional
       app.get("/ab?c", (req,res) => {
        res.send({firstName: "mohit",lastName:"parmar"});
     })

     - +
      app.get("/ab+c", (req,res) => {
        res.send({firstName: "mohit",lastName:"parmar"});
     })

     - *
       app.get("/ab*c", (req,res) => {
        res.send({firstName: "mohit",lastName:"parmar"});
     })

     - ()? or ()+ or ()*
         app.get("/a(bc)?c", (req,res) => {
        res.send({firstName: "mohit",lastName:"parmar"});
    })
- we can also use the Reges....
    - /a/
       app.get(/a/, (req,res) => {
        res.send({firstName: "mohit",lastName:"parmar"});
    })
  
    - /.*fly$/
       app.get(/.*fly$/, (req,res) => {
        res.send({firstName: "mohit",lastName:"parmar"});
     })
## query param and dynamic routes
- making the API call like this -> http://localhost:7777/user?userId=1&password=123
   app.get("/user", (req,res) => {
       console.log(req.query); // we use req.query to find the info of those parameters
        res.send({firstName: "mohit",lastName:"parmar"});
  })
- to manage  these stuffs -> http://localhost:7777/user/101
    app.get("/user/:userId", (req,res) => {
       console.log(req.params); // with the help of req.params we find the given ID
        res.send({firstName: "mohit",lastName:"parmar"});
   })

-  http://localhost:7777/user/101/mohit/mohit123
   app.get("/user/:userId/:name/:password", (req,res) => {
       console.log(req.params);
        res.send({firstName: "mohit",lastName:"parmar"});
   })
