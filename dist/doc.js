(function () {
	'use strict';

	const loadScript = url => new Promise((resolve, reject) => {
	  const script = document.createElement('script');
	  script.async = true;

	  script.onload = () => {
	    resolve();
	  };

	  script.onerror = () => {
	    reject();
	  };

	  script.setAttribute("src", url);
	  document.head.insertBefore(script, null);
	});
	const loadCSS = url => new Promise(resolve => {
	  const link = document.createElement('link');

	  link.onload = () => {
	    resolve();
	  };

	  link.setAttribute("rel", "stylesheet");
	  link.setAttribute("href", url);
	  document.head.insertBefore(link, null);
	});

	const loadMathjax = () => {
	  window.MathJax = {
	    loader: {
	      load: ['input/tex', 'output/svg']
	    },
	    tex: {},
	    svg: {}
	  };
	  loadScript('https://polyfill.io/v3/polyfill.min.js?features=es6').then(() => loadScript('https://cdn.jsdelivr.net/npm/mathjax@3.0.0/es5/startup.js'));
	};

	const normalizeWhiteSpace = () => new Promise((resolve, reject) => {
	  document.querySelectorAll('pre').forEach(pre => {
	    if (pre.children[0] && pre.children[0].tagName == 'CODE') {
	      pre.classList.add("prettyprint");
	      const oldCodeElement = pre.children[0]; // Clean PRE

	      pre.removeChild(oldCodeElement);
	      pre.innerHTML = '';
	      const code = oldCodeElement.childNodes[0].wholeText;
	      const lines = code.split('\n'); // Remove blank lines top and bottom

	      while (lines[0].trim().length === 0) {
	        lines.shift();
	      }

	      while (lines[lines.length - 1].trim().length === 0) {
	        lines.pop();
	      } // Remove indent


	      const indent = lines[0].length - lines[0].trimStart().length;

	      for (let i = 0; i < lines.length; i++) {
	        lines[i] = lines[i].slice(indent);
	      } // Create new Elements


	      const newCodeElement = document.createElement("code");
	      newCodeElement.setAttribute('class', oldCodeElement.getAttribute('class'));
	      newCodeElement.appendChild(document.createTextNode(lines.join('\n')));
	      pre.appendChild(newCodeElement);
	    }
	  });
	  resolve();
	});

	window.addEventListener("DOMContentLoaded", event => {
	  console.log("DOM Loaded and Parsed");
	  const documentJs = document.querySelector('script[src$="doc.js"]').getAttribute("src");
	  const documentJsRoot = documentJs.substring(0, documentJs.length - "document.js".length);
	  console.log(documentJsRoot);
	  loadCSS(documentJsRoot + 'document.css');
	  loadCSS(documentJsRoot + 'atelier-estuary-light.css');
	  normalizeWhiteSpace().then(() => {
	    loadScript('https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js');
	  });
	  loadMathjax();
	});

}());
