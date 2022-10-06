import { Router} from 'express';
import passport from 'passport';
import Stdn from '../models/Stdn';
import Users from '../models/Users';

const router =  Router();

//rutas de la interface de login

router.get('/', function (req, res) {
    res.render('login', {noNavBar: true});
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/students/CRUD',
    failureRedirect: '/',
    failureFlash: false
}));

//rutas de la interface de registro

router.get('/register', function (req, res) {
    res.render('register', {noNavBar: true});
});

router.post('/register', function (req, res) {
    const {names, lastName, group, username, password, confirmPassword} = req.body;

    async function saveU(){
        const user = new Users({names, lastName, group, username, password});
        user.password = await user.encryptPassword(password);
        const userSaved = await user.save();
        console.log(userSaved);

        res.redirect('/');
    }

    try{
        const errors = [];
        if (password != confirmPassword){
            errors.push({text: 'Passwords don´t match'});
        }
        if (password.length < 4 || password.length > 12){
            errors.push({text:'Password must be 4 to 12 characters'});
        }
        if (errors.length > 0){
            res.render('register', {
                errors: errors,
                noNavBar: true,
                names: names,
                lastName: lastName,
                group: group,
                username: username
            });
        } else {
            saveU();
        }
    } catch (error){
        console.log(error.messages); 
    } 
});

//rutas de la interface de CRUD
router.get('/students/CRUD', async function (req, res) {
    const query = await Stdn.find().lean();
    res.render('crud', {document: query});
}); 

router.post('/students/add', async function (req, res) {
    try{
        if(req.body.status == 'on'){
            req.body.status = true;
        } else{
            req.body.status = false;
        }
        const stdn = Stdn(req.body);
        const stdnSaved = await stdn.save();
        console.log(stdnSaved);
        res.redirect('/students/CRUD');
    } catch (error){
        console.log(error); 
    } 
});

router.get('/students/:id/delete', async function(req, res){
    console.log(req.params.id);
    await Stdn.findByIdAndDelete(req.params.id);
    res.redirect('/students/CRUD');
});

//rutas de la interface de edit

router.get('/students/:id/edit', async function(req, res){
    try {
        let object = await Stdn.findById(req.params.id).lean();
        console.log(req.params.id);
        console.log(typeof object.status, object.status);
        
        res.render('edit', {object});
    } catch (error) {
        console.log(error.message);
    }
});

router.post('/students/:id/edit', async function(req, res){
    console.log(typeof req.body.status);
    console.log(req.body.status);
    if(req.body.status == 'on' || req.body.status == 'true' || req.body.status == 'True' || req.body.status == true){
        req.body.status = true;
    } else{
        req.body.status = false;
    }
    console.log(req.params.id);
    await Stdn.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/students/CRUD');
});

//ruta de la interface about

router.get('/about', function (req, res) {
    res.render('about');
});

export default router;
