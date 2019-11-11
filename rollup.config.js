import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import babel from 'rollup-plugin-babel'
const importUrl = require('postcss-import-url');
const url = require("postcss-url")

const urlOptions = [
	{
		url: 'inline'
	}
]

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
				plugins: [importUrl({modernBrowser: true}), url({url: 'inline'})]
			})
		]
	}
]