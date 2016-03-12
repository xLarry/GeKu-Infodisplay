module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        clean: {
            frontend: {
                src: ['frontend/**/*.*']
            }
        },

        concat: {
            options: {
                separator: '\n\n\n'
            },
            frontend: {
                files: {
                    'frontend/js/libraries.js': [
                        'node_modules/jquery/dist/jquery.js',
                        'node_modules/angular/angular.js',
                        'node_modules/angular-resource/angular-resource.min.js',
                        'node_modules/moment/moment.js',
                        'node_modules/moment/locale/de.js'
                    ],
                    'frontend/js/app-complete.js': [
                        'frontend-src/js/app.js',
                        'frontend-src/js/**/*.*'
                    ]
                }
            }
        },

        sass: {
            options: {
                style: 'expanded',
                lineNumbers: true,
                precision: 8,
                loadPath: 'node_modules/bootstrap-sass/assets/stylesheets/',
                sourcemap: 'none'
            },
            frontend: {
                files: {
                    'frontend/css/bootstrap.css': ['frontend-src/css/bootstrap.scss'],
                    'frontend/css/style.css': ['frontend-src/css/style.scss']
                }
            }
        },

        copy: {
            frontend: {
                files: [
                    {
                        expand: true,
                        cwd: 'frontend-src',
                        src: ['**/*.html'],
                        dest: 'frontend/'
                    }
                ]
            }
        },

        watch: {
            options: {
                spawn: false,
                livereload: true
            },
            css: {
                files: ['frontend-src/css/**/*.*'],
                tasks: ['sass']
            },
            js: {
                files: ['frontend-src/js/**/*.*'],
                tasks: ['concat']
            },
            html: {
                files: ['frontend-src/**/*.html'],
                tasks: ['copy']
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'concat', 'sass', 'copy']);

};