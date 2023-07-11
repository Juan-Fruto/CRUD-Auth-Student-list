import Users from '../models/Users';
import Group from '../models/Group';
import { verify } from "jsonwebtoken";
import cookie from 'cookie';
import 'cookie-parser';

//controlador de la interface home

export async function renderHome (req, res) {
    const userId = verify(cookie.parse(req.cookies.sesionToken).tokenId, process.env.AUTH_SECRET).id;

    const user = await Users.findOne({_id: userId}, 'groups');

    console.log('what does return this?', user);
    
    const allGroups = await Group.find({ _id: { $in: user.groups } }).lean()

    console.log('is it an array on an object?', allGroups);

    const arrayOfGroups = allGroups.map(function (element){
        return element.grade + '°' + element.group + '\n' + element.career;
    });

    res.render('home', {groups: arrayOfGroups, userId: userId});
}

//controlador de la interface about

export function renderAbout (req, res) {
    res.render('about');
}