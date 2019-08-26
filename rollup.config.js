import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import babel from 'rollup-plugin-babel'

export default [
	{
		input: 'document.js',
		output: {
			file: 'dist/document.js',
			format: 'iife'
		},
		plugins: [ 
			resolve(),
			babel({
				exclude: 'node_modules/**'
			}),
			postcss({
				plugins: []
			})
		]
	}
]