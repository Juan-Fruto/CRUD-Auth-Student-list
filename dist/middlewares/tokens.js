"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.logoutController = logoutController;
exports.verifyController = verifyController;

var _jsonwebtoken = require("jsonwebtoken");

var _cookie = _interopRequireDefault(require("cookie"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _Users = _interopRequireDefault(require("../models/Users"));

function verifyController(req, res, next) {
  //const {tokenId} = cookies;
  try {
    console.log('cookie from crud:\n', _cookie["default"].parse(req.cookies.sesionToken).tokenId);
    var personalData = (0, _jsonwebtoken.verify)(_cookie["default"].parse(req.cookies.sesionToken).tokenId, process.env.SECRET);
    console.log(personalData.id); //funcion para comprobar el id en la bd, y hacer un logoutController para log out

    var userFromMongo = _Users["default"].findById(personalData.id);

    console.log('llegó aqui?');

    if (userFromMongo) {
      next();
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
}

function logoutController(req, res, next) {
  res.clearCookie('sesionToken');
  res.redirect('/');
}

var _default = {
  verifyController: verifyController,
  logoutController: logoutController
};
exports["default"] = _default;