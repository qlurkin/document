#!/usr/bin/env -S node --no-warnings

import Prism from 'prismjs'
import NormalizeWhitespace from 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js'

const normalizer = new NormalizeWhitespace({
	'remove-trailing': true,
	'remove-indent': true,
	'left-trim': true,
	'right-trim': true,
	/*'break-lines': 80,
	'indent': 2,
	'remove-initial-line-feed': false,
	'tabs-to-spaces': 4,
	'spaces-to-tabs': 4*/
});

import loadLanguages from 'prismjs/components/index.js'
import jsdom from 'jsdom'
const JSDOM = jsdom.JSDOM
import fs from 'fs'
import path from 'path'
import { findLanguages, findCode, getLanguage } from './findLanguages.mjs'
import appRoot from 'app-root-path'
import MJPage from 'mathjax-node-page'
const mjpage = MJPage.mjpage

if(process.argv.length < 3) {
	console.log('Usage:\n\tbuild-document <html-file>\n')
	process.exit()
}

const documentPath = path.resolve(process.argv[2])
const documentContent = fs.readFileSync(documentPath, {encoding: 'utf8'})
const documentJSDOM = new JSDOM(documentContent)

const removeDocumentScript = (documentJSDOM) => {
    const document = documentJSDOM.window.document
    document.querySelector('script').remove()

    return Promise.resolve(documentJSDOM)
}

const addCSS = (documentJSDOM, cssPath) => {
    const document = documentJSDOM.window.document
    const styleElement = document.createElement('style')
    const styleContent = fs.readFileSync(cssPath)
    const styleTextNode = document.createTextNode(styleContent)
    styleElement.appendChild(styleTextNode)
    document.head.appendChild(styleElement)
    return Promise.resolve(documentJSDOM)
}

const formatCode = (documentJSDOM) => {
    const document = documentJSDOM.window.document
    return addCSS(documentJSDOM, path.join(appRoot.path, 'node_modules', 'prismjs', 'themes', 'prism.css'))
    .then((documentJSDOM) => {
        const document = documentJSDOM.window.document
        const languages = findLanguages(document)

        loadLanguages(languages)

        findCode(document).forEach(codeElement => {
            const parent = codeElement.parentNode
            const language = getLanguage(codeElement)
            const code = normalizer.normalize(codeElement.innerHTML)
            const html = Prism.highlight(code, Prism.languages[language], language)
            codeElement.classList.add(`language-${language}`)
            codeElement.classList.remove(`lang-${language}`)
            if(parent.tagName === 'PRE') {
                parent.classList.add(`language-${language}`)
                parent.innerHTML = `<code class=language-${language}>${html}</code>`
            }
            else {
                codeElement.innerHTML = `${html}`
            }
        })

        return Promise.resolve(documentJSDOM)
    })
}

const formatMath = (documentJSDOM) => {
    const mjpageConfig = {
        format: ["TeX"], // determines type of pre-processors to run
        output: 'svg', // global override for output option; 'svg', 'html' or 'mml'
        tex: {}, // configuration options for tex pre-processor, cf. lib/tex.js
        singleDollars: true, // allow single-dollar delimiter for inline TeX
        cssInline: true,  // determines whether inline css should be added
        displayMessages: false, // determines whether Message.Set() calls are logged
        displayErrors: false, // determines whether error messages are shown on the console
        undefinedCharError: false, // determines whether unknown characters are saved in the error array
        extensions: '', // a convenience option to add MathJax extensions
        fontURL: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/fonts/HTML-CSS', // for webfont urls in the CSS for HTML output
        MathJax: {}, // options MathJax configuration, see https://docs.mathjax.org
        errorHandler: (id, wrapperNode, sourceFormula, sourceFormat, errors) => {
            console.error(id, wrapperNode, sourceFormula, sourceFormat, errors)
        } // function to handle rendering error
    }

    const mjnodeConfig = {
        ex: 6, // ex-size in pixels
        width: 100, // width of math container (in ex) for linebreaking and tags
        useFontCache: true, // use <defs> and <use> in svg output?
        useGlobalCache: false, // use common <defs> for all equations?
        linebreaks: false, // do linebreaking?
        equationNumbers: "none", // or "AMS" or "all"
        math: "", // the math to typeset
        html: false, // generate HTML output?
        css: false, // generate CSS for HTML output?
        mml: false, // generate mml output?
        svg: false, // generate svg output?
        speakText: true, // add spoken annotations to output?
        timeout: 10 * 1000, // 10 second timeout before restarting MathJax
    }

    return new Promise((resolve) => {
        mjpage(documentJSDOM, mjpageConfig, mjnodeConfig, (documentJSDOM) => {
            resolve(documentJSDOM)
        })
    })
}

removeDocumentScript(documentJSDOM)
.then(documentJSDOM => addCSS(documentJSDOM, path.join(appRoot.path, 'document.css')))

.then(documentJSDOM => formatCode(documentJSDOM))
.then(documentJSDOM => formatMath(documentJSDOM))
.then(documentJSDOM => {
    // Send result to standard output
    console.log(documentJSDOM.window.document.documentElement.outerHTML)
})