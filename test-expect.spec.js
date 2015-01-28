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

            input(selector).val(function(val) {
                expect(val).to.equal('');
            });
        }));

    });

    describe('#attr', function () {

        it('could get attribute value of element', dsl(function () {
            input('input[name="textbox"]').attr('name', function(name) {
                expect(name).to.equal('textbox');
            });
        }));

    });

    describe('#css', function () {

        it('could return css value of element as per css property', dsl(function () {
            input('input[name="textbox"]').css('font-family', function(font) {
                expect(font).to.equal('verdana');
            });
        }));

    });

    describe('#html', function () {

        it('could return inner html of element', dsl(function () {
            element('form').html(function(html) {
                expect(html).to.contain('<legend>Form Elements Test</legend>');
            });
        }));

    });

    describe('#delay', function () {

        var selector = '[name="textbox"]';

        it('could delay the dsl', dsl(function () {
            browser.delay(function () {
                input(selector).val(function (val) {
                    expect(val).to.equal('hello world');
                });
            }, 20);

            browser.delay(function () {
                input(selector).enter('hello world!');
            }, 30);

            browser.delay(function () {
                input(selector).val(function (val) {
                    expect(val).to.equal('hello world!');
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
                    expect(val).to.equal('hello world!');
                });
            }, 25);

            browser.delay(function () {
                input(selector).val(function (val) {
                    expect(val).to.equal('hello world!!');
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
                expect(val).to.equal('hello world!');
            });
        }));

    });

    describe('input[name="textbox"]', function () {

        var selector = '[name="textbox"]';

        it('could enter text', dsl(function () {
            input(selector).enter('hello world!');
            input(selector).val(function (val) {
                expect(val).to.equal('hello world!');
            });
        }));
    });

    describe('input[name="checkbox"]', function () {

        var selector = '[name="checkbox"]';

        it('could be checked', dsl(function () {
            input(selector).check();
            input(selector).isChecked(function (isChecked) {
                expect(isChecked).to.be.true;
            });
        }));

        it('could be unchecked', dsl(function () {
            input(selector).check();
            input(selector).uncheck();
            input(selector).isChecked(function (isChecked) {
                expect(isChecked).to.be.false;
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
                expect(selected).to.be.true;
            });
        }));

        it('could be unselected by value seleting another radio with same name', dsl(function () {
            input(selectorA).select();
            input(selectorB).select();
            input(selectorA).isSelected(function (selected) {
                expect(selected).to.be.false;
            });
        }));

        it('could be selected by given value', dsl(function () {
            input(selector).select("1");
            input(selectorA).isSelected(function (selected) {
                expect(selected).to.be.true;
            });
        }));

    });

    describe('input[name="button"]', function () {

        it('could be clicked', dsl(function () {
            input('#btn').click();
            element('body').text(function (text) {
                expect(text).to.match(/button clicked!!/m);
            });
        }));

    });

    describe('input#disabled-btn[name="button"]', function () {

        it('should not be enabled', dsl(function () {
            input('input#disabled-btn[name="button"]').isDisabled(function (disabled) {
                expect(disabled).to.be.true;
            });
        }));
    });

    describe('input[type="submit"]', function () {

        it('should not be enabled', dsl(function () {
            input('[type="submit"]').click();
            browser.waitForPageLoad();
            browser.window.href(function(href) {
                expect(href).to.contain('dropdownlist=1');
            });
        }));
    });

    describe('select[name="dropdownlist"]', function () {

        var selector = '[name="dropdownlist"]';

        it('could be set to the correct option as per assigned value', dsl(function () {
            dropdownlist(selector).option('2');
            dropdownlist(selector).option(function (value) {
                expect(value).to.equal('2');
            });
        }));

    });

    describe('select[name="multi-select-dropdownlist"]', function () {

        var selector = '[name="multi-select-dropdownlist"]';

        it('could be set to the correct option as per assigned value', dsl(function () {
            dropdownlist(selector).options('1', '4');

            dropdownlist(selector).options(function (options) {
                expect(options).to.contain('1');
            });

            dropdownlist(selector).options(function (options) {
                expect(options).to.contain('4');
            });
        }));

    });

    describe('link', function () {

        it('could find the link by normal selector', dsl(function () {
            element('#link').click();
            element('body').text(function (text) {
                expect(text).to.contain('this is a demo page !');
            });
        }));

    });

    describe('elements', function () {

        it('could get count of matched elements', dsl(function () {
            element('a').count(function (count) {
                expect(count).to.equal(2);
            });

            element('a').count(function (count) {
                expect(count).to.be.below(3);
            });

            element('a').count(function (count) {
                expect(count).to.be.above(1);
            });
        }));

        describe('get elements inside', function () {

            it('could get elements inside', dsl(function () {
                element('a').query(function (selectedElements) {
                    expect(selectedElements.size()).to.equal(2);
                    expect(selectedElements.eq(0).text()).to.equal('Go to demo');
                });
            }));
        });
    });

    describe('#browser', function () {

        describe('#navigateTo', function () {
            it('could navigate to target path', dsl(function () {
                browser.window.path(function (path) {
                    expect(path).to.match(/^\/app\/index.html$/);
                });
            }));
        });

        describe('#window', function () {

            describe('#href', dsl(function () {

                it('could get the href of page', dsl(function (done) {
                    browser.window.href(function (href) {
                        expect(href).to.equal('http://localhost:9876/app/index.html');
                    });
                }));

            }));

            describe('#path', dsl(function () {

                it('could get the path of page', dsl(function (done) {
                    browser.navigateTo('/app/index.html?#hello-world');
                    browser.window.path(function (path) {
                        expect(path).to.equal('/app/index.html');
                    });
                }));

            }));

            describe('#hash', dsl(function () {

                it('could get the hash of page', dsl(function (done) {
                    browser.navigateTo('/app/index.html?#hello-world');
                    browser.window.hash(function (hash) {
                        expect(hash).to.equal('#hello-world');
                    });
                }));

            }));

            describe('#search', dsl(function () {

                it('could get the search of page', dsl(function (done) {
                    browser.navigateTo('/app/index.html?a=1');
                    browser.window.search(function (search) {
                        expect(search).to.equal('?a=1');
                    });
                }));

            }));

            describe('#reload', function () {

                it('could reload current page', dsl(function () {
                    browser.reload();
                    browser.window.path(function (path) {
                        expect(path).to.equal('/app/index.html');
                    });
                }));

            });
        });

    });
});
