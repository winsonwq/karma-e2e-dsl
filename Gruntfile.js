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
        tasks: ['connect','karma:e2e']
      },
    },
    karma: {
      e2e: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });
 
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-karma');
 
  // Default task.
  grunt.registerTask('test', ['connect', 'karma:e2e']);
 
};