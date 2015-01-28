describe('karma e2e dsl', function () {

    this.timeout(15000);

    beforeEach(dsl(function () {
        browser.navigateTo('/app/index.html');
    }));

    describe('#pause and #resume', function () {

        var selector = '[name="textbox"]';

        it('could resume the pause', dsl(function () {
            // browser.pause();
            input(selector).val('');

            // jasmine style expect
            expect(input(selector).val()).toEqual('');

            // chai expect or expect.js
            //input(selector).val(function(val) {
            //    expect(val).to.equal('');
            //});

            // chai assert
            //input(selector).val(function(val) {
            //    assert.equal(val, '');
            //});

            // chai should or should.js
            //input(selector).val(function(val) {
            //    val.should.equal('');
            //});
        }));

    });

    describe('#attr', function () {

        it('could get attribute value of element', dsl(function () {
            // jasmine style expect
            expect(input('input[name="textbox"]').attr('name')).toBe('textbox');

            // chai expect or expect.js
            //input('input[name="textbox"]').attr('name', function(name) {
            //    expect(name).to.equal('textbox');
            //});

            // chai assert
            //input('input[name="textbox"]').attr('name', function(name) {
            //    assert.equal(name, 'textbox);
            //});

            // chai should or should.js
            //input('input[name="textbox"]').attr('name', function(name) {
            //    name.should.equal('textbox');
            //});
        }));

    });

    describe('#css', function () {

        it('could return css value of element as per css property', dsl(function () {
            // jasmine style expect
            expect(input('input[name="textbox"]').css('font-family')).toEqual('verdana');

            // chai expect or expect.js
            //input('input[name="textbox"]').css('font-family', function(font) {
            //    expect(font).to.equal('verdana');
            //});

            // chai assert
            //input('input[name="textbox"]').css('font-family', function(font) {
            //    assert.equal(font, 'verdana');
            //});

            // chai should or should.js
            //input('input[name="textbox"]').css('font-family', function(font) {
            //    font.should.equal('verdana');
            //});
        }));

    });

    describe('#html', function () {

        it('could return inner html of element', dsl(function () {
            // jasmine style expect
            expect(element('form').html()).toContain('<legend>Form Elements Test</legend>');

            // chai expect or expect.js
            //element('form').html(function(html) {
            //    expect(html).to.contain('<legend>Form Elements Test</legend>');
            //});

            // chai assert
            //element('form').html(function(html) {
            //    assert.include(html, '<legend>Form Elements Test</legend>');
            //});

            // chai should or should.js
            //element('form').html(function(html) {
            //    html.should.contain('<legend>Form Elements Test</legend>');
            //});
        }));

    });

    describe('#delay', function () {

        var selector = '[name="textbox"]';

        it('could delay the dsl', dsl(function () {
            browser.delay(function () {
                input(selector).val(function (val) {
                    // jasmine style expect
                    expect(val).toEqual('hello world');

                    // chai expect or expect.js
                    //expect(val).to.equal('hello world');

                    // chai assert
                    //assert.equal(val, 'hello world');

                    // chai should or should.js
                    //val.should.equal('hello world');
                });
            }, 20);

            browser.delay(function () {
                input(selector).enter('hello world!');
            }, 30);

            browser.delay(function () {
                input(selector).val(function (val) {
                    // jasmine style expect
                    expect(val).toEqual('hello world!');

                    // chai expect or expect.js
                    //expect(val).to.equal('hello world!');

                    // chai assert
                    //assert.equal(val, 'hello world!');

                    // chai should or should.js
                    //val.should.equal('hello world!');
                });
            }, 40);

            input(selector).enter('hello world');
        }));


        it('could delay the dsl in nested loop', dsl(function () {
            browser.delay(function () {
                input(selector).enter('hello world!');

                browser.delay(function () {
                    input(selector).enter('hello world!!');
                }, 10);

            }, 20);

            browser.delay(function () {
                input(selector).val(function (val) {
                    // jasmine style expect
                    expect(val).toEqual('hello world!');

                    // chai expect or expect.js
                    //expect(val).to.equal('hello world!');

                    // chai assert
                    //assert.equal(val, 'hello world!');

                    // chai should or should.js
                    //val.should.equal('hello world!');
                });
            }, 25);

            browser.delay(function () {
                input(selector).val(function (val) {
                    // jasmine style expect
                    expect(val).toEqual('hello world!!');

                    // chai expect or expect.js
                    //expect(val).to.equal('hello world!!');

                    // chai assert
                    //assert.equal(val, 'hello world!!');

                    // chai should or should.js
                    //val.should.equal('hello world!!');
                });
            }, 40);

            input(selector).enter('hello world');

        }));

    });

    describe('#sleep', function () {

        var selector = '[name="textbox"]';

        it('could sleep for a while', dsl(function () {
            browser.sleep(200);
            input(selector).enter('hello world!');
            input(selector).val(function (val) {
                // jasmine style expect
                expect(val).toEqual('hello world!');

                // chai expect or expect.js
                //expect(val).to.equal('hello world!');

                // chai assert
                //assert.equal(val, 'hello world!');

                // chai should or should.js
                //val.should.equal('hello world!');
            });
        }));

    });

    describe('input[name="textbox"]', function () {

        var selector = '[name="textbox"]';

        it('could enter text', dsl(function () {
            input(selector).enter('hello world!');
            input(selector).val(function (val) {
                // jasmine style expect
                expect(val).toEqual('hello world!');

                // chai expect or expect.js
                //expect(val).to.equal('hello world!');

                // chai assert
                //assert.equal(val, 'hello world!');

                // chai should or should.js
                //val.should.equal('hello world!');
            });
        }));
    });

    describe('input[name="checkbox"]', function () {

        var selector = '[name="checkbox"]';

        it('could be checked', dsl(function () {
            input(selector).check();
            input(selector).isChecked(function (isChecked) {
                // jasmine style expect
                expect(isChecked).toBeTruthy();

                // chai expect or expect.js
                //expect(isChecked).to.be.true;

                // chai assert
                //assert.isTrue(isChecked);

                // chai should or should.js
                //isChecked.should.be.true;
            });
        }));

        it('could be unchecked', dsl(function () {
            input(selector).check();
            input(selector).uncheck();
            input(selector).isChecked(function (isChecked) {
                // jasmine style expect
                expect(isChecked).toBeFalsy();

                // chai expect or expect.js
                //expect(isChecked).to.be.false;

                // chai assert
                //assert.isFalse(isChecked);

                // chai should or should.js
                //isChecked.should.be.false;
            });
        }));

    });

    describe('input[name="radio"]', function () {

        var selectorA = '[name="radio"]:first';
        var selectorB = '[name="radio"]:last';
        var selector = '[name="radio"]';

        it('could be selected', dsl(function () {
            input(selectorA).select();
            input(selectorA).isSelected(function (selected) {
                // jasmine style expect
                expect(selected).toBeTruthy();

                // chai expect or expect.js
                //expect(selected).to.be.true;

                // chai assert
                //assert.isTrue(selected);

                // chai should or should.js
                //selected.should.be.true;
            });
        }));

        it('could be unselected by value seleting another radio with same name', dsl(function () {
            input(selectorA).select();
            input(selectorB).select();
            input(selectorA).isSelected(function (selected) {
                // jasmine style expect
                expect(selected).toBeFalsy();

                // chai expect or expect.js
                //expect(selected).to.be.false;

                // chai assert
                //assert.isFalse(selected);

                // chai should or should.js
                //selected.should.be.false;
            });
        }));

        it('could be selected by given value', dsl(function () {
            input(selector).select("1");
            input(selectorA).isSelected(function (selected) {
                // jasmine style expect
                expect(selected).toBeTruthy();

                // chai expect or expect.js
                //expect(selected).to.be.true;

                // chai assert
                //assert.isTrue(selected);

                // chai should or should.js
                //selected.should.be.true;
            });
        }));

    });

    describe('input[name="button"]', function () {

        it('could be clicked', dsl(function () {
            input('#btn').click();
            element('body').text(function (text) {
                // jasmine style expect
                expect(text).toEqual('button clicked!!');

                // chai expect or expect.js
                //expect(text).to.equal('button clicked!!');

                // chai assert
                //assert.equal(text, 'button clicked!!');

                // chai should or should.js
                //text.should.equal('button clicked!');
            });
        }));

    });

    describe('input#disabled-btn[name="button"]', function () {

        it('should not be enabled', dsl(function () {
            input('input#disabled-btn[name="button"]').isDisabled(function (disabled) {
                // jasmine style expect
                expect(disabled).toBeTruthy();

                // chai expect or expect.js
                //expect(disabled).to.be.true;

                // chai assert
                //assert.isTrue(disabled);

                // chai should or should.js
                //disabled.should.be.true;
            });
        }));
    });

    describe('input[type="submit"]', function () {

        it('should not be enabled', dsl(function () {
            input('[type="submit"]').click();
            browser.waitForPageLoad();

            // jasmine style expect
            expect(browser.window.href()).toContain('dropdownlist=1');

            // chai expect or expect.js
            //browser.window.href(function(href) {
            //    expect(href).to.contain('dropdownlist=1');
            //});

            // chai assert
            //browser.window.href(function(href) {
            //    assert.include(href, 'dropdownlist=1');
            //});

            // chai should or should.js
            //browser.window.href(function(href) {
            //    href.should.contain('dropdownlist=1');
            //});
        }));
    });

    describe('select[name="dropdownlist"]', function () {

        var selector = '[name="dropdownlist"]';

        it('could be set to the correct option as per assigned value', dsl(function () {
            dropdownlist(selector).option('2');
            dropdownlist(selector).option(function (value) {
                // jasmine style expect
                expect(value).toEqual('2');

                // chai expect or expect.js
                //expect(value).to.equal('2');

                // chai assert
                //assert.equal(value, '2');

                // chai should or should.js
                //value.should.equal('2');
            });
        }));

    });

    describe('select[name="multi-select-dropdownlist"]', function () {

        var selector = '[name="multi-select-dropdownlist"]';

        it('could be set to the correct option as per assigned value', dsl(function () {
            dropdownlist(selector).options('1', '4');

            // jasmine style expect
            expect(dropdownlist(selector).options()).toContain('1');

            // chai expect or expect.js
            //dropdownlist(selector).options(function (options) {
            //    expect(options).to.contain('1');
            //});

            // chai assert
            //dropdownlist(selector).options(function (options) {
            //    assert.include(options, '1');
            //});

            // chai should or should.js
            //dropdownlist(selector).options(function (options) {
            //    options.should.contain('1');
            //});

            // jasmine style expect
            expect(dropdownlist(selector).options()).toContain('4');

            // chai expect or expect.js
            //dropdownlist(selector).options(function (options) {
            //    expect(options).to.contain('4');
            //});

            // chai assert
            //dropdownlist(selector).options(function (options) {
            //    assert.include(options, '4');
            //});

            // chai should or should.js
            //dropdownlist(selector).options(function (options) {
            //    options.should.contain('4');
            //});
        }));

    });

    describe('link', function () {

        it('could find the link by normal selector', dsl(function () {
            element('#link').click();
            element('body').text(function (text) {
                // jasmine style expect
                expect(text).toContain('this is a demo page !');

                // chai expect or expect.js
                //expect(text).to.contain('this is a demo page !');

                // chai assert
                //assert.include(text, 'this is a demo page !');

                // chai should or should.js
                //text.should.contain('this is a demo page !');
            });
        }));

    });

    describe('elements', function () {

        it('could get count of matched elements', dsl(function () {
            element('a').count(function (count) {
                // jasmine style expect
                expect(count).toEqual(2);

                // chai expect or expect.js
                //expect(count).to.equal(2);

                // chai assert
                //assert.equal(count, 2);

                // chai should or should.js
                //count.should.equal(2);
            });

            element('a').count(function (count) {
                // jasmine style expect
                expect(count).toBeLessThan(3);

                // chai expect or expect.js
                //expect(count).to.be.below(3);

                // chai assert
                //assert(count < 3);

                // chai should or should.js
                //count.should.be.below(3);
            });

            element('a').count(function (count) {
                // jasmine style expect
                expect(count).toBeGreaterThan(1);

                // chai expect or expect.js
                //expect(count).to.be.above(1);

                // chai assert
                //assert(count > 1);

                // chai should or should.js
                //count.should.be.above(1);
            });
        }));

        describe('get elements inside', function () {

            it('could get elements inside', dsl(function () {
                element('a').query(function (selectedElements) {
                    // jasmine style expect
                    expect(selectedElements.size()).toEqual(2);
                    expect(selectedElements.eq(0).text()).toEqual('Go to demo');

                    // chai expect or expect.js
                    //expect(selectedElements.size()).to.equal(2);
                    //expect(selectedElements.eq(0).text()).to.equal('Go to demo');

                    // chai assert
                    //assert.equal(selectedElements.size(), 2);
                    //assert.equal(selectedElements.eq(0).text(), 'Go to demo');

                    // chai should or should.js
                    //selectedElements.size().should.equal(2);
                    //selectedElements.eq(0).text().should.equal('Go to demo');
                });
            }));
        });
    });

    describe('#browser', function () {

        describe('#navigateTo', function () {
            it('could navigate to target path', dsl(function () {
                // jasmine style expect
                expect(browser.window.path()).toMatch(/^\/app\/index.html$/);

                // chai expect or expect.js
                //browser.window.path(function (path) {
                //    expect(path).to.match(/^\/app\/index.html$/);
                //});

                // chai assert
                //browser.window.path(function (path) {
                //    assert.match(path, /^\/app\/index.html$/);
                //});

                // chai should or should.js
                //browser.window.path(function (path) {
                //    path.should.match(/^\/app\/index.html$/);
                //});
            }));
        });

        describe('#window', function () {

            describe('#href', dsl(function () {

                it('could get the href of page', dsl(function (done) {
                    browser.window.href(function (href) {
                        // jasmine style expect
                        expect(href).toEqual('http://localhost:9876/app/index.html');

                        // chai expect or expect.js
                        //expect(href).to.equal('http://localhost:9876/app/index.html');

                        // chai assert
                        //assert.equal(href, 'http://localhost:9876/app/index.html');

                        // chai should or should.js
                        //href.should.equal('http://localhost:9876/app/index.html');
                    });
                }));

            }));

            describe('#path', dsl(function () {

                it('could get the path of page', dsl(function (done) {
                    browser.navigateTo('/app/index.html?#hello-world');
                    browser.window.path(function (path) {
                        // jasmine style expect
                        expect(path).toEqual('/app/index.html');

                        // chai expect or expect.js
                        //expect(path).to.equal('/app/index.html');

                        // chai assert
                        //assert.equal(path, '/app/index.html');

                        // chai should or should.js
                        //path.should.equal('/app/index.html');
                    });
                }));

            }));

            describe('#hash', dsl(function () {

                it('could get the hash of page', dsl(function (done) {
                    browser.navigateTo('/app/index.html?#hello-world');
                    browser.window.hash(function (hash) {
                        // jasmine style expect
                        expect(hash).toEqual('#hello-world');

                        // chai expect or expect.js
                        //expect(hash).to.equal('#hello-world');

                        // chai assert
                        //assert.equal(hash, '#hello-world');

                        // chai should or should.js
                        //hash.should.equal('#hello-world');
                    });
                }));

            }));

            describe('#search', dsl(function () {

                it('could get the search of page', dsl(function (done) {
                    browser.navigateTo('/app/index.html?a=1');
                    browser.window.search(function (search) {
                        // jasmine style expect
                        expect(search).toEqual('?a=1');

                        // chai expect or expect.js
                        //expect(search).to.equal('?a=1');

                        // chai assert
                        //assert.equal(search, '?a=1');

                        // chai should or should.js
                        //search.should.equal('?a=1');
                    });
                }));

            }));

            describe('#reload', function () {

                it('could reload current page', dsl(function () {
                    browser.reload();
                    browser.window.path(function (path) {
                        // jasmine style expect
                        expect(path).toEqual('/app/index.html');

                        // chai expect or expect.js
                        //expect(path).to.equal('/app/index.html');

                        // chai assert
                        //assert.equal(path, '/app/index.html');

                        // chai should or should.js
                        //path.should.equal('/app/index.html');
                    });
                }));

            });
        });

    });
});


