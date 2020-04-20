import { loadScript } from './helpers'

const loadMathjax = () => {
	window.MathJax = {
		loader: {
			load: ['input/tex', 'output/svg']
		},
		tex: {},
		svg: {}
	};
	loadScript('https://polyfill.io/v3/polyfill.min.js?features=es6')
	.then(() => loadScript('https://cdn.jsdelivr.net/npm/mathjax@3.0.0/es5/startup.js'))
}

export default loadMathjax