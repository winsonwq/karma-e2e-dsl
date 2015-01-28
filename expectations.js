(function(global, $, underscore, undefined) {

    var dslList = [];

    function deferred(fn) {
        return function () {
            var defer = $.Deferred();
            fn && fn.apply(this, [defer].concat([].slice.call(arguments)));
            return defer.promise();
        };
    }

    function expect(future) {
        if(this && this.constructor == expect) {
            dslList.push(deferred(function (defer, arg) {
                defer.resolve(arg, true);
            }));
        } else {
            return new expect(future);
        }
    }

    function not() {
        return deferred(function (defer, actual, positiveOrNegative) {
            defer.resolve(actual, !positiveOrNegative);
        });
    }

    function matcher(matcherName, expected, fn) {
        return deferred(function (defer, actual, positiveOrNegative) {
            defer.resolve(matcherName,
                actual,
                expected,
                positiveOrNegative,
                positiveOrNegative === fn(actual, expected));
        });
    }

    function format(val) {
        if (isString(val)) {
            return "'" + val + "'";
        } else if ($.isArray(val)) {
            var str = '';
            $(val).each(function (idx, item) {
                str += format(item) + ', ';
            });
            str = str.substring(0, str.length - 2);
            return "[" + str + "]";
        }
        return val;
    }

    function formatNot(positiveOrNegative) {
        return positiveOrNegative ? '' : ' not';
    }

    function generateError(matcherName, actual, expected, positiveOrNegative) {
        var error = 'AssertError: ';

        switch(matcherName) {
            case 'toEqual':
                error += "expect " + format(actual) + formatNot(positiveOrNegative) + " to equal " + format(expected);
                break;
            case 'toBe':
                error += "expect " + format(actual) + formatNot(positiveOrNegative) + " to be " + format(expected);
                break;
            case 'toBeDefined':
                error += "expect " + format(actual) + formatNot(positiveOrNegative) + " to be defined."
                break;
            case 'toContain':
                error += "expect " + format(actual) + formatNot(positiveOrNegative) + " to contain " + format(expected);
                break;
            case 'toMatch':
                error += "expect " + format(actual) + formatNot(positiveOrNegative) + " to match " + format(expected);
                break;
            case 'toBeLessThan':
                error += "expect " + format(actual) + formatNot(positiveOrNegative) + " to be less than " + format(expected);
                break;
            case 'toBeGreaterThan':
                error += "expect " + format(actual) + formatNot(positiveOrNegative) + " to be greater than " + format(expected);
                break;
        }
        return error;
    }

    function result() {
        return deferred(
            function (defer,
                      matcherName,
                      actual,
                      expected,
                      positiveOrNegative,
                      result) {

                if (result === false) {
                    throw generateError(matcherName, actual, expected, positiveOrNegative);
                }

                defer.resolve();
            });
    }

    function _deepEqual(actual, expected) {
        if (underscore) return underscore.isEqual(actual, expected);
    }

    function addMatcher(matcherName, expected, fn) {
        dslList.push(matcher(matcherName, expected, fn));
        dslList.push(result());
    }

    function isString(obj) {
        return ({}).toString.call(obj) === '[object String]';
    }

    function isDate(obj) {
        return ({}).toString.call(obj) === '[object Date]';
    }

    function isRegExp(obj) {
        return ({}).toString.call(obj) === '[object RegExp]';
    }

    function isObject(obj) {
        return ({}).toString.call(obj) === '[object Object]';
    }

    function includes(actual, expected) {
        if (isString(actual)) {
            return actual.indexOf(expected) >= 0;
        } else if($.isArray(actual)) {
            return $.inArray(expected, actual) >= 0;
        }
        return false;
    }

    var expectPrototype = {
        constructor: expect,
        toEqual: function (expected) {
            addMatcher('toEqual', expected, _deepEqual);
        },
        toBe: function (expected) {
            addMatcher('toBe', expected, function(actual, expected) { return actual === expected });
        },
        toBeTruthy: function () {
            this.toBe(true);
        },
        toBeFalsy: function () {
            this.toBe(false);
        },
        toBeNull: function () {
            this.toBe(null);
        },
        toBeDefined: function () {
            addMatcher('toBeDefined', undefined, function(actual) { return "undefined" != typeof actual; });
        },
        toContain: function (expected) {
            addMatcher('toContain', expected, function(actual, expected) { return includes(actual, expected); });
        },
        toMatch: function (regex) {
            addMatcher('toMatch', regex, function(actual, expected) { return new RegExp(expected).test(actual); });
        },
        toBeLessThan: function (expected) {
            addMatcher('toBeLessThan', expected, function(actual, expected) { return actual < expected; });
        },
        toBeGreaterThan: function (expected) {
            addMatcher('toBeGreaterThan', expected, function(actual, expected) { return actual > expected; });
        },
        not: function () {
            dslList.push(not());
            return this;
        }
    };

    expect.prototype = expectPrototype;

    global.expectations = expect;

})(this, jQuery, _, undefined);