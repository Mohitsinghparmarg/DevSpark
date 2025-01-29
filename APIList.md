# Developer Community APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId

## userRouter
- /user/requests/received

- GET /user/connections 
- GET /user/feed - Gets you the profile of other users on platform



Status : ignore,interested,accepted,rejected
