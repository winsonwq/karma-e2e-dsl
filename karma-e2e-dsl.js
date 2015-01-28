(function (global, $, underscore, expectations, undefined) {
    'use strict';

    document.write('<iframe id="context" width="100%" height="500px" src="about:blank"></iframe>');

    var ifr = $('#context');
    var dslList = [];
    var delayCount = 0;

    function deferred(fn) {
        return function () {
            var defer = $.Deferred();
            fn && fn.apply(this, [defer].concat([].slice.call(arguments)));
            return defer.promise();
        };
    }

    function run(arr, idx) {
        var defer = $.Deferred();
        var i = idx || 0;
        var task = arr[i];
        var args = [].slice.call(arguments, 2);

        if (task) {
            task.apply(task, args).then(function () {
                var args = [].slice.call(arguments);
                run.apply(this, [arr, ++i].concat(args));
            });
        } else {
            defer.resolve();
        }

        return defer.promise();
    }

    function basename(path) {
        var arr = path.split('/');
        return arr[arr.length - 1];
    }

    function dirname(path) {
        var name = basename(path);
        return path.substring(0, path.length - name.length);
    }

    function resolve() {
        var resolvedPath = '',
            resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            var path = (i >= 0) ? arguments[i] : '/';
            // Skip empty and invalid entries
            if (typeof path !== 'string' || !path) {
                continue;
            }
            resolvedPath = path + '/' + resolvedPath;
            resolvedAbsolute = path.charAt(0) === '/';
        }

        resolvedPath = resolvedPath.replace(/\/\//g, '/');
        if (resolvedPath.charAt(resolvedPath.length - 1) === '/') {
            resolvedPath = resolvedPath.substring(0, resolvedPath.length - 1);
        }

        return resolvedPath;
    }

    function doneBlock(done) {
        return function () {
            var defer = $.Deferred();
            defer.then(done);
            defer.resolve();
            return defer.promise();
        };
    }

    function refreshDoneBlock(dsls, done) {
        if (typeof(done) !== 'undefined') {
            if (dsls.loadedDone) {
                dsls.pop();
            }
            dsls.push(doneBlock(done));
            dsls.loadedDone = true;
        }
        return dsls;
    }

    function dsl(loadCases) {
        return function (done) {
            dslList = [];
            loadCases();
            refreshDoneBlock(dslList, done);
            if (delayCount == 0) {
                run(dslList);
            }
        };
    }

    function doc() {
        return $(ifr.prop('contentDocument'));
    }

    function win() {
        return $(ifr.prop('contentWindow'));
    }

    function navigateTo(path) {
        return deferred(function (defer) {
            ifr.one('load', function () {
                defer.resolve();
            });
            ifr.attr('src', path);
        });
    }

    function reload() {
        return deferred(function (defer) {
            ifr.one('load', function () {
                defer.resolve();
            });
            win().prop('location').reload();
        });
    }

    function locationProp(propName, handler) {
        return deferred(function (defer) {
            defer.done(handler);
            defer.resolve(win().prop('location')[propName]);
        });
    }

    function delay(callback, duration) {
        delayCount++;
        setTimeout(function () {
            var d = dslList.pop();
            callback();
            dslList.push(d);
            if (--delayCount == 0) {
                run(dslList);
            }
        }, duration);
    }

    function sleep(duration) {
        return deferred(function (defer) {
            var args = argsPassingThrough(arguments);
            setTimeout(function () {
                defer.resolve.apply(defer, args);
            }, duration);
        });
    }

    function argsPassingThrough(_arguments) {
        return [].slice.call(_arguments, 1);
    }

    function waitForPageLoad() {
        return deferred(function (defer) {
            var args = argsPassingThrough(arguments);
            ifr.one('load', function () {
                defer.resolve.apply(defer, args);
            });
        });
    }

    var pauseDefer = null;
    var browser = {
        navigateTo: function (path) {
            dslList.push(navigateTo(path));
        },
        reload: function () {
            dslList.push(reload());
        },
        delay: function (callback, duration) {
            delay(callback, duration);
        },
        sleep: function (duration) {
            dslList.push(sleep(duration));
        },
        pause: function () {
            dslList.push(function () {
                pauseDefer = $.Deferred();
                return pauseDefer.promise();
            });
        },
        resume: function () {
            pauseDefer.resolve();
            pauseDefer = null;
        },
        waitForPageLoad: function () {
            dslList.push(waitForPageLoad());
        },
        window: {
            path: function (pathHandler) {
                dslList.push(locationProp('pathname', pathHandler));
            },
            href: function (hrefHandler) {
                dslList.push(locationProp('href', hrefHandler));
            },
            hash: function (hashHandler) {
                dslList.push(locationProp('hash', hashHandler));
            },
            search: function (searchHandler) {
                dslList.push(locationProp('search', searchHandler));
            }
        }
    };

    function findElement(selector) {
        return function () {
            var defer = $.Deferred();
            defer.resolve(doc().find(selector));
            return defer.promise();
        };
    }

    function element(selector) {
        if (this && this.constructor == element) {
            dslList.push(findElement(selector));
        } else {
            return new element(selector);
        }
    }

    function construct(setValueHandler, getValueHandler, valueOrHandler) {
        return function ($elem) {
            var defer = $.Deferred();
            var type = typeof valueOrHandler;
            if (type !== 'undefined' && type !== 'function') {
                setValueHandler($elem);
                defer.resolve($elem);
            } else {
                defer.then(valueOrHandler);
                defer.resolve(getValueHandler($elem));
            }
            return defer.promise();
        };
    }

    function elementBehavior(methodName, propName, valueOrHandler) {
        return construct(function ($elem) {
            $elem[methodName](propName, valueOrHandler);
        }, function ($elem) {
            return $elem[methodName](propName);
        }, valueOrHandler);
    }

    function attr(propName, valueOrHandler) {
        return elementBehavior('attr', propName, valueOrHandler);
    }

    function prop(propName, valueOrHandler) {
        return elementBehavior('prop', propName, valueOrHandler);
    }

    function methodBehavior(methodName, valueOrHandler) {
        return construct(function ($elem) {
            $elem[methodName](valueOrHandler);
        }, function ($elem) {
            return $elem[methodName]();
        }, valueOrHandler);
    }

    function option(valuesOrHandler) {
        return construct(function ($elem) {
            var values = valuesOrHandler.length !== undefined ? valuesOrHandler : [valuesOrHandler];
            $elem.find('option').each(function (idx, element) {
                if (valuesOrHandler.indexOf($(this).val()) != -1) {
                    $(this).prop('selected', true);
                }
            });
        }, function ($elem) {
            var values = [];
            $elem.find('option:selected').each(function () {
                values.push($(this).val());
            });
            return values.length > 1 ? values : values[0];
        }, valuesOrHandler);
    }

    function query(selectedElementsHandler) {
        return deferred(function (defer, $elems) {
            defer.then(selectedElementsHandler);
            defer.resolve($elems);
        });
    }

    function select(value) {
        if (typeof(value) === 'undefined') {
            return prop('checked', true);
        } else {
            return deferred(function (defer, $elems) {
                $elems.each(function (idx, element) {
                    if ($(element).val() == value) {
                        $(element).prop('checked', true);
                    }
                });
                defer.resolve();
            });
        }
    }

    function eventBehavior(eventName) {
        return function ($elem) {
            if ($elem.prop('tagName') === 'A' && eventName === 'click') {
                var currentPathname = win().prop('location').pathname;
                var target = resolve(dirname(currentPathname), $elem.attr('href'));
                return navigateTo(target)();
            } else {
                var defer = $.Deferred();
                $elem.trigger(eventName);
                defer.resolve();
                return defer.promise();
            }
        }
    }

    // element

    var prototype = {
        constructor: element,
        enter: function (value) {
            dslList.push(attr('value', value));
        },
        check: function () {
            dslList.push(prop('checked', true));
        },
        uncheck: function () {
            dslList.push(prop('checked', false));
        },
        select: function (value) {
            dslList.push(select(value));
        },
        click: function () {
            dslList.push(eventBehavior('click'));
        },
        isChecked: function (checkedHandler) {
            dslList.push(prop('checked', checkedHandler));
        },
        isSelected: function (selectedHandler) {
            dslList.push(prop('checked', selectedHandler));
        },
        isDisabled: function (disabledHandler) {
            dslList.push(prop('disabled', disabledHandler));
        },
        option: function (valueOrHandler) {
            dslList.push(option(valueOrHandler));
        },
        options: function () {
            var args = [].slice.call(arguments);
            dslList.push(option(args.length > 1 ? args : args[0]));
        },
        query: function (selectedElementsHandler) {
            dslList.push(query(selectedElementsHandler));
        }
    };

    $(['attr', 'prop', 'css']).each(function (idx, methodName) {
        prototype[methodName] = function (propName, propOrHandler) {
            dslList.push(elementBehavior(methodName, propName, propOrHandler));
        };
    });

    $(['val', 'text', 'count#size', 'html',
        'height', 'innerHeight', 'outerHeight',
        'width', 'innerWidth', 'outerWidth',
        'position', 'scrollLeft', 'scrollTop', 'offset']).each(function (idx, methodName) {
        var names = methodName.split('#');
        prototype[names[0]] = function (valueOrHandler) {
            dslList.push(methodBehavior(names[1] || names[0], valueOrHandler));
        };
    });

    element.prototype = prototype;

    global.browser = browser;
    global.dsl = dsl;
    global.dropdownlist = global.input = global.element = element;

    if (typeof global.chai !== 'undefined') {
        // use chai assertions if available
        global.expect = global.chai.expect;
        global.should = global.chai.should;
        global.assert = global.chai.assert;
    } else if (typeof global.expect === 'undefined') {
        // use built-in jasmine style assertions if expect.js is not already loaded
        global.expect = expectations;
    }

})(this, jQuery, _, expectations, undefined);

