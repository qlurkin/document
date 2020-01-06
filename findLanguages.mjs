export const getLanguage = (element) => {
    let language = null
    element.classList.forEach((className) => {
        const re = /(lang-|language-)(\w+)/
        language = className.replace(re, '$2') 
    })
    return language
}

export const findCode = (document) => {
    return document.querySelectorAll('code[class*=lang]')
}

export const findLanguages = (document) => {
    const languages = []
    findCode(document).forEach((element) => {
        const language = getLanguage(element)
        if(language) {
            languages.push(language)
        }
    })
    return [...new Set(languages)]
}