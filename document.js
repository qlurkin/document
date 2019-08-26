import './document.css'
import './prism.css'
import Prism from './prism.js'

window.addEventListener("DOMContentLoaded", (event) => {
	console.log("DOM Loaded and Parsed")
	Prism.highlightAll()
})
