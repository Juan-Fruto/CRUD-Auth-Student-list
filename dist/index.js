"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

require("./conection");

// server is listening
_app["default"].listen(_app["default"].get('port'), function () {
  console.log('server on port', _app["default"].get('port'));
});