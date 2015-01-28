'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: './'
                }
            }
        },
        watch: {
            test: {
                files: ['./test.spec.js', './karma-e2e-dsl.js'],
                tasks: ['connect', 'uglify:build', 'karma:e2e']
            }
        },
        karma: {
            e2e: {
                configFile: 'karma.conf.js',
                singleRun: true
            },
            e2eShould: {
                configFile: 'karma.should.conf.js',
                singleRun: true
            },
            e2eAssert: {
                configFile: 'karma.assert.conf.js',
                singleRun: true
            },
            e2eExpect: {
                configFile: 'karma.expect.conf.js',
                singleRun: true
            }
        },
        uglify: {
            options: {
                report: 'min',
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            build: {
                files: {
                    'dist/karma-e2e-dsl.min.js': ['./karma-e2e-dsl.js']
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');

    // Default task.
    grunt.registerTask('test', ['connect', 'uglify', 'karma:e2e']);
    grunt.registerTask('test:should', ['connect', 'uglify', 'karma:e2eShould']);
    grunt.registerTask('test:assert', ['connect', 'uglify', 'karma:e2eAssert']);
    grunt.registerTask('test:expect', ['connect', 'uglify', 'karma:e2eExpect']);

};