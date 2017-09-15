module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
// copy vendor, html, and css files
    copy: {
      angular: {
        expand: true,
        cwd: 'node_modules/angular',
        src: ['angular.min.js', 'angular.min.js.map'],
        dest: 'server/public/vendors/'
      },
      // htmlcss is whatever we want to call it
      htmlcss: {
        expand: true,
        // current working directory
        cwd: 'client/views',
        // list of files to copy
        src: ['*.html'], // [*.*] copies all file extensions
        // destination for the files
        dest:'server/public/views/'
      }
    }, //end copy
    watch: {
      // what files am I looking at?
      files: ['client/**/*.*'],     // **/*.* means all folders and all files in those folders
      // what task should I run?
      tasks: ['babel', 'concat', 'uglify', 'copy']
    },
    babel: {
      options: {
        presets: ['babel-preset-env']
      },
      scripts: {
        files: [{
          expand: true,
          cwd: 'client/scripts/',
          src: '**/*.*',
          dest: 'temp',
          ext: '.js'
        }]
      }
    },
    concat: {
      options: {
        sourceMap: true
      },
      clientapp: {
        src: ['temp/client.js', 'temp/controllers/*.js', 'temp.services/*.js'],
        dest: 'temp/clientapp.js'
      }
    },
    uglify: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true,
        sourceMapIn: 'temp/clientapp.js.map'
      },
      files: {
        expand: true,
        cwd: 'temp',
        src: 'clientapp.js',
        dest: 'server/public/scripts/',
        ext: '.min.js'
      }
    }
  }); // end init config
  // LOAD PLUGIN: bring the plugin into the project
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['babel', 'concat', 'uglify', 'copy', 'watch']);
};
