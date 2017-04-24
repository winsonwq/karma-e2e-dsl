# karma-e2e-dsl, an end-to-end web testing API

As you know, karma testing runner couldn't run E2E testcases for web site which isn't based on AngularJS. If your site is using AngularJS, just ignore this project and choose `ng-scenario`.

## How to use

Choose `Mocha` as your testing framework, and then set up `karma-e2e-dsl` in frameworks array as well. Remember to add `karma-e2e-dsl` to `package.json` file.

```js
module.exports = function(config) {
  config.set({
	files: [{pattern: 'tests/**/*.js', included: true}],
	browsers: 'Firefox', 'Chrome', 'PhantomJS', …
    frameworks: ['mocha', 'karma-e2e-dsl'],
    // list of files / patterns to load in the browser
    files: [
      './should.js',
      './testSpec.js',
    ],
    exclude: [],
	urlRoot: '/karma/',
    proxies: { '/': 'http://localhost:8000/'},
    /* the rest of configurations, for instance */
    client: {mocha: { ui: 'tdd' }},
    port: 9876,
    reporters: ['progress'],
    colors: true,
    logLevel: config.LOG_INFO,
    captureTimeout: 20000,
    browserNoActivityTimeout: 300000,
    autoWatch: false,
    singleRun: true,
  });
};
```

A presentation have been given at the OpenWorldForum 2014, Paris. You can watch the video again here : http://www.acoeuro.com/test-e2e.html

## API

### High level test API

- `test_page_loading(url, title)` tests if the given URL loads a page with the given `title` in the captured browsers.
- `test_match(selector, regexp)` tests if the selected DOM element .text() value match the given `regexp`.
- `test_val(selector, text)` tests if the selected DOM element has a given value : .val()
- `test_exist(selector)` tests if the selected DOM element exists.
- `test_text(selector, text, visible)` tests if the selected DOM element has the given text : .text() ; if `visible` is true, the test asserts that the text is visible.
- `test_count(selector, count)` tests selector occurences.
- `test_fill_field(selector, value_array)` fills the selected input form field. `value_array` should contain `selector` as one of its keys. The set value will be this one.
- `test_click(selector, wait, visible)` clicks on the selected DOM element. If `wait` is true the test waits for a page to load in the browser after the click. If `visible` is true the test asserts that the element is visible.
- `test_submit(selector)` submits the selected form.
- `test_reload` reloads the page.
- `test_fail` test that always fails, usefull to stop a test suite and start debugging.
- `test_pause` have the browser waiting while you inspect what's going on.
- `test_resume` start back the testsuite.
- `elt(selector, visible)` ensure the given element exists and, if `visible` is true, is visible.

### Browser API

- `browser.navigateTo(path)` go to the path which is relative to current path.
- `browser.reload()` refreshes the currently loaded page in the test frame.
- `browser.delay(callback, duration)` delay to execute the `callback` in `duration` milliseconds.
- `browser.sleep(duration)` sleep for `duration` milliseconds.
- `browser.pause()` pause the execution of running testcases.
- `browser.resume()` resume the execution of running testcases.
- `browser.waitForPageLoad()` manually set up waiting for page load.

### Window API

- `browser.window.path()` returns the window.location.pathname of the currently loaded page in the test frame.
- `browser.window.href()` returns the window.location.href of the currently loaded page in the test frame.
- `browser.window.hash()` returns the window.location.hash (without #) of the currently loaded page in the test frame.
- `browser.window.search()` returns the window.location.search of the currently loaded page in the test frame.

### Element API

- `input(selector).enter(value)` enters the given `value` in the text field with the corresponding `selector`.`
- `input(selector).check()` check the checkbox with the corresponding `selector`.`
- `input(selector).uncheck()` unheck the checkbox with the corresponding `selector`.`
- `input(selector).select()` select the radio button with the corresponding `selector`.`
- `element(selector).click()` click the element with the corresponding `selector`.`
- `input(selector).isChecked()` return true if the checkbox is checked.
- `input(selector).isSelected()` return true if the radio button is selected.
- `element(selector).isDisabled()` return true if the element is selected.
- `dropdownlist(selector).option(value)` picks the option with the given value on the select with the given selector.
- `dropdownlist(selector).option()` return the selected value of option.
- `dropdownlist(selector).options(val1/*, val2 ...*/)` picks the options with the given values on the multi select with the given selector.
- `dropdownlist(selector).options()` return the selected values of options.
- `form(selector).submit()` submit the form with the corresponding `selector'.`
`input`, `dropdownlist` and `form` are only aliases of `element`.
- `element(selector).query(fn)` executes the function fn(selectedElements), where selectedElements are the elements that match the given jQuery selector and done is a function that is called at the end of the fn function.
- `element(selector).{method}()` returns the result of calling method on the element matching the given jQuery selector, where method can be 'count' or any of the following jQuery methods: val, text, html, height, innerHeight, outerHeight, width, innerWidth, outerWidth, position, scrollLeft, scrollTop, offset.
- `element(selector).{method}(value)` executes the method passing in value on the element matching the given jQuery selector, where method can be any of the following jQuery methods: val, text, html, height, innerHeight, outerHeight, width, innerWidth, outerWidth, position, scrollLeft, scrollTop, offset.
- `element(selector).{method}(key)` returns the result of calling method passing in key on the element matching the given jQuery selector, where method can be any of the following jQuery methods: attr, prop, css.
- `element(selector).{method}(key, value)` executes the method passing in key and value on the element matching the given jQuery selector, where method can be any of the following jQuery methods: attr, prop, css.

### Matchers

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

