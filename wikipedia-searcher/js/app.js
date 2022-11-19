const searchTermElem = document.querySelector('#searchTerm')
const searchResultElem = document.querySelector('#searchResult')

// As soon as the user gets in the page, searchElement receives focus
searchTermElem.focus()


searchTermElem.addEventListener('input', event => {
    search(event.target.value)
})

const debounce = (func, delay = 500) => {
    let timeoutId

    return (...args) => {
        if(timeoutId) clearInterval(timeoutId)

        timeoutId = setTimeout(() => {
            func.apply(null, args)
        }, delay)
    }
}

const search = debounce( async (searchTerm) => {
    try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info|extracts&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchTerm}`
        const response = await fetch(url)
        const searchResults = await response.json()
        console.log(searchResults)

        // render search result
        const searchResultHtml = generateHTML(searchResults.query.search, searchTerm)

        // add the search result to the searchResultElement
        searchResultElem.innerHTML = searchResultHtml
    } catch(error) {
        console.log(error)
    }
})

const stripHtml = html => {
    let div = document.createElement('div')
    div.textContent = html
    return div.textContent
}

const highlight = (srt, keyword, className = "highlight") => {
    const hl = `<span class="${className}">${keyword}</span>`

    // Uses the regular expression to replace all occurrences of the keyword by
    //the <span>
    return srt.replace(new RegExp(keyword, 'gi'), hl)
}

const generateHTML = (results, searchTerm) => {
    return results
        .map(result => {
            const title = highlight(stripHtml(result.title), searchTerm)
            const snippet = highlight(stripHtml(result.snippet), searchTerm)

            return `
<article>
    <a href="https://en.wikipedia.org/?curid=${result.pageid}">
        <h2>${title}</h2>
        <div class="summary">${snippet}</div>
    </a>
</article>
        `
    })
        .join('')
}



