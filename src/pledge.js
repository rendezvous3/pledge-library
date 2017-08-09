'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function executor(resolve, reject) {
    if(err){
        reject(err);
    } else {
        resolve('WinGARdium leviOHsa.');
    }
}

function $Promise(executor){
    if(typeof executor !== 'function') {
        throw new TypeError(/executor.+function/i);
    }
    this._state = 'pending';
    this._handlerGroups = [];
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
    let resolve = this._internalResolve.bind(this);
    let reject = this._internalReject.bind(this);
    //executor.bind(this);
    executor(resolve, reject);
}

$Promise.prototype.constructor = new Promise(executor);
// $Promise.prototype._internalResolve = function() {

// }

$Promise.prototype.then = function(suc, err){
    typeof suc === 'function' ? suc = suc : suc = false;
    typeof err === 'function' ? err = err : err = false;
    var handler = {};
    // handler.successCb = new $Promise(suc);
    // handler.errorCb = new $Promise(err);
    //suc.bind(this);
    //err.bind(this);
    handler['successCb'] = suc;
    handler['errorCb'] = err;
    var idx = this._handlerGroups.length;
    this._handlerGroups.push(handler);
    if (this._handlerGroups[idx].successCb && this._state === 'fulfilled') {
        var obj = this._handlerGroups[idx];
        //this._internalResolve(obj);
        obj.successCb(this._value);
        //this._state = 'fulfilled';
    }
    this._internalResolve(this._handlerGroups[idx]);
    //this._state = 'resolved';
    //this._handlerGroups[idx].successCb.bind(this);
    //this._handlerGroups[idx].errorCb.bind(this);
    // this._handlerGroups[idx].successCb
    //     .then(function(suc){
    //         return suc;
    //     })
    //return this._handlerGroups[idx].successCb.resolve;
    // var success = this._handlerGroups[idx].successCb;
    // var reject = this._handlerGroups[idx].errorCb;
    // return new Promise(success, reject);
    //return new $Promise(success);
}


/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
