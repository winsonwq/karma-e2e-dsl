'use strict';
 
module.exports = function(grunt) {
 
  // Project configuration.
  grunt.initConfig({
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
        files: ['./testSpec.js'],
        tasks: ['connect', 'karma:e2e']
      },
    },
    karma: {
      e2e: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    uglify: {
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
 
};