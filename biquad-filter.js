!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.BiquadFilter=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var BiquadFilter = function BiquadFilter() {
  this.coefficients = [];
  this.memories = [];
  this.numberOfCascade = 1;
  this.context = undefined;
  this.resetMemories();
  return this;
};
($traceurRuntime.createClass)(BiquadFilter, {
  setCoefficients: function(coef) {
    if (coef) {
      this.numberOfCascade = this.getNumberOfCascadeFilters(coef);
      this.coefficients = [];
      this.coefficients.g = coef[0];
      for (var i = 0; i < this.numberOfCascade; i = i + 1) {
        this.coefficients[i] = {};
        this.coefficients[i].b1 = coef[1 + i * 4];
        this.coefficients[i].b2 = coef[2 + i * 4];
        this.coefficients[i].a1 = coef[3 + i * 4];
        this.coefficients[i].a2 = coef[4 + i * 4];
      }
      this.resetMemories();
      return true;
    } else {
      console.error("No coefficients are set");
      return false;
    }
  },
  getNumberOfCascadeFilters: function(coef) {
    var numberOfCascade = (coef.length - 1) / 4;
    return numberOfCascade;
  },
  resetMemories: function() {
    this.memories = [];
    this.memories[0] = {};
    this.memories[0].xi1 = 0;
    this.memories[0].xi2 = 0;
    this.memories[0].yi1 = 0;
    this.memories[0].yi2 = 0;
    for (var i = 1; i < this.numberOfCascade; i = i + 1) {
      this.memories[i] = {};
      this.memories[i].yi1 = 0;
      this.memories[i].yi2 = 0;
    }
  },
  process: function(inputBuffer, outputBuffer) {
    var x;
    var y = [];
    var b1,
        b2,
        a1,
        a2;
    var xi1,
        xi2,
        yi1,
        yi2,
        y1i1,
        y1i2;
    for (var i = 0; i < inputBuffer.length; i = i + 1) {
      x = inputBuffer[i];
      b1 = this.coefficients[0].b1;
      b2 = this.coefficients[0].b2;
      a1 = this.coefficients[0].a1;
      a2 = this.coefficients[0].a2;
      xi1 = this.memories[0].xi1;
      xi2 = this.memories[0].xi2;
      yi1 = this.memories[0].yi1;
      yi2 = this.memories[0].yi2;
      y[0] = x + b1 * xi1 + b2 * xi2 - a1 * yi1 - a2 * yi2;
      for (var e = 1; e < this.numberOfCascade; e = e + 1) {
        b1 = this.coefficients[e].b1;
        b2 = this.coefficients[e].b2;
        a1 = this.coefficients[e].a1;
        a2 = this.coefficients[e].a2;
        y1i1 = this.memories[e - 1].yi1;
        y1i2 = this.memories[e - 1].yi2;
        yi1 = this.memories[e].yi1;
        yi2 = this.memories[e].yi2;
        y[e] = y[e - 1] + b1 * y1i1 + b2 * y1i2 - a1 * yi1 - a2 * yi2;
      }
      outputBuffer[i] = y[this.numberOfCascade - 1] * this.coefficients.g;
      this.memories[0].xi2 = this.memories[0].xi1;
      this.memories[0].xi1 = x;
      for (var p = 0; p < this.numberOfCascade; p = p + 1) {
        this.memories[p].yi2 = this.memories[p].yi1;
        this.memories[p].yi1 = y[p];
      }
    }
  }
}, {});
;
module.exports = BiquadFilter;


//# sourceURL=/Users/goldszmidt/sam/pro/dev/biquad-filter/biquad-filter.es6.js
},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9nb2xkc3ptaWR0L3NhbS9wcm8vZGV2L2JpcXVhZC1maWx0ZXIvYmlxdWFkLWZpbHRlci5lczYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNnQkc7QUFoQkgsQUFBSSxFQUFBLGVBZ0JELFNBQU0sYUFBVyxDQUVMLEFBQUMsQ0FBQztBQUNYLEtBQUcsYUFBYSxFQUFJLEdBQUMsQ0FBQztBQUN0QixLQUFHLFNBQVMsRUFBSSxHQUFDLENBQUM7QUFDbEIsS0FBRyxnQkFBZ0IsRUFBSSxFQUFBLENBQUM7QUFDeEIsS0FBRyxRQUFRLEVBQUksVUFBUSxDQUFDO0FBQ3hCLEtBQUcsY0FBYyxBQUFDLEVBQUMsQ0FBQztBQUNwQixPQUFPLEtBQUcsQ0FBQztBQUNiLEFBekJvQyxDQUFBO0FBQXhDLEFBQUMsZUFBYyxZQUFZLENBQUMsQUFBQztBQWdDeEIsZ0JBQWMsQ0FBZCxVQUFnQixJQUFHLENBQUc7QUFDckIsT0FBSSxJQUFHLENBQUc7QUFFTixTQUFHLGdCQUFnQixFQUFJLENBQUEsSUFBRywwQkFBMEIsQUFBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO0FBRTNELFNBQUcsYUFBYSxFQUFJLEdBQUMsQ0FBQztBQUV0QixTQUFHLGFBQWEsRUFBRSxFQUFJLENBQUEsSUFBRyxDQUFFLENBQUEsQ0FBQyxDQUFDO0FBQzdCLFVBQVEsR0FBQSxDQUFBLENBQUEsRUFBSSxFQUFBLENBQUcsQ0FBQSxDQUFBLEVBQUksQ0FBQSxJQUFHLGdCQUFnQixDQUFJLENBQUEsQ0FBQSxFQUFJLENBQUEsQ0FBQSxFQUFJLEVBQUEsQ0FBRTtBQUNsRCxXQUFHLGFBQWEsQ0FBRSxDQUFBLENBQUMsRUFBSSxHQUFDLENBQUM7QUFFekIsV0FBRyxhQUFhLENBQUUsQ0FBQSxDQUFDLEdBQUcs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QUFLLFFBQVEsRUFBSSxhQUFXLENBQUM7QUFDN0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IEJpcXVhZCBGaWx0ZXIgbGlicmFyeVxuICogQGF1dGhvciBBcm5hdS5KdWxpYUBnbWFpbC5jb21cbiAqIEB2ZXJzaW9uIDAuMS4wXG4gKi9cblxuXG4vKipcbiAqIEZ1bmN0aW9uIGludm9jYXRpb24gcGF0dGVybiBmb3Igb2JqZWN0IGNyZWF0aW9uLlxuICogQHB1YmxpY1xuICovXG5cbiAgLyoqXG4gICAqIEVDTUFTY3JpcHQ1IHByb3BlcnR5IGRlc2NyaXB0b3JzIG9iamVjdC5cbiAgICovXG5cbiAgIGNsYXNzIEJpcXVhZEZpbHRlciAge1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgIHRoaXMuY29lZmZpY2llbnRzID0gW107XG4gICAgICB0aGlzLm1lbW9yaWVzID0gW107XG4gICAgICB0aGlzLm51bWJlck9mQ2FzY2FkZSA9IDE7XG4gICAgICB0aGlzLmNvbnRleHQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnJlc2V0TWVtb3JpZXMoKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBiaXF1YWQgZmlsdGVyIGNvZWZmaWNpZW50c1xuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcGFyYW0gY29lZiBBcnJheSBvZiBiaXF1YWQgY29lZmZpY2llbnRzIGluIHRoZSBmb2xsb3dpbmcgb3JkZXI6IGdhaW4sIGZpcnN0QmlxdWFkIGIxLCBmaXJzdEJpcXVhZCBiMiwgZmlyc3RCaXF1YWQgYTEsIGZpcnN0QmlxdWFkIGEyLCBzZWNvbmRCaXF1YWQgYjEsIHNlY29uZEJJcXVhZCBiMiwgZXRjLlxuICAgICAqL1xuICAgICBzZXRDb2VmZmljaWVudHMoY29lZikge1xuICAgICAgaWYgKGNvZWYpIHtcbiAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBub3QgYSBudW1iZXIgb2YgYmlxdWFkcywgd2UgY29uc2lkZXIgdGhhdCB0aGVyZSBpcyBvbmx5IDEgYmlxdWFkLlxuICAgICAgICAgIHRoaXMubnVtYmVyT2ZDYXNjYWRlID0gdGhpcy5nZXROdW1iZXJPZkNhc2NhZGVGaWx0ZXJzKGNvZWYpO1xuICAgICAgICAgIC8vIFJlc2V0IGNvZWZmaWNpZW50c1xuICAgICAgICAgIHRoaXMuY29lZmZpY2llbnRzID0gW107XG4gICAgICAgICAgLy8gR2xvYmFsIGdhaW5cbiAgICAgICAgICB0aGlzLmNvZWZmaWNpZW50cy5nID0gY29lZlswXTtcbiAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5udW1iZXJPZkNhc2NhZGUgOyBpID0gaSArIDEpe1xuICAgICAgICAgICAgdGhpcy5jb2VmZmljaWVudHNbaV0gPSB7fTtcbiAgICAgICAgICAgIC8vIEZvdXIgY29lZmZpY2llbnRzIGZvciBlYWNoIGJpcXVhZFxuICAgICAgICAgICAgdGhpcy5jb2VmZmljaWVudHNbaV0uYjEgPSBjb2VmWzEgKyBpKjRdO1xuICAgICAgICAgICAgdGhpcy5jb2VmZmljaWVudHNbaV0uYjIgPSBjb2VmWzIgKyBpKjRdO1xuICAgICAgICAgICAgdGhpcy5jb2VmZmljaWVudHNbaV0uYTEgPSBjb2VmWzMgKyBpKjRdO1xuICAgICAgICAgICAgdGhpcy5jb2VmZmljaWVudHNbaV0uYTIgPSBjb2VmWzQgKyBpKjRdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBOZWVkIHRvIHJlc2V0IHRoZSBtZW1vcmllcyBhZnRlciBjaGFuZ2UgdGhlIGNvZWZmaWNpZW50c1xuICAgICAgICAgIHRoaXMucmVzZXRNZW1vcmllcygpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBjb2VmZmljaWVudHMgYXJlIHNldFwiKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBudW1iZXIgb2YgY2FzY2FkZSBmaWx0ZXJzIGZyb20gdGhlIGxpc3Qgb2YgY29lZmZpY2llbnRzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICAgZ2V0TnVtYmVyT2ZDYXNjYWRlRmlsdGVycyhjb2VmKSB7XG4gICAgICB2YXIgbnVtYmVyT2ZDYXNjYWRlID0gKGNvZWYubGVuZ3RoIC0gMSkvNDtcbiAgICAgIHJldHVybiBudW1iZXJPZkNhc2NhZGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXQgbWVtb3JpZXMgb2YgYmlxdWFkIGZpbHRlcnMuXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgICByZXNldE1lbW9yaWVzKCkge1xuICAgICAgdGhpcy5tZW1vcmllcyA9IFtdO1xuICAgICAgdGhpcy5tZW1vcmllc1swXSA9IHt9O1xuICAgICAgdGhpcy5tZW1vcmllc1swXS54aTEgPSAwO1xuICAgICAgdGhpcy5tZW1vcmllc1swXS54aTIgPSAwO1xuICAgICAgdGhpcy5tZW1vcmllc1swXS55aTEgPSAwO1xuICAgICAgdGhpcy5tZW1vcmllc1swXS55aTIgPSAwO1xuXG4gICAgICBmb3IodmFyIGkgPSAxOyBpIDwgdGhpcy5udW1iZXJPZkNhc2NhZGU7IGkgPSBpICsxKXtcbiAgICAgICAgdGhpcy5tZW1vcmllc1tpXSA9IHt9O1xuICAgICAgICB0aGlzLm1lbW9yaWVzW2ldLnlpMSA9IDA7XG4gICAgICAgIHRoaXMubWVtb3JpZXNbaV0ueWkyID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGUgdGhlIG91dHB1dCBvZiB0aGUgY2FzY2FkZSBvZiBiaXF1YWQgZmlsdGVycyBmb3IgYW4gaW5wdXRCdWZmZXIuXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBwYXJhbSBpbnB1dEJ1ZmZlciBBcnJheSBvZiB0aGUgc2FtZSBsZW5ndGggb2Ygb3V0cHV0QnVmZmVyXG4gICAgICogQHBhcmFtIG91dHB1dEJ1ZmZlciBBcnJheSBvZiB0aGUgc2FtZSBsZW5ndGggb2YgaW5wdXRCdWZmZXJcbiAgICAgKi9cbiAgICAgcHJvY2VzcyhpbnB1dEJ1ZmZlciwgb3V0cHV0QnVmZmVyKSB7XG4gICAgICB2YXIgeDtcbiAgICAgIHZhciB5ID0gW11cbiAgICAgIHZhciBiMSwgYjIsIGExLCBhMjtcbiAgICAgIHZhciB4aTEsIHhpMiwgeWkxLCB5aTIsIHkxaTEsIHkxaTI7XG5cbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpbnB1dEJ1ZmZlci5sZW5ndGg7IGkgPSBpKzEpIHtcbiAgICAgICAgeCA9IGlucHV0QnVmZmVyW2ldO1xuICAgICAgICAgIC8vIFNhdmUgY29lZmZpY2llbnRzIGluIGxvY2FsIHZhcmlhYmxlc1xuICAgICAgICAgIGIxID0gdGhpcy5jb2VmZmljaWVudHNbMF0uYjE7XG4gICAgICAgICAgYjIgPSB0aGlzLmNvZWZmaWNpZW50c1swXS5iMjtcbiAgICAgICAgICBhMSA9IHRoaXMuY29lZmZpY2llbnRzWzBdLmExO1xuICAgICAgICAgIGEyID0gdGhpcy5jb2VmZmljaWVudHNbMF0uYTI7XG4gICAgICAgICAgLy8gU2F2ZSBtZW1vcmllcyBpbiBsb2NhbCB2YXJpYWJsZXNcbiAgICAgICAgICB4aTEgPSB0aGlzLm1lbW9yaWVzWzBdLnhpMTtcbiAgICAgICAgICB4aTIgPSB0aGlzLm1lbW9yaWVzWzBdLnhpMjtcbiAgICAgICAgICB5aTEgPSB0aGlzLm1lbW9yaWVzWzBdLnlpMTtcbiAgICAgICAgICB5aTIgPSB0aGlzLm1lbW9yaWVzWzBdLnlpMjtcblxuICAgICAgICAgIC8vIEZvcm11bGE6IHlbbl0gPSB4W25dICsgYjEqeFtuLTFdICsgYjIqeFtuLTJdIC0gYTEqeVtuLTFdIC0gYTIqeVtuLTJdXG4gICAgICAgICAgLy8gRmlyc3QgYmlxdWFkXG4gICAgICAgICAgeVswXSA9IHggKyBiMSAqIHhpMSArIGIyICogeGkyIC0gYTEgKiB5aTEgLSBhMiAqIHlpMjtcblxuICAgICAgICAgIGZvcih2YXIgZSA9IDE7IGUgPCB0aGlzLm51bWJlck9mQ2FzY2FkZTsgZSA9IGUgKyAxKSB7XG4gICAgICAgICAgICAvLyBTYXZlIGNvZWZmaWNpZW50cyBpbiBsb2NhbCB2YXJpYWJsZXNcbiAgICAgICAgICAgIGIxID0gdGhpcy5jb2VmZmljaWVudHNbZV0uYjE7XG4gICAgICAgICAgICBiMiA9IHRoaXMuY29lZmZpY2llbnRzW2VdLmIyO1xuICAgICAgICAgICAgYTEgPSB0aGlzLmNvZWZmaWNpZW50c1tlXS5hMTtcbiAgICAgICAgICAgIGEyID0gdGhpcy5jb2VmZmljaWVudHNbZV0uYTI7XG4gICAgICAgICAgICAvLyBTYXZlIG1lbW9yaWVzIGluIGxvY2FsIHZhcmlhYmxlc1xuICAgICAgICAgICAgeTFpMSA9IHRoaXMubWVtb3JpZXNbZSAtIDFdLnlpMTtcbiAgICAgICAgICAgIHkxaTIgPSB0aGlzLm1lbW9yaWVzW2UgLSAxXS55aTI7XG4gICAgICAgICAgICB5aTEgPSB0aGlzLm1lbW9yaWVzW2VdLnlpMTtcbiAgICAgICAgICAgIHlpMiA9IHRoaXMubWVtb3JpZXNbZV0ueWkyO1xuXG4gICAgICAgICAgICB5W2VdID0geVtlIC0gMV0gKyBiMSAqIHkxaTEgKyBiMiAqIHkxaTIgLSBhMSAqIHlpMSAtIGEyICogeWkyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFdyaXRlIHRoZSBvdXRwdXRcbiAgICAgICAgICBvdXRwdXRCdWZmZXJbaV0gPSB5W3RoaXMubnVtYmVyT2ZDYXNjYWRlIC0gMV0gKiB0aGlzLmNvZWZmaWNpZW50cy5nO1xuXG4gICAgICAgICAgLy8gVXBkYXRlIHRoZSBtZW1vcmllc1xuICAgICAgICAgIHRoaXMubWVtb3JpZXNbMF0ueGkyID0gdGhpcy5tZW1vcmllc1swXS54aTE7XG4gICAgICAgICAgdGhpcy5tZW1vcmllc1swXS54aTEgPSB4O1xuXG4gICAgICAgICAgZm9yKHZhciBwID0gMDsgcCA8IHRoaXMubnVtYmVyT2ZDYXNjYWRlOyBwID0gcCArMSl7XG4gICAgICAgICAgICB0aGlzLm1lbW9yaWVzW3BdLnlpMiA9IHRoaXMubWVtb3JpZXNbcF0ueWkxO1xuICAgICAgICAgICAgdGhpcy5tZW1vcmllc1twXS55aTEgPSB5W3BdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfTtcblxuXG4vLyAvLyBDb21tb25KUyBmdW5jdGlvbiBleHBvcnRcbm1vZHVsZS5leHBvcnRzID0gQmlxdWFkRmlsdGVyO1xuIl19
