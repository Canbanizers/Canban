module.exports = function(grunt) {
	'use strict';
	//All grunt related functions

	grunt.initConfig({
		jshint          : {
			files  : ['gruntfile.js', 'app/controllers/*.js', 'app/*.js', 'app/routes/*.js', 'app/models/*.js'],
			options: {
				eqeqeq      : true,
				eqnull      : true,
				latedef     : true,
				undef       : true,
				globalstrict: true,
				force       : true,
				globals     : {
					jQuery  : true,
					console : true,
					window  : true,
					module  : true,
					document: true,
					Ember   : true,
					$       : true,
					App     : true,
					DS      : true
				}
			}
		},
		concat          : {
			vendor: {
				src : ['app/lib/handlebars-1.3.0.js', 'app/lib/ember-1.4.0.js', 'app/lib/ember-data-1.0.0b7.js',
					   'app/lib/ls_rest_adapter.js', 'app/lib/moment-with-langs-2.5.1.js'],
				dest: 'debug/lib.js'
			},
			app   : {
				src : ['app/app.js', 'app/transforms/*.js', 'debug/templates.js', 'app/controllers/*.js',
					   'app/views/*.js', 'app/routes/*.js', 'app/models/*.js', 'app/helpers/*.js',
					   'app/transforms/*.js', 'app/adapters/*.js'
				],
				dest: 'debug/app.js'
			}
		},
		less            : {
			css: {
				files: {
					'debug/css/app.css': ['app/css/styles.less']
				}
			}
		},
		ember_handlebars: {
			compile: {
				options: {
					processName: function(fileName) {
						var arr = fileName.split("."), path = arr[arr.length - 2].split("/"), name = path[path.length -
																										  1];
						if (path.length === 4) {
							if (!(name == path[2])) {
								name = path[2] + "/" + name
							}
						}
						return name;
					}
				},
				files  : {
					"debug/templates.js": ["app/templates/*.hbs", "app/templates/*/*.hbs"]
				}
			}
		},
		clean           : ["debug/img/", "release/img/", "debug/fonts/", "release/fonts/"],
		copy            : {
			main: {
				files: [
					{
						expand: true,
						cwd   : 'app/img/',
						src   : ['**'],
						dest  : 'debug/img/'
					},
					{
						expand: true,
						cwd   : 'app/img/',
						src   : ['**'],
						dest  : 'release/img/'
					},
					{
						expand: true,
						cwd   : 'app/fonts/',
						src   : ['**'],
						dest  : 'debug/fonts/'
					},
					{
						expand: true,
						cwd   : 'app/fonts/',
						src   : ['**'],
						dest  : 'release/fonts/'
					}
				]
			}
		},
		uglify          : {
			build: {
				files: {
					"release/lib.min.js": ['debug/lib.js'],
					"release/app.min.js": ['debug/app.js']
				}
			}
		},
		cssmin          : {
			compress: {
				files: {
					"release/css/app.min.css": ["debug/css/app.css"]
				}
			}
		},
		watch           : {
			scripts: {
				files  : ['app/lib/*.js', 'app/*.js', 'app/controllers/*.js', 'app/views/*.js', 'app/routes/*.js',
						  'app/models/*.js', 'app/css/*.less', 'app/templates/**/*.hbs', 'app/transforms/*.js',
						  'app/adapters/*.js'],
				tasks  : ['ember_handlebars', 'concat', 'less'],
				options: {
					debounceDelay: 100
				}
			},
			images : {
				files  : ['app/img/*', 'app/fonts/*'],
				tasks  : ['clean', 'copy'],
				options: {
					debounceDelay: 100
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-ember-handlebars');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-qunit');

	grunt.registerTask('default', ['ember_handlebars', 'concat', 'less', 'clean', 'copy', 'watch']);
	grunt.registerTask('release', ['jshint', 'uglify', 'cssmin', 'clean', 'copy']);
};