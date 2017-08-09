'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function $Promise(executor){
    if(typeof executor !== 'function') {
        throw new TypeError(/executor.+function/i);
    }
    this._state = 'pending';
    //this.constructor = new Promise(executor);
    this._internalResolve = function(obj){
        if (this._state === 'fulfilled' || this._state === 'rejected'){
          return;  
        }
        this._value = obj;
        this._state = 'fulfilled';

    }
    this._internalReject = function(reason){
        if (this._state === 'rejected' || this._state === 'fulfilled') {
            return;
        }
        this._state = 'rejected';
        this._value = reason;
    }
}

$Promise.prototype.constructor = new Promise(executor);
// $Promise.prototype._internalResolve = function() {

// }


/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
