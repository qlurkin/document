import resolve from 'rollup-plugin-node-resolve'
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
			})
		]
	}
]