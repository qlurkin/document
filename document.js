import './document.css'
import './prism.css'
import 'katex/dist/katex.css'
import renderMathInElement from 'katex/dist/contrib/auto-render.mjs'
import Prism from './prism.js'

window.addEventListener("DOMContentLoaded", (event) => {
	console.log("DOM Loaded and Parsed")
	Prism.highlightAll()
	renderMathInElement(document.body)
})
