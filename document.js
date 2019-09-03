import './document.css'
import './prism.css'
import Prism from './prism.js'
import { loadCSS, loadScript } from './helpers.js'

loadCSS("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css")

const scripts = []

scripts.push(loadScript("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js"))
scripts.push(loadScript("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/contrib/auto-render.min.js"))

Promise.all(scripts).then(() => {
	renderMathInElement(document.body);
})

window.addEventListener("DOMContentLoaded", (event) => {
	console.log("DOM Loaded and Parsed")
	Prism.highlightAll()
})
