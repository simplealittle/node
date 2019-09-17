/*  promis states [promiss/A+ 2.1]  */
        var STATE_PENDING = 0;
        /*  [promiss/A+ 2.1.1]  */
        var STATE_FULFILLED = 1;
        /*  [promiss/A+ 2.1.2]  */
        var STATE_REJECTED = 2;
        /*  [promiss/A+ 2.1.3]  */
        /*  promis object constructor  */
        var promis = function(executor) {
            /*  optionally support non-constructor/plain-function call  */
            if (!(this instanceof promis)) return new promis(executor);
            /*  initialize object  */
            this.id = "Thenable/1.0.7";
            this.state = STATE_PENDING;
            /*  initial state  */
            this.fulfillValue = undefined;
            /*  initial value  */
            /*  [promiss/A+ 1.3, 2.1.2.2]  */
            this.rejectReason = undefined;
            /*  initial reason */
            /*  [promiss/A+ 1.5, 2.1.3.2]  */
            this.onFulfilled = [];
            /*  initial handlers  */
            this.onRejected = [];
            /*  initial handlers  */
            /*  support optional executor function  */
            if (typeof executor === "function") executor.call(this, this.fulfill.bind(this), this.reject.bind(this));
        };
        /*  promis API methods  */
        promis.prototype = {
            /*  promis resolving methods  */
            fulfill: function(value) {
                return deliver(this, STATE_FULFILLED, "fulfillValue", value);
            },
            reject: function(value) {
                return deliver(this, STATE_REJECTED, "rejectReason", value);
            },
            /*  'The then Method' [promiss/A+ 1.1, 1.2, 2.2]  */
            then: function(onFulfilled, onRejected) {
                var curr = this;
                var next = new promis();
                /*  [promiss/A+ 2.2.7]  */
                curr.onFulfilled.push(resolver(onFulfilled, next, "fulfill"));
                /*  [promiss/A+ 2.2.2/2.2.6]  */
                curr.onRejected.push(resolver(onRejected, next, "reject"));
                /*  [promiss/A+ 2.2.3/2.2.6]  */
                execute(curr);
                return next;
            }
        };
        promis.all = function(arr) {
            return new promis(function(resolve, reject) {
                var len = arr.length, i = 0, res = 0, results = [];
                if (len === 0) {
                    resolve(results);
                }
                while (i < len) {
                    arr[i].then(function(result) {
                        results.push(result);
                        if (++res === len) {
                            resolve(results);
                        }
                    }, function(val) {
                        reject(val);
                    });
                    i++;
                }
            });
        };
        /*  deliver an action  */
        var deliver = function(curr, state, name, value) {
            if (curr.state === STATE_PENDING) {
                curr.state = state;
                /*  [promiss/A+ 2.1.2.1, 2.1.3.1]  */
                curr[name] = value;
                /*  [promiss/A+ 2.1.2.2, 2.1.3.2]  */
                execute(curr);
            }
            return curr;
        };
        /*  execute all handlers  */
        var execute = function(curr) {
            if (curr.state === STATE_FULFILLED) execute_handlers(curr, "onFulfilled", curr.fulfillValue); else if (curr.state === STATE_REJECTED) execute_handlers(curr, "onRejected", curr.rejectReason);
        };
        /*  execute particular set of handlers  */
        var execute_handlers = function(curr, name, value) {
            /* global process: true */
            /* global setImmediate: true */
            /* global setTimeout: true */
            /*  short-circuit processing  */
            if (curr[name].length === 0) return;
            /*  iterate over all handlers, exactly once  */
            var handlers = curr[name];
            curr[name] = [];
            /*  [promiss/A+ 2.2.2.3, 2.2.3.3]  */
            var func = function() {
                for (var i = 0; i < handlers.length; i++) handlers[i](value);
            };
            /*  execute procedure asynchronously  */
            /*  [promiss/A+ 2.2.4, 3.1]  */
            if (typeof process === "object" && typeof process.nextTick === "function") process.nextTick(func); else if (typeof setImmediate === "function") setImmediate(func); else setTimeout(func, 0);
        };
        /*  generate a resolver function */
        var resolver = function(cb, next, method) {
            return function(value) {
                if (typeof cb !== "function") /*  [promiss/A+ 2.2.1, 2.2.7.3, 2.2.7.4]  */
                next[method].call(next, value); else {
                    var result;
                    try {
                        if (value instanceof promis) {
                            result = value.then(cb);
                        } else result = cb(value);
                    } /*  [promiss/A+ 2.2.2.1, 2.2.3.1, 2.2.5, 3.2]  */
                    catch (e) {
                        next.reject(e);
                        /*  [promiss/A+ 2.2.7.2]  */
                        return;
                    }
                    resolve(next, result);
                }
            };
        };
        /*  'promis Resolution Procedure'  */
        /*  [promiss/A+ 2.3]  */
        var resolve = function(promis, x) {
            /*  sanity check arguments  */
            /*  [promiss/A+ 2.3.1]  */
            if (promis === x) {
                promis.reject(new TypeError("cannot resolve promis with itself"));
                return;
            }
            /*  surgically check for a 'then' method
            (mainly to just call the 'getter' of 'then' only once)  */
            var then;
            if (typeof x === "object" && x !== null || typeof x === "function") {
                try {
                    then = x.then;
                } /*  [promiss/A+ 2.3.3.1, 3.5]  */
                catch (e) {
                    promis.reject(e);
                    /*  [promiss/A+ 2.3.3.2]  */
                    return;
                }
            }
            /*  handle own Thenables    [promiss/A+ 2.3.2]
            and similar 'thenables' [promiss/A+ 2.3.3]  */
            if (typeof then === "function") {
                var resolved = false;
                try {
                    /*  call retrieved 'then' method */
                    /*  [promiss/A+ 2.3.3.3]  */
                    then.call(x, /*  resolvepromis  */
                    /*  [promiss/A+ 2.3.3.3.1]  */
                    function(y) {
                        if (resolved) return;
                        resolved = true;
                        /*  [promiss/A+ 2.3.3.3.3]  */
                        if (y === x) /*  [promiss/A+ 3.6]  */
                        promis.reject(new TypeError("circular thenable chain")); else resolve(promis, y);
                    }, /*  rejectpromis  */
                    /*  [promiss/A+ 2.3.3.3.2]  */
                    function(r) {
                        if (resolved) return;
                        resolved = true;
                        /*  [promiss/A+ 2.3.3.3.3]  */
                        promis.reject(r);
                    });
                } catch (e) {
                    if (!resolved) /*  [promiss/A+ 2.3.3.3.3]  */
                    promis.reject(e);
                }
                return;
            }
            /*  handle other values  */
            promis.fulfill(x);
        };
        promis.resolve = function(value) {
            return new promis(function(resolve) {
                resolve(value);
            });
        };
        promis.reject = function(reason) {
            return new promis(function(resolve, reject) {
                reject(reason);
            });
        };