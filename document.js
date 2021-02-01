import { loadCSS, loadScript } from './helpers'
import loadMathjax from './loadMathjax'

const loadPrism = () => {
	console.log('Load Prism.js')
	loadCSS('https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism.min.css')
	loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/components/prism-core.min.js')
	.then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/plugins/normalize-whitespace/prism-normalize-whitespace.min.js'))
	.then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/plugins/autoloader/prism-autoloader.min.js'))
	.then(() => {
		Prism.highlightAll()
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