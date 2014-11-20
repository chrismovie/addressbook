module.exports = function (grunt) {

  grunt.initConfig({

    // clean out public/dist/ before copying new files
    clean: {
      options: {
        force: true
      },
      dist: [
        'public/scripts', 
        'public/styles'
      ]
    },

    // precompile less into CSS
    less: {
      main: {
        options: {
          paths: ['styles/**/*.less'],
          strictImports: true,
        },
        files: {
          'public/styles/main.css': [ 'styles/main.less' ]
        }
      }
    },

    // Minify js
    uglify: {
      options: {
        mangle: false,
        compress: false,
        preserveComments: false
      },
      prod: {
        files: {
          'public/scripts/main.min.js': [
            'bower_components/underscore/underscore-min.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/angular/angular.min.js',
            'bower_components/angular-resource/angular-resource.min.js',
            'bower_components/angular-route/angular-route.min.js',
            'bower_components/angular-sanitize/angular-sanitize.min.js',
            'bower_components/angular-cookies/angular-cookies.min.js',
            'bower_components/angular-touch/angular-touch.js',
            'scripts/lib/**/*.js',
            'scripts/appconfig.js',
            'scripts/routes.js',
            'scripts/controllers.js',
            'scripts/directives.js',
            'scripts/services.js'
          ]
        }
      }
    },

    // minify all less files
    cssmin: {
      main: {
        src: ['public/styles/main.css'],
        dest: 'public/styles/main.min.css'
      }
    },

    jasmine: {
      app: {
        src: ["scripts/**/*.js"],
        options: {
          vendor: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/angular-cookies/angular-cookies.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-touch/angular-touch.js',
            'scripts/lib/**/*.js'
          ],
          helpers: [
            'bower_components/jasmine-jquery/lib/jasmine-jquery.js'/*,
            'app/scripts/jasmine/fakeResponses.js',
            'app/scripts/jasmine/jasmine-setup.js'*/
          ],
          specs: ["scripts/tests/**/*_spec.js"],
          host: "http://localhost:3000/",
          keepRunner: true,
          outfile: "scripts/tests/jasmine/SpecRunner.html"
          // http://localhost:3001/app/scripts/jasmine/SpecRunner.html
        }
      }
    },

    // connect
    connect: {
      server: {
        options: {
          port: 3001
        }
      },
      keepalive: {
        options: {
          keepalive: true,
          port: 3001
        }
      }
    },

    // watch
    watch: {
      main: {
        files: [
          'styles/**/*.less',
          'scripts/**/*.js'
        ],
        tasks: ['clean', 'less', 'uglify', 'cssmin', 'connect:server', 'jasmine:app', 'jshint'] 
      }
    },

    // jshint for js linting
    jshint: {
      app: {
        options: {
          browser:true,
          curly: true,
          eqeqeq: true,
          eqnull: true,
          forin: true,
          latedef: true,
          newcap: true,
          noempty: true,
          nonew: true,
          plusplus: true,
          undef: false,
          eqnull: true,
          quotmark: 'single',
          globals: {
            jQuery: true,
            angular: true,
            sharedScopeVariables: true,
          }
        },
        files: {
          src: ['server.js', 'app/scripts/**/*.js', '!app/scripts/src/plugins/**/*.js',]
        }
      }
    }

  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['clean', 'less', 'uglify', 'cssmin', 'connect:server', 'jasmine', 'jshint']);
  grunt.registerTask('production', ['clean', 'less', 'uglify', 'cssmin']);
};