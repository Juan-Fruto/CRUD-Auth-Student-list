"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

var _Users = _interopRequireDefault(require("../models/Users"));

_passport["default"].use(new _passportLocal.Strategy({
  usernameField: 'username',
  passwordField: 'password'
}, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(username, password, done) {
    var userObject, match;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Users["default"].findOne({
              username: username
            });

          case 2:
            userObject = _context.sent;

            if (userObject) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", done(null, false, {
              message: 'user do not exists'
            }));

          case 7:
            _context.next = 9;
            return userObject.matchPassword(password);

          case 9:
            match = _context.sent;

            if (!match) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", done(null, userObject));

          case 14:
            return _context.abrupt("return", done(null, false, {
              message: 'Incorrect password'
            }));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()));

_passport["default"].serializeUser(function (user, done) {
  done(null, user.id);
});

_passport["default"].deserializeUser(function (id, done) {
  _Users["default"].findById(id, function (err, user) {
    done(err, user);
  });
});