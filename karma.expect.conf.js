var baseConfig = require('./karma.base');

module.exports = function(config) {
    baseConfig(config);

    config.set({
        files: [
            './bower_components/underscore/underscore-min.js',
            './bower_components/jquery/dist/jquery.min.js',
            './bower_components/chai/chai.js',
            //'./bower_components/expect/index.js',
            './expectations.js',
            './karma-e2e-dsl.js',
            './test-expect.spec.js'
        ]
    });
};