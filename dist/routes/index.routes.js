"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof3 = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _passport = _interopRequireDefault(require("passport"));

var _jsonwebtoken = _interopRequireWildcard(require("jsonwebtoken"));

var _Stdn = _interopRequireDefault(require("../models/Stdn"));

var _Users = _interopRequireDefault(require("../models/Users"));

var _Group = _interopRequireDefault(require("../models/Group"));

var _cookie = _interopRequireWildcard(require("cookie"));

var _tokens = require("../middlewares/tokens");

require("cookie-parser");

var _mongoose = _interopRequireWildcard(require("mongoose"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//import { Cookie } from 'express-session';
//import isAuth from '../helpers/validateAuth';
var router = (0, _express.Router)(); //rutas de la interface de login

router.get('/', function (req, res) {
  if (req.cookies.status) {
    if (req.cookies.status == 'success-account') {
      res.clearCookie('status');
      res.render('login', {
        noNavBar: true,
        login: true,
        success: "The account has been successfully created"
      });
    }
  } else {
    res.render('login', {
      noNavBar: true,
      login: true
    });
  }
});
router.post('/login', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, username, password, errors, usernameFromMongo, matchPassword, token, serialized;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, password = _req$body.password;
            errors = [];
            _context.prev = 2;
            _context.next = 5;
            return _Users["default"].findOne({
              username: username
            });

          case 5:
            usernameFromMongo = _context.sent;

            if (username.length == 0) {
              errors.push({
                text: 'Insert your username'
              });
            }

            if (!(password.length == 0)) {
              _context.next = 11;
              break;
            }

            errors.push({
              text: 'Insert your password'
            });
            _context.next = 16;
            break;

          case 11:
            if (!usernameFromMongo) {
              _context.next = 16;
              break;
            }

            _context.next = 14;
            return usernameFromMongo.matchPassword(password, usernameFromMongo.password);

          case 14:
            matchPassword = _context.sent;

            if (!matchPassword) {
              errors.push({
                text: 'Password incorrect'
              });
            }

          case 16:
            if (!usernameFromMongo && username.length > 0) {
              errors.push({
                text: 'The username does not exist'
              });
            }

            if (errors.length > 0) {
              res.render('login', {
                errors: errors,
                username: username,
                noNavBar: true,
                login: true
              });
            } else {
              token = _jsonwebtoken["default"].sign({
                id: usernameFromMongo._id
              }, process.env.SECRET, {
                expiresIn: 60 * 60 * 24
              });
              serialized = (0, _cookie.serialize)('tokenId', token, {
                httpOnly: true,
                secure: false,
                //true when it is on production: process.env.NODE_ENV == ‘production’,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24,
                path: '/'
              }); //res.setHeader('Set-Cookie', serialized);

              res.cookie('sesionToken', serialized);
              res.redirect('/home');
            }

            _context.next = 23;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 20]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); //rutas de la interface de registro

router.get('/register', function (req, res) {
  res.render('register', {
    noNavBar: true,
    register: true
  });
});
router.post('/register', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body2, names, lastName, email, username, password, confirmPassword, saveU, _saveU, usernameFromMongo, _usernameFromMongo, errors, existingUsername;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _usernameFromMongo = function _usernameFromMongo3() {
              _usernameFromMongo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
                var queryUsernames, userDB;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return _Users["default"].find({
                          username: username
                        }, 'username').lean();

                      case 3:
                        queryUsernames = _context3.sent;
                        userDB = queryUsernames[0].username;
                        return _context3.abrupt("return", userDB);

                      case 8:
                        _context3.prev = 8;
                        _context3.t0 = _context3["catch"](0);

                      case 10:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, null, [[0, 8]]);
              }));
              return _usernameFromMongo.apply(this, arguments);
            };

            usernameFromMongo = function _usernameFromMongo2() {
              return _usernameFromMongo.apply(this, arguments);
            };

            _saveU = function _saveU3() {
              _saveU = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
                var user, userSaved, token;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        user = new _Users["default"]({
                          names: names,
                          lastName: lastName,
                          email: email,
                          username: username,
                          password: password
                        });
                        _context2.next = 3;
                        return user.encryptPassword(password);

                      case 3:
                        user.password = _context2.sent;
                        _context2.next = 6;
                        return user.save();

                      case 6:
                        userSaved = _context2.sent;
                        console.log('user saved as', userSaved);
                        token = _jsonwebtoken["default"].sign({
                          id: userSaved._id
                        }, process.env.SECRET, {
                          expiresIn: 60 * 60 * 24
                        });
                        console.log(token); // res.send({succes: "The account has been successfully created"});

                        res.cookie('status', 'success-account');
                        res.redirect('/');

                      case 12:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));
              return _saveU.apply(this, arguments);
            };

            saveU = function _saveU2() {
              return _saveU.apply(this, arguments);
            };

            _req$body2 = req.body, names = _req$body2.names, lastName = _req$body2.lastName, email = _req$body2.email, username = _req$body2.username, password = _req$body2.password, confirmPassword = _req$body2.confirmPassword;
            _context4.prev = 5;
            errors = [];
            _context4.next = 9;
            return usernameFromMongo();

          case 9:
            existingUsername = _context4.sent;

            if (password != confirmPassword) {
              errors.push({
                text: 'Passwords don´t match'
              });
            }

            if (password.length < 4 || password.length > 12) {
              errors.push({
                text: 'Password must be 4 to 12 characters'
              });
            }

            if (names.length == 0 || lastName.length == 0 || username.length == 0) {
              errors.push({
                text: "the fields names, lastName, username and password are required"
              });
            }

            if (username == existingUsername) {
              errors.push({
                text: 'Username already exists '
              });
            }

            if (errors.length > 0) {
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

            _context4.next = 20;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](5);
            console.log('error: ', _context4.t0);

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[5, 17]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); //rutas de la interface de CRUD

router.get('/:groupName/students/CRUD', _tokens.verifyController, /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var query, i;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            //hay que agragar un $match al inicio pasandole el id proveniente de home
            console.log('parametro', req.params.groupName.charAt(0));
            console.log('parametro', req.params.groupName.charAt(2));
            console.log('parametro', req.params.groupName.substr(3)); //console.log('llegó aqui?');

            _context5.next = 5;
            return _Group["default"].aggregate([{
              $match: {
                grade: req.params.groupName.charAt(0),
                group: req.params.groupName.charAt(2),
                career: req.params.groupName.substr(3)
              }
            }, {
              $unwind: '$students'
            }, {
              $project: {
                _id: "$students._id",
                name: '$students.name',
                grade: '$students.subject_grade',
                status: '$students.status'
              }
            }, {
              $sort: {
                name: 1
              }
            }]);

          case 5:
            query = _context5.sent;
            query.forEach(function (element) {
              return element.groupName = req.params.groupName;
            }); //query.groupName = req.params.groupName;

            for (i = 0; i < query.length; i++) {
              if (query[i].grade == null) {
                query[i].grade = "--";
              }
            }

            if (req.cookies.status) {
              if (req.cookies.status == 'success-student') {
                res.clearCookie('status');
                res.render('crud', {
                  document: query,
                  groupName: req.params.groupName,
                  success: "the student has successfully added to the list"
                });
              }
            } else {
              console.log('document', query);
              res.render('crud', {
                document: query,
                groupName: req.params.groupName
              });
            }

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.post('/:groupName/students/add', _tokens.verifyController, /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var errors, query, i, route;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log('parrrrrammmmetrossssss', req.body);
            errors = [];

            if (req.body.name == 0) {
              errors.push({
                text: 'Please insert a name'
              });
            }
            /*if (req.body.grade.length == 0){
                errors.push({text: 'Please insert a grade'});
            }*/


            if (req.body.subeject_grade < 0 || req.body.subeject_grade > 10) {
              errors.push({
                text: 'Grade must be between 0 and 10'
              });
            }

            if (!(errors.length > 0)) {
              _context6.next = 19;
              break;
            }

            _context6.prev = 5;
            _context6.next = 8;
            return _Group["default"].aggregate([{
              $match: {
                grade: req.params.groupName.charAt(0),
                group: req.params.groupName.charAt(2),
                career: req.params.groupName.substr(3)
              }
            }, {
              $unwind: '$students'
            }, {
              $project: {
                _id: "$students._id",
                name: '$students.name',
                grade: '$students.subject_grade',
                status: '$students.status'
              }
            }, {
              $sort: {
                name: 1
              }
            }]);

          case 8:
            query = _context6.sent;
            query.forEach(function (element) {
              return element.groupName = req.params.groupName;
            });

            for (i = 0; i < query.length; i++) {
              if (query[i].grade == null) {
                query[i].grade = "--";
              }
            }

            res.render('crud', {
              document: query,
              groupName: req.params.groupName,
              errors: errors,
              object: req.body
            });
            _context6.next = 17;
            break;

          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](5);
            console.log(_context6.t0.message);

          case 17:
            _context6.next = 32;
            break;

          case 19:
            _context6.prev = 19;

            if (req.body.status == 'on') {
              req.body.status = true;
            } else {
              req.body.status = false;
            }

            _context6.next = 23;
            return _Group["default"].updateOne({
              grade: req.params.groupName.charAt(0),
              group: req.params.groupName.charAt(2),
              career: req.params.groupName.substr(3)
            }, {
              $push: {
                students: {
                  name: req.body.name,
                  subject_grade: req.body.subeject_grade,
                  status: req.body.status
                }
              }
            });

          case 23:
            res.cookie('status', 'success-student');
            route = '/' + req.params.groupName + '/students/CRUD';
            console.log(route);
            res.redirect(route);
            _context6.next = 32;
            break;

          case 29:
            _context6.prev = 29;
            _context6.t1 = _context6["catch"](19);
            console.log(_context6.t1);

          case 32:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[5, 14], [19, 29]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.get('/:groupName/students/:id/delete', _tokens.verifyController, /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var stdnId, route;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            stdnId = _mongoose["default"].Types.ObjectId(req.params.id);
            _context7.next = 3;
            return _Group["default"].updateOne({
              grade: req.params.groupName.charAt(0),
              group: req.params.groupName.charAt(2),
              career: req.params.groupName.substr(3)
            }, {
              $pull: {
                students: {
                  _id: stdnId
                }
              }
            });

          case 3:
            route = '/' + req.params.groupName + '/students/CRUD';
            res.redirect(route);

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()); //rutas de la interface de edit

router.get('/:groupName/students/:id/edit', _tokens.verifyController, /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var stdnId, object;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            //const stdnId = req.params.id;
            stdnId = _mongoose["default"].Types.ObjectId(req.params.id);
            _context8.next = 4;
            return _Group["default"].aggregate([{
              $match: {
                grade: req.params.groupName.charAt(0),
                group: req.params.groupName.charAt(2),
                career: req.params.groupName.substr(3)
              }
            }, {
              $unwind: '$students'
            }, {
              $match: {
                "students._id": stdnId
              }
            }, {
              $project: {
                _id: "$students._id",
                name: "$students.name",
                subject_grade: "$students.subject_grade",
                status: "$students.status"
              }
            }]);

          case 4:
            object = _context8.sent;
            object = object[0];
            console.log('objjjetooo-', object);
            console.log((0, _typeof2["default"])(object.status), object.status);
            res.render('edit', {
              object: object,
              groupName: req.params.groupName
            });
            _context8.next = 14;
            break;

          case 11:
            _context8.prev = 11;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0.message);

          case 14:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 11]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
router.post('/:groupName/students/:id/edit', _tokens.verifyController, /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var errors, stdnId, object, _stdnId, route;

    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            errors = [];
            console.log((0, _typeof2["default"])(req.body.status));
            console.log(req.body.status);

            if (req.body.name.length == 0) {
              errors.push({
                text: 'Please insert a name'
              });
            }

            if (req.body.subject_grade < 0 || req.body.subject_grade > 10) {
              errors.push({
                text: 'Grade must be between 0 and 10'
              });
            }

            if (req.body.status == 'on' || req.body.status == 'true' || req.body.status == 'True' || req.body.status == true) {
              req.body.status = true;
            } else {
              req.body.status = false;
            }

            if (!(errors.length > 0)) {
              _context9.next = 23;
              break;
            }

            _context9.prev = 7;
            //const stdnId = req.params.id;
            stdnId = _mongoose["default"].Types.ObjectId(req.params.id);
            _context9.next = 11;
            return _Group["default"].aggregate([{
              $match: {
                grade: req.params.groupName.charAt(0),
                group: req.params.groupName.charAt(2),
                career: req.params.groupName.substr(3)
              }
            }, {
              $unwind: '$students'
            }, {
              $match: {
                "students._id": stdnId
              }
            }, {
              $project: {
                _id: "$students._id",
                name: "$students.name",
                subject_grade: "$students.subject_grade",
                status: "$students.status"
              }
            }]);

          case 11:
            object = _context9.sent;
            object = object[0];
            console.log('objjjetooo-', object);
            console.log((0, _typeof2["default"])(object.status), object.status);
            res.render('edit', {
              object: object,
              groupName: req.params.groupName,
              errors: errors
            });
            _context9.next = 21;
            break;

          case 18:
            _context9.prev = 18;
            _context9.t0 = _context9["catch"](7);
            console.log(_context9.t0.message);

          case 21:
            _context9.next = 29;
            break;

          case 23:
            console.log(req.params.id);
            _stdnId = _mongoose["default"].Types.ObjectId(req.params.id);
            _context9.next = 27;
            return _Group["default"].updateOne({
              grade: req.params.groupName.charAt(0),
              group: req.params.groupName.charAt(2),
              career: req.params.groupName.substr(3),
              "students._id": _stdnId
            }, {
              $set: {
                "students.$": {
                  name: req.body.name,
                  subject_grade: req.body.subject_grade,
                  status: req.body.status
                }
              }
            });

          case 27:
            route = '/' + req.params.groupName + '/students/CRUD';
            res.redirect(route);

          case 29:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[7, 18]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}()); //ruta de la interface about

router.get('/about', function (req, res) {
  res.render('about');
}); //rutas de la interface home

router.get('/home', _tokens.verifyController, /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var userId, user, allGroups, arrayOfGroups;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            userId = (0, _jsonwebtoken.verify)(_cookie["default"].parse(req.cookies.sesionToken).tokenId, process.env.SECRET).id;
            _context10.next = 3;
            return _Users["default"].findOne({
              _id: userId
            }, 'groups');

          case 3:
            user = _context10.sent;
            console.log('what does return this?', user);
            _context10.next = 7;
            return _Group["default"].find({
              _id: {
                $in: user.groups
              }
            }).lean();

          case 7:
            allGroups = _context10.sent;
            console.log('is it an array on an object?', allGroups);
            arrayOfGroups = allGroups.map(function (element) {
              return element.grade + '°' + element.group + '\n' + element.career;
            });
            res.render('home', {
              groups: arrayOfGroups,
              userId: userId
            });

          case 11:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
router.get('/home/group/:id', _tokens.verifyController, function (req, res) {
  var userId = req.params.id;
  res.render('group', {
    userId: userId
  });
});
router.post('/home/group/:id/add', _tokens.verifyController, /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var _req$body3, grade, group, career, groupId, existingGroups, saveG, _saveG, errors;

    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _saveG = function _saveG3() {
              _saveG = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
                var groupSaved;
                return _regenerator["default"].wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        _context11.next = 2;
                        return _Users["default"].findByIdAndUpdate(req.params.id, {
                          $push: {
                            groups: groupId
                          }
                        });

                      case 2:
                        groupSaved = _context11.sent;
                        groupSaved.save();
                        res.redirect('/home');

                      case 5:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11);
              }));
              return _saveG.apply(this, arguments);
            };

            saveG = function _saveG2() {
              return _saveG.apply(this, arguments);
            };

            //actualizar en la coleccion original e insertar a la coleccion del usuario que guarde los grupos en home, hacer
            //validators para dicha funcion, verficar que no se repitan las clases
            _req$body3 = req.body, grade = _req$body3.grade, group = _req$body3.group, career = _req$body3.career;
            _context12.next = 5;
            return _Group["default"].findOne({
              grade: grade,
              group: group,
              career: career
            }, '_id');

          case 5:
            groupId = _context12.sent;
            groupId = groupId._id.valueOf();
            _context12.next = 9;
            return _Users["default"].findById(req.params.id, 'groups');

          case 9:
            existingGroups = _context12.sent;

            try {
              errors = [];

              if (!grade) {
                errors.push({
                  text: "Insert the grade"
                });
              }

              if (!group) {
                errors.push({
                  text: "Insert the grade"
                });
              }

              if (!career) {
                errors.push({
                  text: "Insert the career"
                });
              }

              if (existingGroups.groups.includes(groupId)) {
                errors.push({
                  text: "you have already added"
                });
              }

              if (errors.length > 0) {
                res.render('group', {
                  errors: errors,
                  grade: grade,
                  group: group,
                  career: career,
                  userId: req.params.id
                });
              } else {
                saveG();
              }
            } catch (error) {}

          case 11:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
router.get('/recover', function (req, res) {
  res.send('<body style="background-color: rgb(102, 153, 51)"><h1 style="text-align: center; margin: 20% 0%; color: white; font-size: 50px;">Coming Soon</h1></body>');
});
router.get('/profile', _tokens.verifyController, /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var userId, userData, names, lastName, email, username, password;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            console.log(_cookie["default"].parse(req.cookies.sesionToken));
            userId = (0, _jsonwebtoken.verify)(_cookie["default"].parse(req.cookies.sesionToken).tokenId, process.env.SECRET).id;
            _context13.next = 4;
            return _Users["default"].findById(userId);

          case 4:
            userData = _context13.sent;
            names = userData.names, lastName = userData.lastName, email = userData.email, username = userData.username, password = userData.password;
            res.render('profile', {
              names: names,
              lastName: lastName,
              email: email,
              username: username,
              password: password
            });

          case 7:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());
router.get('/logout', _tokens.logoutController);
var _default = router;
exports["default"] = _default;