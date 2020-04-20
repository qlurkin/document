import { loadCSS, loadScript } from './helpers'
import loadMathjax from './loadMathjax'
import normalizeWhiteSpace from './normalizeWhiteSpace'

window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM Loaded and Parsed")

    const documentJs = document.querySelector('script[src$="doc.js"]').getAttribute("src")
	const documentJsRoot = documentJs.substring(0, documentJs.length-"document.js".length)
	console.log(documentJsRoot)
    loadCSS(documentJsRoot + 'document.css')
    loadCSS(documentJsRoot + 'atelier-estuary-light.css')
    
    normalizeWhiteSpace().then(() => {
        loadScript('https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js')
    })

    loadMathjax()
})