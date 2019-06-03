import './document.css'
import Prism from 'prismjs'

// Linking CSS
const script = document.querySelector('script[src$="document.js"]')
const href = script.attributes['src'].value.slice(0, -2) + 'css'
const link = document.createElement('link')
link.setAttribute("rel", "stylesheet")
link.setAttribute("href", href)
document.head.insertBefore(link , null)

window.addEventListener("DOMContentLoaded", (event) => {
	console.log("DOM Loaded and Parsed")
	Prism.highlightAll()
})
