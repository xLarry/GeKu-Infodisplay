module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        clean: {
            frontend: {
                src: ['frontend/**/*.*']
            }
        },

        babel: {
            options: {
                sourceMap: true,
                presets: ['babel-preset-es2015']
            },
            dist: {
                files: {
                    'frontend/js/app-complete.js': 'frontend/js/app-complete.js'
                }
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
                        'node_modules/angular-socket-io/socket.js',
                        'node_modules/moment/moment.js',
                        'node_modules/moment/locale/de.js',
                        'node_modules/rx/dist/rx.all.js',
                        'node_modules/rx-angular/dist/rx.angular.js',
                        'frontend-src/js/lib/skycons.js',
                        'node_modules/socket.io-client/socket.io.js'
                    ],
                    'frontend/js/app-complete.js': [
                        'frontend-src/js/app.js',
                        'frontend-src/js/**/*.js'
                    ]
                }
            }
        },

        sass: {
            options: {
                style: 'expanded',
                precision: 8,
                includePaths: ['node_modules/bootstrap-sass/assets/stylesheets/'],
                sourceMap: true
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
                        src: ['**/*.html', 'fonts/*.*', 'img/*.*', 'css/*.css'],
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
                tasks: ['concat','babel']
            },
            html: {
                files: ['frontend-src/**/*.html'],
                tasks: ['copy']
            }
        }

    });

    // Default task(s).
    grunt.registerTask('default', ['clean', 'concat', 'sass', 'copy', 'babel']);

};