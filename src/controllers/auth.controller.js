import jwt from 'jsonwebtoken';
import Users from '../models/Users';
import {serialize} from 'cookie';
import { Transporter } from '../libs/nodemailer';
import { google } from 'googleapis';
import 'cookie-parser';

//controladores de la interface de login

export function renderLogin (req, res) {
  if(req.cookies.status){
      if(req.cookies.status == 'success-account'){
          res.clearCookie('status');
          res.render('login', {
              noNavBar: true,
              login: true,
              success: "The account has been successfully created"
          });
      }
  } else {
      res.render('login', {noNavBar: true, login: true});
  }
}

export async function loginHandler (req, res){
  const {username, password} = req.body;
  const errors = [];
  try {
      const usernameFromMongo = await Users.findOne({username});
      if(username.length == 0){
          errors.push({text: 'Insert your username'});
      }
      if(password.length == 0){
          errors.push({text: 'Insert your password'});
      } else {
          if(usernameFromMongo){
              const matchPassword = await usernameFromMongo.matchPassword(password, usernameFromMongo.password);
              if(!matchPassword){
                  errors.push({text: 'Password incorrect'});
              }
          }    
      }
      if(!usernameFromMongo && username.length > 0){
          errors.push({text: ('The username does not exist')});
      }
      if (errors.length > 0){
          res.render('login', {errors: errors, username,noNavBar: true, login: true});
      } else {
          const token = jwt.sign({id: usernameFromMongo._id}, process.env.SECRET, {expiresIn: 60*60*24});
          const serialized = serialize('tokenId', token, {
              httpOnly: true,
              secure: false, //true when it is on production: process.env.NODE_ENV == ‘production’,
              sameSite: 'strict',
              maxAge: 60*60*24,
              path: '/'
          });
          //res.setHeader('Set-Cookie', serialized);
          res.cookie('sesionToken', serialized);
          res.redirect('/home');
      }
  } catch (error) {
      console.log(error);
  }
}

//controladores de la interface de registro

export function renderRegister(req, res) {
  res.render('register', {noNavBar: true, register: true});
}

export async function registerHandler (req, res) {
  const {names, lastName, email, username, password, confirmPassword} = req.body;

  async function saveU(){
      const user = new Users({names, lastName, email, username, password});
      user.password = await user.encryptPassword(password);
      const userSaved = await user.save();
      console.log('user saved as', userSaved);

      const token = jwt.sign({id: userSaved._id}, process.env.SECRET, {expiresIn: 60*60*24});
      console.log(token);
      
      // res.send({succes: "The account has been successfully created"});
      res.cookie('status', 'success-account');
      res.redirect('/');
  }

  async function usernameFromMongo(){
      try {
          //change the query to findOne
          const queryUsernames = await Users.find({username}, 'username').lean();
          const userDB = queryUsernames[0].username;
          return userDB;
      } catch (error) {
          //pass
      }
      
  }

  try{
      const errors = [];
      const existingUsername = await usernameFromMongo();
      if (password != confirmPassword){
          errors.push({text: 'Passwords don´t match'});
      }
      if (password.length < 4 || password.length > 12){
          errors.push({text:'Password must be 4 to 12 characters'});
      }
      if (names.length == 0 || lastName.length == 0 || username.length == 0){
          errors.push({text: "the fields names, lastName, username and password are required"});
      }
      if (username == existingUsername){
          errors.push({text: 'Username already exists '});
      }
      if (errors.length > 0){
          res.render('register', {
              errors: errors,
              noNavBar: true,
              register: true,
              names: names,
              lastName: lastName,
              email: email,
              username: username
          });
      } else {
          saveU();
      }
  } catch (error){
      console.log('error: ', error);
  }
}

export function recoverPasswordRender(req, res) {
  res.render('recoverPassword', {
    noNavBar: true,
  })
} 

export async function recoverPasswordHandler(req, res) {
  
  const {email} = req.body;

  try {
    const userFromMongo = await Users.findOne({email});
    console.log(userFromMongo);

    if(userFromMongo == null || userFromMongo.length ==0) return res.render('recoverPassword', {
        noNavBar: true,
        errors: [{text: "The email is not on the system"}]
    });

    const id = userFromMongo._id
    const token = jwt.sign({email, id}, process.env.SECRET, {expiresIn: 60*5});
    
    // google api config

    const oauth2Client = new google.auth.OAuth2(
        process.env.OAUTH2_CLIENT_ID,
        process.env.OAUTH2_CLIENT_SECRET,
        process.env.OAUTH2_REDIRECT_URL
    );

    oauth2Client.setCredentials({refresh_token: process.env.OAUTH2_REFRESH_TOKEN});
    const accessToken = await oauth2Client.getAccessToken();

    // nodemailer

    const transporter = Transporter(accessToken);

    var mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset",
        text: `${token}`
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log("Email sent: " + info.response);
        res.status(200).send(info.response);
    }
    });
      
  } catch (error) {
      console.error('error', error);
  }
}