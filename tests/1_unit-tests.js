/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  suite('Function convertHandler.getNum(input)', function () {
    test('Whole number input', function (done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });
    test('Decimal Input', function (done) {
      var input = '3.2L';
      assert.equal(convertHandler.getNum(input), 3.2);
      done();
    });
    test('Fractional Input', function (done) {
      var input = '1/2l';
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });
    test('Fractional Input w/ Decimal', function (done) {
      var input = '.1/2l';
      assert.equal(convertHandler.getNum(input), 0.05);
      done();
    });
    test('Invalid Input (double fraction)', function (done) {
      var input = '1/.1/2l';
      assert.equal(convertHandler.getNum(input), false);
      done();
    });
    test('No Numerical Input', function (done) {
      var input = 'L';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
    test('No Numerical Input', function (done) {
      var input;
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });
  suite('Function convertHandler.getUnit(input)', function () {
    test('For Each Valid Unit Inputs', function (done) {
      var input = [
        'gal',
        'l',
        'mi',
        'km',
        'lbs',
        'kg',
        'GAL',
        'L',
        'MI',
        'KM',
        'LBS',
        'KG',
      ];
      input.forEach(function (ele) {
        assert.isOk(convertHandler.getUnit(ele));
      });
      done();
    });
    test('Unknown Unit Input', function (done) {
      assert.isNotOk(convertHandler.getUnit('ele'));
      done();
    });
  });
  suite('Function convertHandler.getReturnUnit(initUnit)', function () {
    test('For Each Valid Unit Inputs', function (done) {
      var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      var expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });
  suite('Function convertHandler.spellOutUnit(unit)', function () {
    test('For Each Valid Unit Inputs', function (done) {
      const input = ['10gal', '12    l', '2 f mi', '35/2 km', '3.5'];
      const expect = ['gal', 'l', 'mi', 'km', false, 'lbs'];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });
  suite('Function convertHandler.convert(num, unit)', function () {
    test('Gal to L', function (done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });
    test('L to Gal', function (done) {
      const input = [1, 'l'];
      const expected = 0.26417;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });
    test('Mi to Km', function (done) {
      const input = [1, 'mi'];
      const expected = 1.60934;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });
    test('Km to Mi', function (done) {
      const input = [3, 'km'];
      const expected = 1.86412;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });
    test('Lbs to Kg', function (done) {
      const input = [5, 'lbs'];
      const expected = 2.26796;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });
    test('Kg to Lbs', function (done) {
      const input = [2, 'kg'];
      const expected = 4.40925;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
      //done();
    });
  });
  suite(
    'Function convertHandler.getString(initNum, initUnit, returnNum, returnUnit)',
    function () {
      test('For Each Valid Unit Inputs', function (done) {
        const input = [
          [4, 'l', 56, 'gal'],
          [false, false, 56, 'gal'],
          [false, 'l', 56, 'gal'],
          [2, false, 56, 'gal'],
        ];
        const expect = ['gal', 'l', 'f', 'km', false, 'lbs'];
        input.forEach(function (ele, i) {
          convertHandler.getString(...ele);
          // assert.equal(convertHandler.getString(ele), expect[i]);
        });
        done();
      });
    }
  );
});
