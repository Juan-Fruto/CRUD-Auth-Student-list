import { verify } from "jsonwebtoken";
import cookie from 'cookie';
import Users from '../models/Users';
import { Types } from 'mongoose';

export async function verifyResetToken(req, res, next){
  try {
    const {id, jwtToken} = req.params;
    const errors = [];

    // verify the jwt token
    const decoded = verify(jwtToken, process.env.RESET_SECRET);
    console.log('decode outside', decoded);

    // verify if the user id´s are the same
    if(id !== decoded.id) errors.push({text: 'Invalid jwt token'});

    // verfy if the user exists
    const objectId = Types.ObjectId(id);

    const userFromMongo = await Users.findById(objectId).lean();

    if(!userFromMongo) errors.push({text: 'The user does not exist'});
    
    // seting the errors in the request
    console.log("errors in the middleware", errors);
    req.errors = errors;

    next();

  } catch (error) {
    console.log(error);
    return res.render('verify.recover.hbs', {
        noNavBar: true,
        errors: [{text: `${error.message}`}]
    });
  }
}

export function verifyAuthToken(req, res, next){
    //const {tokenId} = cookies;
    try {
        console.log('cookie from crud:\n', cookie.parse(req.cookies.sesionToken).tokenId);
        const personalData = verify(cookie.parse(req.cookies.sesionToken).tokenId, process.env.AUTH_SECRET);
        console.log(personalData.id);
        //funcion para comprobar el id en la bd, y hacer un logoutController para log out
        const userFromMongo = Users.findById(personalData.id);
        console.log('llegó aqui?');
        if(userFromMongo){
            next();
        } else{
            res.redirect('/');
        }

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
} 

export function logoutController(req, res, next){
    res.clearCookie('sesionToken');
    res.redirect('/');
}

export default {
    verifyAuthToken,
    logoutController
};
