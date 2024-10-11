const adminAuth = (req,res,next)=>{
    console.log("check whether the Admin is Authorized or not");
       const token = "mohit";
       const IsAdminAuthorized = token === "mohitbhai";
     if(!IsAdminAuthorized){
          res.status(401).send("Admin is not Authorized...")
     }
    else{
          next();
     }
};

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

module.exports = {adminAuth,userAuth};