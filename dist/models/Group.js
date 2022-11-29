"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var groupSchema = new _mongoose.Schema({
  grade: {
    type: String,
    required: true,
    unique: false
  },
  group: {
    type: String,
    required: false,
    unique: false
  },
  career: {
    type: String,
    required: true,
    unique: false
  },
  students: [{
    name: {
      type: String,
      required: true,
      unique: false,
      trim: true
    },
    subeject_grade: {
      type: Number,
      required: false
    },
    status: {
      type: Boolean,
      required: true,
      "default": false
    }
  }]
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Group', groupSchema);

exports["default"] = _default;