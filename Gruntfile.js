module.exports = function( grunt ) {


    grunt.initConfig({

    // create css
    compass: {
      dist: {
        options: {
          config: 'config.rb',
          outputStyle: 'expanded',
          force: true,
          watch: true
        }
      }
    },

    concurrent: {
        target: {
            tasks: ['watch', 'compass'],
            options: {
                logConcurrentOutput: true
            }
        }
    },


    //minify js
    uglify: {
      dist: {
        files: {
          'assets/js/main.js': [ 'assets/js/main.js' ]
        }
      },
    },

    concat: {
        options: {
            separator: '\n'
        },
        dist: {
            src: [
              'assets/js/bower/**/*.js',
              'assets/js/bower/*.js',
              'assets/js/classes/*.js',
              'assets/js/main.dev.js'
            ],
            dest: 'assets/js/main.js'
        }
    },

    bower: {
      dev: {
        dest: 'assets/js/bower'
      }
    },

    //compile handlebars
    assemble: {
        options: {
            flatten: true,
            layout: 'assets/hbs/layouts/default.hbs',
            partials: 'assets/hbs/partials/*.hbs'
        },
        pages: {
            files: {
                'html': ['assets/hbs/pages/*.hbs', '!assets/hbs/pages/index.hbs']
            }
        },
        index: {
            files: {
                'html': ['assets/hbs/pages/index.hbs']
            }
        }
    },


    // watch our project for changes
    watch: {
      js: {
        files: [
          'assets/js/bower/**/*.js',
          'assets/js/bower/*.js',
          'assets/js/classes/*.js',
          'assets/js/main.dev.js'
        ],
        tasks: ['concat']
      },
      hbs: {
        files: [
          'assets/hbs/layouts/*.hbs',
          'assets/hbs/pages/*.hbs',
          'assets/hbs/partials/*.hbs',
        ],
        tasks: ['assemble']
      }
    },

  });

  // load tasks
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-watch-nospawn');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify' );
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-concurrent');

  
    // register task default task
  grunt.registerTask( 'default', function() {

       grunt.task.run([
        'bower',
        'newer:concat',
        'newer:assemble',
        'concurrent:target',
      ]);
  });

}