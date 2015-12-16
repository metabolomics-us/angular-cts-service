module.exports = function (grunt) {

	grunt.initConfig({

		clean: {
			before: ['service.min.js']
		},

		ngAnnotate: {
			dist: {
				options: {
					singleQuotes: true
				},
				files: {
					'service.js' : ['service.js']
				}
			}
		},

		uglify: {
			dist: {
				files: {
					'service.min.js': ['service.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', ['clean:before', 'ngAnnotate', 'uglify']);

};