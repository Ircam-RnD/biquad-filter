var chai = require('chai');
var assert = chai.assert;
var BiquadFilter = require('../biquad-filter.es6.js')

describe("BiquadFilter tests", function() {
    var bf = new BiquadFilter()
    it('should get the right number of cascadeFilters', function(){
        var inputCoef = [2, 1, 1, 1, 1, 1, 1, 1, 1];
        var nb = bf.getNumberOfCascadeFilters(inputCoef);
        assert.equal(nb, 2);
    })
    it('should set coefficient properly', function(){
        var inputCoef = [2, 1, 2, 3, 4, 5, 6, 7, 8];
        bf.setCoefficients(inputCoef);
        console.log(bf.coefficients);
        var coefs = [{a1:3, a2:4, b1:1, b2:2}, {a1:7, a2:8, b1:5, b2:6}];
        coefs.g = 2;
        console.log(bf.coefficients[0], coefs[0])
        assert.deepEqual(bf.coefficients[0], coefs[0]);
        assert.deepEqual(bf.coefficients[1], coefs[1]);
        assert.equal(inputCoef[0], coefs.g)
    })
});
