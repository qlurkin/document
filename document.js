import { loadCSS, loadScript } from './helpers'
import { findLanguages } from './findLanguages.mjs'
import loadMathjax from './loadMathjax'

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