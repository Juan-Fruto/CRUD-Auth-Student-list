"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGroups = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Group = _interopRequireDefault(require("../models/Group"));

var createGroups = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var cardinality, i, j, letter, _i, _j;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Group["default"].estimatedDocumentCount();

          case 3:
            cardinality = _context.sent;

            if (!(cardinality == 0)) {
              _context.next = 52;
              break;
            }

            i = 1;

          case 6:
            if (!(i <= 9)) {
              _context.next = 27;
              break;
            }

            j = 1;

          case 8:
            if (!(j <= 3)) {
              _context.next = 24;
              break;
            }

            letter = "";
            _context.t0 = j;
            _context.next = _context.t0 === 1 ? 13 : _context.t0 === 2 ? 15 : _context.t0 === 3 ? 17 : 19;
            break;

          case 13:
            letter = "A";
            return _context.abrupt("break", 19);

          case 15:
            letter = "B";
            return _context.abrupt("break", 19);

          case 17:
            letter = "C";
            return _context.abrupt("break", 19);

          case 19:
            _context.next = 21;
            return new _Group["default"]({
              grade: i.toString(),
              group: letter,
              career: 'ICI'
            }).save();

          case 21:
            j++;
            _context.next = 8;
            break;

          case 24:
            i++;
            _context.next = 6;
            break;

          case 27:
            _i = 1;

          case 28:
            if (!(_i <= 9)) {
              _context.next = 49;
              break;
            }

            _j = 1;

          case 30:
            if (!(_j <= 3)) {
              _context.next = 46;
              break;
            }

            letter = "";
            _context.t1 = _j;
            _context.next = _context.t1 === 1 ? 35 : _context.t1 === 2 ? 37 : _context.t1 === 3 ? 39 : 41;
            break;

          case 35:
            letter = "A";
            return _context.abrupt("break", 41);

          case 37:
            letter = "B";
            return _context.abrupt("break", 41);

          case 39:
            letter = "C";
            return _context.abrupt("break", 41);

          case 41:
            _context.next = 43;
            return new _Group["default"]({
              grade: _i.toString(),
              group: letter,
              career: 'IME'
            }).save();

          case 43:
            _j++;
            _context.next = 30;
            break;

          case 46:
            _i++;
            _context.next = 28;
            break;

          case 49:
            console.log('grops created');
            _context.next = 53;
            break;

          case 52:
            return _context.abrupt("return");

          case 53:
            _context.next = 58;
            break;

          case 55:
            _context.prev = 55;
            _context.t2 = _context["catch"](0);
            console.error(_context.t2);

          case 58:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 55]]);
  }));

  return function createGroups() {
    return _ref.apply(this, arguments);
  };
}();

exports.createGroups = createGroups;