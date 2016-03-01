module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        clean: {
            frontend: {
                src: ['frontend/vendor/**/*.*']
            }
        },

        copy: {
            frontend: {
                files: {
                    'frontend/vendor/js/angular.js': ['node_modules/angular/angular.js'],
                    'frontend/vendor/js/jquery.js': ['node_modules/jquery/dist/jquery.js'],
                    'frontend/vendor/css/bootstrap.css': ['node_modules/bootstrap/dist/css/bootstrap.css']
                }
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'copy']);

};