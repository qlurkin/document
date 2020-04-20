

const normalizeWhiteSpace = () => new Promise((resolve, reject) => {
    document.querySelectorAll('pre').forEach(pre => {
        if(pre.children[0] && pre.children[0].tagName == 'CODE') {
            pre.classList.add("prettyprint")
            const oldCodeElement = pre.children[0]
            
            // Clean PRE
            pre.removeChild(oldCodeElement)
            pre.innerHTML = ''
            
            const code = oldCodeElement.childNodes[0].wholeText
            const lines = code.split('\n')
            
            // Remove blank lines top and bottom
            while(lines[0].trim().length === 0) {
                lines.shift()
            }
            while(lines[lines.length-1].trim().length === 0) {
                lines.pop()
            }

            // Remove indent
            const indent = lines[0].length - lines[0].trimStart().length
            for(let i=0; i<lines.length; i++) {
                lines[i] = lines[i].slice(indent)
            }
            
            // Create new Elements
            const newCodeElement = document.createElement("code")
            newCodeElement.setAttribute('class', oldCodeElement.getAttribute('class'))
            newCodeElement.appendChild(document.createTextNode(lines.join('\n')))
            pre.appendChild(newCodeElement)
        } 
    })

    resolve()
})

export default normalizeWhiteSpace