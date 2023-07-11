import { Router} from 'express';
import Users from '../models/Users';
import { verify } from "jsonwebtoken";
import cookie from 'cookie';
import 'cookie-parser';


export async function renderProfile(req, res){
  console.log(cookie.parse(req.cookies.sesionToken));

  const userId = verify(
      cookie.parse(req.cookies.sesionToken).tokenId,
      process.env.AUTH_SECRET
  ).id;
  const userData = await Users.findById(userId);
  const {names, lastName, email, username, password} = userData;
  
  res.render('profile', {
      names,
      lastName,
      email,
      username,
      password
  });
}

