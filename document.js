import { loadCSS, loadScript } from './helpers'
import { findLanguages } from './findLanguages.mjs'

const loadPrism = () => {
	const prismCdnUrl = language => `https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/components/prism-${language}.js`

	loadCSS('https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/themes/prism.min.css')
	loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/prism.min.js')
	.then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/plugins/normalize-whitespace/prism-normalize-whitespace.min.js'))
	.then(() => {
		const languages = findLanguages(document)
		console.log('languages:', languages)
		Promise.all(languages.map(language => 
			loadScript(prismCdnUrl(language)).catch(() => {console.log(`${language} not found`)}))
		).then(() => {
			console.log("languages loaded")
			Prism.highlightAll()
		})
	})
}

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


window.addEventListener("DOMContentLoaded", (event) => {
	console.log("DOM Loaded and Parsed")

	const documentJs = document.querySelector('script[src$="document.js"]').getAttribute("src")
	const documentJsRoot = documentJs.substring(0, documentJs.length-"document.js".length)
	console.log(documentJsRoot)
	loadCSS(documentJsRoot + 'document.css')

	if(document.querySelectorAll('[class*=lang]').length > 0)
		loadPrism()
	loadMathjax()
})