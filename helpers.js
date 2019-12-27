export const loadScript = url => new Promise((resolve, reject) => {
	const script = document.createElement('script')
	script.async = true
	script.onload = () => {
		resolve()
	}
	script.onerror = () => {
		reject()
	}
	script.setAttribute("src", url)
	document.head.insertBefore(script , null)
})

export const loadCSS = url => new Promise(resolve => {
	const link = document.createElement('link')
	link.onload = () => {
		resolve()
	}
	link.setAttribute("rel", "stylesheet")
	link.setAttribute("href", url)
	document.head.insertBefore(link , null)
})