# karma-e2e-dsl

As you know, karma testing runner couldn't run E2E testcases for web site which isn't based on AngularJS. If your site is using AngularJS, just ignore this project and choose `ng-scenario`.

## How to use

Choose `Mocha` as your testing framework, and then set up `karma-e2e-dsl` in frameworks array as well. Remember to add `karma-e2e-dsl` to `package.json` file.

```js
module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['mocha', 'karma-e2e-dsl'],
    // list of files / patterns to load in the browser
    files: [
      './should.js',
      './testSpec.js',
    ],
    exclude: [
    ],
	urlRoot: '/karma/',
    proxies: {
      '/': 'http://localhost:8000/'
    },
    /* the rest of configurations */
  });
};
```

## DSL

### Browser API

#### browser.navigateTo(path)

Go to the path which is relative to current path.

#### browser.reload()

Refreshes the currently loaded page in the test frame.

#### browser.delay(callback, duration)

Delay to execute the `callback` in `duration` milliseconds.

#### browser.sleep(duration)

Sleep for `duration` milliseconds.

#### browser.pause()

Pause the execution of running testcases.

#### browser.resume()

Resume the execution of running testcases.

#### browser.waitForPageLoad()

Manually set up waiting for page load.

### Window API

#### browser.window.path()

Returns the window.location.pathname of the currently loaded page in the test frame.

#### browser.window.href()

Returns the window.location.href of the currently loaded page in the test frame.

#### browser.window.hash()

Returns the window.location.hash (without #) of the currently loaded page in the test frame.

#### browser.window.search()

Returns the window.location.search of the currently loaded page in the test frame.

### Element API

#### input(selector).enter(value)

Enters the given `value` in the text field with the corresponding `selector`.

#### input(selector).check()

Check the checkbox with the corresponding `selector`.

#### input(selector).uncheck()

Unheck the checkbox with the corresponding `selector`.

#### input(selector).select()

Select the radio button with the corresponding `selector`.

#### element(selector).click()

Click the element with the corresponding `selector`.

#### input(selector).isChecked()

Return true if the checkbox is checked.

#### input(selector).isSelected()

Return true if the radio button is selected.

#### element(selector).isDisabled()

Return true if the element is selected.

#### dropdownlist(selector).option(value)

Picks the option with the given value on the select with the given selector.

#### dropdownlist(selector).option()

Return the selected value of option.

#### dropdownlist(selector).options(val1/*, val2 ...*/)

Picks the options with the given values on the multi select with the given selector.

#### dropdownlist(selector).options()

Return the selected values of options.

#### form(selector).submit()

Submit the form with the corresponding `selector'.

`input`, `dropdownlist` and `form` are only aliases of `element`.

#### element(selector).query(fn)

Executes the function fn(selectedElements), where selectedElements are the elements that match the given jQuery selector and done is a function that is called at the end of the fn function.

#### element(selector).{method}()

Returns the result of calling method on the element matching the given jQuery selector, where method can be 'count' or any of the following jQuery methods: val, text, html, height, innerHeight, outerHeight, width, innerWidth, outerWidth, position, scrollLeft, scrollTop, offset.

#### element(selector).{method}(value)

Executes the method passing in value on the element matching the given jQuery selector, where method can be any of the following jQuery methods: val, text, html, height, innerHeight, outerHeight, width, innerWidth, outerWidth, position, scrollLeft, scrollTop, offset.

#### element(selector).{method}(key)

Returns the result of calling method passing in key on the element matching the given jQuery selector, where method can be any of the following jQuery methods: attr, prop, css.

#### element(selector).{method}(key, value)

Executes the method passing in key and value on the element matching the given jQuery selector, where method can be any of the following jQuery methods: attr, prop, css.

## Matchers

Matchers are used in combination with the expect(...) function as described above and can be negated with not(). For instance: expect(element('h1').text()).not().toEqual('Error').

```js
// value and Object comparison following the rules of angular.equals().
expect(value).toEqual(value)
 
// a simpler value comparison using ===
expect(value).toBe(value)
 
// checks that the value is defined by checking its type.
expect(value).toBeDefined()
 
// the following two matchers are using JavaScript's standard truthiness rules
expect(value).toBeTruthy()
expect(value).toBeFalsy()
 
// verify that the value matches the given regular expression. The regular
// expression may be passed in form of a string or a regular expression
// object.
expect(value).toMatch(expectedRegExp)
 
// a check for null using ===
expect(value).toBeNull()
 
// Array.indexOf(...) is used internally to check whether the element is
// contained within the array.
expect(value).toContain(expected)
 
// number comparison using < and >
expect(value).toBeLessThan(expected)
expect(value).toBeGreaterThan(expected)
```

## License

> Copyright (c) 2014 Simon Descarpentries (siltaar/\d12s.fr)
> 
> Copyright (c) 2013 Wang Qiu (winsonwq@gmail.com)
> 
> Permission is hereby granted, free of charge, to any person
> obtaining a copy of this software and associated documentation
> files (the "Software"), to deal in the Software without
> restriction, including without limitation the rights to use,
> copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the
> Software is furnished to do so, subject to the following
> conditions:
> 
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
> OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
> NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
> HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
> WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
> FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
> OTHER DEALINGS IN THE SOFTWARE.

