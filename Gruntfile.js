module.exports = function( grunt ) {

	// Load all tasks
	require( 'load-grunt-tasks' )( grunt );

	// Show elapsed time
	require( 'time-grunt' )( grunt );

	var jsFileList = [
		'assets/js/scripts.js'
	];

	grunt.initConfig({

		pkg: grunt.file.readJSON( 'package.json' ),


		sass: {
			dev: {
				files: {
					'assets/css/main.css':'assets/scss/main.scss',
				},
				options: {
					style: 'extended',
					precision: 7,
					sourceMap: false,
					sourceMapEmbed: false
				}
			},
			build: {
				files: {
					'assets/css/main.css':'assets/scss/main.scss',
				},
				options: {
					style: 'compressed',
					precision: 7,
					sourceMap: false,
					sourceMapEmbed: false
				}
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: [jsFileList],
				dest: 'assets/js/scripts.js',
			},
		},
		uglify: {
			dist: {
				files: {
					'assets/js/scripts.min.js': 'assets/js/scripts.js'
				}
			}
		},
		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer-core')({
						browsers: ['last 2 versions', 'ie 9', 'ie 10', 'android 4.3', 'android 4.4', 'firefox 34', 'firefox 35', 'opera 27', 'opera 26']
					})
				]
			},
			dev: {
				options: {
					map: false,
				},
				src: ['assets/css/main.css']
			},
			build: {
				src: ['assets/css/main.css']
			}
		},
		modernizr: {
			build: {
				devFile		: 'bower_components/modernizr/modernizr.js',
				outputFile	: 'assets/js/vendor/modernizr.min.js',
				files 		: {
					'src': [
						['assets/js/scripts.min.js'],
						['assets/css/main.css']
					]
				},
				extra		: {
					shiv		: false,
					printshiv	: false,
					load		: true,
					mq			: false,
					cssclasses	: true
				},
				uglify		: true,
				parseFiles	: true
			}
		},
		simple_include: {

			options: {

				stripPrefix: '_',

			},
			dev: {

				src: ['assets/js/_main.js'],
      			dest: 'assets/js/'

			},

		},
		watch: {
			sass: {
				files: [
					'*.scss',
					'**/*.scss'
				],
				tasks: ['sass:dev', 'postcss:dev']
			}
		},
		browserSync: {
		    dev: {
		        bsFiles: {

		            src : [
                        'assets/css/*.css',
                        'assets/js/*.js',
                        '*.html'
                    ],

		        },
		        options: {
		            proxy: "sandbox.localhost",
		            watchTask: true,
		        }
		    }
		},
	});

	// Register tasks
	grunt.registerTask('default', [
		'dev'
	]);
	grunt.registerTask('dev', [
		'sass:dev',
		'postcss:dev',
		'simple_include',
		'concat',
		'browserSync',
		'watch',
	]);
	grunt.registerTask('build', [
		'sass:build',
		'postcss:build',
		'simple_include',
		'concat',
		'uglify',
		'modernizr',
	]);
};