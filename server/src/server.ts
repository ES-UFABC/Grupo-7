import e from "express";
import * as dbConnect from "./models/db-connection";
import { config } from "./config";
//import * as productService from "./services/product";
import * as fileService from "./services/file";
import multer from "multer";
import * as producerService from "./services/producer-service"
import * as userService from "./services/user-service"
import * as productService from "./services/product-service"
import JWT from 'jsonwebtoken'

//import * as producerModel from "../models/producer-model";
//import * as userModel from "../models/user-model";
// import * as productModel from "./models/product-model";


import cors from "cors";
import { ok } from "assert";
// import * as mocker from "./mocker"
// import { Producer, ProducerDAO } from "./models/producer-model";

//import  passport from "passport"

//var GoogleStrategy = require('passport-google-oauth20').Strategy;

import * as breeder from "./models/mocker-populate"
import session from "express-session";
/**
 * Configure session middleware
 */
const app = e();
const upload = multer();

app.use(e.json());
app.use(e.urlencoded({ extended: true })); // to use
app.use(cors());
//app.use(passport.initialize())


// credencials 
app.use(function(req, res, next) {
res.header('Content-Type', 'application/json;charset=UTF-8')
res.header('Access-Control-Allow-Credentials')
res.header(
  'Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept'
)
next()
})

/**
 * @Test
 * Products routes
 */
app.post("/products", userService.UserService.getInstance().auth , async (req : e.Request | any, res) => {
  req.body.producerId = req.user.id
  await productService.ProductService.getInstance().insert(req,res)
});

app.get("/producers/:id/products" ,async (req,res) => {
  await productService.ProductService.getInstance().findByProducerId(req,res)
});


app.get("/producers/products", userService.UserService.getInstance().auth , async (req : e.Request | any,res) => {
  req.body.producerId = req.user.id
  await productService.ProductService.getInstance().findByProducerId(req,res)
});

app.get("/products", async (req,res) =>
  await productService.ProductService.getInstance().listAll(req,res)
);

app.get("/products/search/:word", async (req,res) =>
await productService.ProductService.getInstance().listAllByName(req,res)
);


/***
 * Files end point
 */
app.post("/files", upload.single("file"), fileService.create);
app.get("/files/:filename", fileService.get);


/**
 * Producers routes
 */
app.get("/producers", async (req,res) =>{

    await producerService.ProducerService.getInstance().listAll(req,res)
}

);

app.get("/producers/:id", async (req,res) =>{

  await producerService.ProducerService.getInstance().findById(req,res)
}
  
);


/**
 * Users routes
 */
app.get("/users/:id", async (req,res) =>
  await userService.UserService.getInstance().findById(req,res)
);
// TODO: 
app.get("/mocker", async (req,res) => {
  await breeder.add(req,res)
})

app.put("/register", async (req,res) => {
  console.log("Estou registrando")
  await userService.UserService.getInstance().insert(req,res)

})
app.put("/login", async (req,res) => {
  await userService.UserService.getInstance().loginProcessing(req,res)
})

app.get("/me/", userService.UserService.getInstance().auth ,  async (req : e.Request | any ,res) =>
{
  console.log("user:   ",req.user)
  req.body = req.user
  await userService.UserService.getInstance().findById(req,res)
  //res.status(200).json({user:req.user})
})

// passport.use(new GoogleStrategy({
//   clientID:  process.env.GOOGLE_API_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
//   callbackURL: process.env.GOOGLE_API_REDIRECT,
//   passReqToCallback: true,
//   session: false
// },
// function(request: any, accessToken: any, refreshToken: any, profile: any, done: (arg0: null, arg1: any) => any) {
//   console.log("req ", request)
//   console.log("Access token", accessToken)
//   console.log("Refress", refreshToken)
//   console.log("profile", profile)
  
//   // CHECK IF EMAIL MATCH return JWT 
//   // se nao, cria uma conta

//   return done(null, profile);
// }));


// app.get('/google', (req, res) => {
//   res.send('<a href="/auth/google">Authenticate with Google</a>');
// });

// app.get('/auth/google',
//   passport.authenticate('google', { session: false ,scope: [ 'email', 'profile' ] }
// ));

// app.get('/login-google',
//   passport.authenticate( 'google', {
//     session: false,
//     successRedirect: '/producers',
//     failureRedirect: '/auth/google/failure'
//   })
// );


// app.get('/auth/google/failure', (req, res) => {
//   res.send('Failed to authenticate..');
// });

/**
 * Server stack set-up
 */
console.log("Starting server stack...");
dbConnect
  .connect()
  .then(() => {
    app.listen(config["server-port"], () => {
      console.log(`Server listening at ${config["server-port"]}`);
      
    });
  })
  .catch((error) => {
    console.error("Failed to load server stack");
    console.error(error.stack);
  });

/**
 * Server stack tear-down
 */

process.on("exit", (code) => {
  console.log(`Server exiting with code ${code}`);
});
function exitHandler() {
  dbConnect
    .disconnect()
    .then(() => process.exit())
    .catch((error) => {
      console.error("Failed to shutdown server stack");
      console.error(error.stack);
    });
}
process.once("SIGINT", exitHandler);
process.once("SIGUSR2", exitHandler);
function err(err: any, profile: { id: any; }) {
  throw new Error("Function not implemented.");
}

