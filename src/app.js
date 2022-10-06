import express from 'express';
import indexRoutes from './routes/index.routes';
import { engine } from 'express-handlebars';
import path from 'path';
import morgan from'morgan';
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from 'passport';
import './config/sesion.js';

const app = express();

// settings

app.set('hostname', '');
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', engine({
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    extname: ".hbs"
}));

app.set('view engine', '.hbs')


// middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({ mongoUrl: "mongodb://localhost/crud-mongo" })
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

// routes

app.use(indexRoutes);

//public route

export default app;

