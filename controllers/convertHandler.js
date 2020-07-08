/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

const { parseInt } = require('lodash');

function ConvertHandler() {
  this.getNum = function (input) {
    let result = false;
    const firstNoNum = /^[a-zA-Z]+/.exec(input);
    const wholeNum = /^(\d+)\s?(\w+)$/.exec(input);
    const decimal = /^(\d*[.]\d)+\s?\w+/.exec(input);
    const fractional = /^(\d*[.]?\d+)[\/](\d)+\s?(\w+)/.exec(input);
    if (firstNoNum) {
      result = 1;
    }
    if (wholeNum) {
      result = parseFloat(wholeNum[1]);
    }
    if (decimal) {
      result = parseFloat(decimal[1]);
    }
    if (fractional) {
      result = fractional[1] / fractional[2];
    }
    return result;
  };

  this.getUnit = function (input) {
    let result;
    const namesUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const unit = /([a-zA-Z]+)/.exec(input)[1].toLowerCase();
    if (unit && namesUnits.indexOf(unit) > -1) {
      result = unit;
    } else {
      result = false;
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    const measure = {
      gal: 'l',
      l: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs',
    };
    const result = measure[initUnit];
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    const measure = /([a-zA-Z]+)$/.exec(unit);
    if (measure) {
      result = measure[0].toLowerCase();
    } else {
      result = false;
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal':
        result = +(initNum * galToL).toFixed(5);
        break;
      case 'lbs':
        result = +(initNum * lbsToKg).toFixed(5);
        break;
      case 'mi':
        result = +(initNum * miToKm).toFixed(5);
        break;
      case 'l':
        result = +(initNum / galToL).toFixed(5);
        break;
      case 'km':
        result = +(initNum / miToKm).toFixed(5);
        break;
      case 'kg':
        result = +(initNum / lbsToKg).toFixed(5);
        break;

      default:
        break;
    }
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    if (!initNum && !initUnit) {
      result = { error: 'invalid number and unit' };
    } else if (!initNum) {
      result = { error: 'invalid number' };
    } else if (!initUnit) {
      result = { error: 'invalid unit' };
    } else {
      result = {
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`,
      };
    }

    return result;
  };
}

module.exports = ConvertHandler;
