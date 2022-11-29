"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _passport = _interopRequireDefault(require("passport"));

var _jsonwebtoken = _interopRequireWildcard(require("jsonwebtoken"));

var _Stdn = _interopRequireDefault(require("../models/Stdn"));

var _Users = _interopRequireDefault(require("../models/Users"));

var _Group = _interopRequireDefault(require("../models/Group"));

var _cookie = _interopRequireWildcard(require("cookie"));

var _tokens = require("../middlewares/tokens");

require("cookie-parser");

var _mongoose = require("mongoose");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, username, password, errors, usernameFromMongo, matchPassword, token, serialized;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
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
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body2, names, lastName, email, username, password, confirmPassword, saveU, _saveU, usernameFromMongo, _usernameFromMongo, errors, existingUsername;

    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _usernameFromMongo = function _usernameFromMongo3() {
              _usernameFromMongo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
                var queryUsernames, userDB;
                return _regeneratorRuntime().wrap(function _callee3$(_context3) {
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
              _saveU = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
                var user, userSaved, token;
                return _regeneratorRuntime().wrap(function _callee2$(_context2) {
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
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var query, i;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
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
                grade: '$students.subeject_grade',
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
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var errors, query, i, route;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
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
              _context6.next = 18;
              break;
            }

            _context6.prev = 5;
            _context6.next = 8;
            return _Group["default"].aggregate([{
              $unwind: '$students'
            }, {
              $project: {
                name: '$students.name',
                grade: '$students.subeject_grade',
                status: '$students.status'
              }
            }, {
              $sort: {
                name: 1
              }
            }]);

          case 8:
            query = _context6.sent;

            for (i = 0; i < query.length; i++) {
              if (query[i].grade == null) {
                query[i].grade = "--";
              }
            }

            res.render('crud', {
              document: query,
              groupName: req.params.groupName,
              errors: errors
            });
            _context6.next = 16;
            break;

          case 13:
            _context6.prev = 13;
            _context6.t0 = _context6["catch"](5);
            console.log(_context6.t0.message);

          case 16:
            _context6.next = 31;
            break;

          case 18:
            _context6.prev = 18;

            if (req.body.status == 'on') {
              req.body.status = true;
            } else {
              req.body.status = false;
            } // const stdn = Stdn(req.body);
            // console.log('request body', req.body);
            // const stdnSaved = await stdn.save();


            _context6.next = 22;
            return _Group["default"].updateOne({
              grade: req.params.groupName.charAt(0),
              group: req.params.groupName.charAt(2),
              career: req.params.groupName.substr(3)
            }, {
              $push: {
                students: {
                  name: req.body.name,
                  subeject_grade: req.body.subeject_grade,
                  status: req.body.status
                }
              }
            });

          case 22:
            // await Group.findByIdAndUpdate(
            //     {$match: {grade: req.params.groupName.charAt(0), group: req.params.groupName.charAt(2), career: req.params.groupName.substr(3)}},
            //     {$push: {students: {
            //         name: req.body.name,
            //         subeject_grade: req.body.subeject_grade,
            //         status: req.body.status
            //     }}}
            // )
            res.cookie('status', 'success-student');
            route = '/' + req.params.groupName + '/students/CRUD';
            console.log(route);
            res.redirect(route);
            _context6.next = 31;
            break;

          case 28:
            _context6.prev = 28;
            _context6.t1 = _context6["catch"](18);
            console.log(_context6.t1);

          case 31:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[5, 13], [18, 28]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.get('/:groupName/students/:id/delete', _tokens.verifyController, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            console.log(req.params.id);
            _context7.next = 3;
            return _Stdn["default"].findByIdAndDelete(req.params.id);

          case 3:
            res.redirect('/students/CRUD');

          case 4:
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
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var stdnId, object;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            stdnId = Mongoose.Types.ObjectId(req.params.id);
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
                _id: stdnId
              }
            }, {
              $project: {
                _id: "$students._id",
                name: "$students.name",
                subeject_grade: "$students.subeject_grade"
              }
            }]);

          case 4:
            object = _context8.sent;
            //object.lean();
            console.log('objjjetooo-', object);
            console.log(_typeof(object.status), object.status);
            res.render('edit', {
              object: object
            });
            _context8.next = 13;
            break;

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0.message);

          case 13:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 10]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
router.post('/:groupNanme/students/:id/edit', _tokens.verifyController, /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var errors, object;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            errors = [];
            console.log(_typeof(req.body.status));
            console.log(req.body.status);

            if (req.body.name.length == 0) {
              errors.push({
                text: 'Please insert a name'
              });
            }

            if (req.body.grade < 0 || req.body.grade > 10) {
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
              _context9.next = 19;
              break;
            }

            _context9.prev = 7;
            _context9.next = 10;
            return _Stdn["default"].findById(req.params.id).lean();

          case 10:
            object = _context9.sent;
            res.render('edit', {
              object: object,
              errors: errors
            });
            _context9.next = 17;
            break;

          case 14:
            _context9.prev = 14;
            _context9.t0 = _context9["catch"](7);
            console.log(_context9.t0.message);

          case 17:
            _context9.next = 23;
            break;

          case 19:
            console.log(req.params.id);
            _context9.next = 22;
            return _Stdn["default"].findByIdAndUpdate(req.params.id, req.body);

          case 22:
            res.redirect('/students/CRUD');

          case 23:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[7, 14]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}()); //ruta de la interface about

router.get('/about', function (req, res) {
  res.render('about');
}); //rutas de la interface home

router.get('/home', _tokens.verifyController, /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var userId, query, arrayOfGroups;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            userId = (0, _jsonwebtoken.verify)(_cookie["default"].parse(req.cookies.sesionToken).tokenId, process.env.SECRET).id;
            _context11.next = 3;
            return _Users["default"].findOne({
              _id: userId
            }, 'groups');

          case 3:
            query = _context11.sent;
            console.log('-----groups:', query.groups);
            arrayOfGroups = [];
            query.groups.forEach( /*#__PURE__*/function () {
              var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(groupId) {
                var atributtesOfGroup, grade, group, career;
                return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.next = 2;
                        return _Group["default"].findById(groupId);

                      case 2:
                        atributtesOfGroup = _context10.sent;
                        grade = atributtesOfGroup.grade, group = atributtesOfGroup.group, career = atributtesOfGroup.career;
                        arrayOfGroups.push(grade + '°' + group + '\n' + career);

                      case 5:
                      case "end":
                        return _context10.stop();
                    }
                  }
                }, _callee10);
              }));

              return function (_x17) {
                return _ref9.apply(this, arguments);
              };
            }());
            res.render('home', {
              groups: arrayOfGroups,
              userId: userId
            });

          case 8:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
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
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var _req$body3, grade, group, career, groupId, existingGroups, saveG, _saveG, errors;

    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _saveG = function _saveG3() {
              _saveG = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
                var groupSaved;
                return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.next = 2;
                        return _Users["default"].findByIdAndUpdate(req.params.id, {
                          $push: {
                            groups: groupId
                          }
                        });

                      case 2:
                        groupSaved = _context12.sent;
                        groupSaved.save();
                        res.redirect('/home');

                      case 5:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, _callee12);
              }));
              return _saveG.apply(this, arguments);
            };

            saveG = function _saveG2() {
              return _saveG.apply(this, arguments);
            };

            //actualizar en la coleccion original e insertar a la coleccion del usuario que guarde los grupos en home, hacer
            //validators para dicha funcion, verficar que no se repitan las clases
            _req$body3 = req.body, grade = _req$body3.grade, group = _req$body3.group, career = _req$body3.career;
            _context13.next = 5;
            return _Group["default"].findOne({
              grade: grade,
              group: group,
              career: career
            }, '_id');

          case 5:
            groupId = _context13.sent;
            groupId = groupId._id.valueOf();
            _context13.next = 9;
            return _Users["default"].findById(req.params.id, 'groups');

          case 9:
            existingGroups = _context13.sent;

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
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function (_x18, _x19) {
    return _ref10.apply(this, arguments);
  };
}());
router.get('/recover', function (req, res) {
  res.send('<body style="background-color: rgb(102, 153, 51)"><h1 style="text-align: center; margin: 20% 0%; color: white; font-size: 50px;">Coming Soon</h1></body>');
});
router.get('/profile', _tokens.verifyController, /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var userId, userData, names, lastName, email, username, password;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            console.log(_cookie["default"].parse(req.cookies.sesionToken));
            userId = (0, _jsonwebtoken.verify)(_cookie["default"].parse(req.cookies.sesionToken).tokenId, process.env.SECRET).id;
            _context14.next = 4;
            return _Users["default"].findById(userId);

          case 4:
            userData = _context14.sent;
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
            return _context14.stop();
        }
      }
    }, _callee14);
  }));

  return function (_x20, _x21) {
    return _ref11.apply(this, arguments);
  };
}());
router.get('/logout', _tokens.logoutController);
var _default = router;
exports["default"] = _default;