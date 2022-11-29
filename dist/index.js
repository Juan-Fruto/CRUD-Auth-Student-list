"use strict";

var _app = _interopRequireDefault(require("./app"));

require("./conection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// server is listening
_app["default"].listen(_app["default"].get('port'), function () {
  console.log('server on port', _app["default"].get('port'));
});