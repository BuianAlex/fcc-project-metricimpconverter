/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  var convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    var input = req.query.input;
    if (req.query.input) {
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );
      if (toString.hasOwnProperty('error')) {
        res.status(400).json(toString);
      } else {
        res.json(toString);
      }
    } else {
      res.status(400).json({ error: 'invalid number and unit' });
    }
  });
};
