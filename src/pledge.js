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
        //   if (this._state === 'fulfilled'){
        //     if(this._handlerGroups.length){
        //         this._handlerGroups[this._handlerGroups.length-1].successCb();
        //     }
        //   }

        // if (this._state === 'rejected'){
        //     if(this._handlerGroups.length){
        //         this._handlerGroups[this._handlerGroups.length-1].errorCb();
        //     }
        //   } 
          return;  
        }
        if(obj){
            var that = this;
            this._value = obj;
            if(this._handlerGroups.length) {
                this._handlerGroups.forEach(function(x){
                    x.successCb(that._value);
                });
                that._handlerGroups.pop();
            }
        } else {
            if(this._handlerGroups.length) {
                this._handlerGroups[0].successCb();
                // this._handlerGroups.length-1  
            }
        }
        this._state = 'fulfilled';

    }
    this._internalReject = function(reason){
        if (this._state === 'rejected' || this._state === 'fulfilled') {
            return;
        }
        if(reason){
            var that = this;
            this._value = reason;
            if(this._handlerGroups.length) {
                this._handlerGroups.forEach(function(x){
                    x.errorCb(that._value);
                });
              //this._handlerGroups.pop();  
            }
        } else {
            if(this._handlerGroups.length) {
                this._handlerGroups[0].errorCb();
                // this._handlerGroups.length-1  
            }
        }
        this._state = 'rejected';
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
    handler['successCb'] = suc;
    handler['errorCb'] = err;
    var idx = this._handlerGroups.length;
    this._handlerGroups.push(handler);
    if (this._handlerGroups[idx].successCb && this._state === 'fulfilled') {
        var obj = this._handlerGroups[idx];
        obj.successCb(this._value);
    }

    if (this._handlerGroups[idx].errorCb && this._state === 'rejected') {
        var obj = this._handlerGroups[idx];
        obj.errorCb(this._value);
    }
    //this._internalResolve(this._handlerGroups[idx]);
    //return new $Promise(this._internalResolve[idx]);
}

$Promise.prototype.catch = function(errHandler){
    this.then(null, errHandler);
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
