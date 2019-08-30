import './document.css'
import './prism.css'
import Prism from './prism.js'

// Linking katex CSS
const link = document.createElement('link')
link.setAttribute("rel", "stylesheet")
link.setAttribute("href", "https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css")
document.head.insertBefore(link , null)

// Load katex script
const katexScriptLoaded = new Promise(resolve => {
	const script = document.createElement('script')
	script.onload = () => {
		resolve()
	}
	script.setAttribute("src", "https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.js")
	document.head.insertBefore(script , null)
})


// Load katex autorender script
const katexAutoLoaded = new Promise(resolve => {
	const auto = document.createElement('script')
	auto.onload = () => {
		resolve()
	}
	auto.setAttribute("src", "https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/contrib/auto-render.min.js")
	document.head.insertBefore(auto , null)
})

Promise.all([katexScriptLoaded, katexAutoLoaded]).then(() => {
	renderMathInElement(document.body);
})

window.addEventListener("DOMContentLoaded", (event) => {
	console.log("DOM Loaded and Parsed")
	Prism.highlightAll()
})
