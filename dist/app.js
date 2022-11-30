"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("./routes/index.routes"));

var dotenv = _interopRequireWildcard(require("dotenv"));

var _expressHandlebars = require("express-handlebars");

var _path = _interopRequireDefault(require("path"));

var _morgan = _interopRequireDefault(require("morgan"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _setup = require("./libs/setup.js");

var _passport = _interopRequireDefault(require("passport"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

require("./config/sesion.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var app = (0, _express["default"])();
dotenv.config();
(0, _setup.createGroups)(); // settings

app.set('hostname', '');
app.set('port', process.env.PORT);
app.set('views', _path["default"].join(__dirname, 'views'));
app.engine('.hbs', (0, _expressHandlebars.engine)({
  layoutDir: _path["default"].join(app.get('views'), 'layouts'),
  partialsDir: _path["default"].join(app.get('views'), 'partials'),
  defaultLayout: 'main',
  extname: ".hbs",
  helpers: {
    graterThan5: function graterThan5(value) {
      value = value + 1;
      return value > 0 && value % 6 == 0 ? true : false;
    }
  }
}));
app.set('view engine', '.hbs'); // middlewares

app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _expressSession["default"])({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
  store: _connectMongo["default"].create({
    mongoUrl: "mongodb://localhost/crud-mongo"
  })
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use(_express["default"]["static"](_path["default"].join(__dirname, "public")));
app.use((0, _cookieParser["default"])()); // app.use(function(req, res, next) {
//   res.status(404).render('error404', {noNavBar: true});
// });
// routes

app.use(_index["default"]); //public route

var _default = app;
exports["default"] = _default;