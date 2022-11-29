"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

//esquema grado, el primer atributo es grado y grupo y el segundo es un array con los estudiantes
var studentsSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  grade: {
    type: Number,
    required: false
  },
  status: {
    type: Boolean,
    required: true,
    "default": false
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Stdn', studentsSchema);

exports["default"] = _default;