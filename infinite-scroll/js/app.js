(function() {
    const quotesElem = document.querySelector('.quotes')
    const loader = document.querySelector('.loader')
    
    const getQuotes = async (page, limit) => {
        const API_URL = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=${limit}`
        const response = await fetch(API_URL)
    
        if(!response.ok) {
            throw new Error(`An error occurred: ${response.status}`)
        }
    
        return await response.json()
    }
    
    const showQuotes = quotes => {
        quotes.forEach(quote => {
            const quoteElem = document.createElement('blockquote')
            quoteElem.classList.add('quote')
    
            quoteElem.innerHTML = `
                <span>${quote.id})</span>
                ${quote.quote}
                <footer>${quote.author}</footer>
            `
    
            quotesElem.appendChild(quoteElem)
        })
    }
    
    // -----------------------------------------------------------
    //           Show/Hide Loading Indicator Functions
    // -----------------------------------------------------------
    const hideLoader = () => {
        loader.classList.remove('show')
    }
    
    const showLoader = () => {
        loader.classList.add('show')
    }
    
    // -----------------------------------------------------------
    //                  Defining Control Variables
    // -----------------------------------------------------------
    let currentPage = 1
    let limit = 10
    let total = 0
    
    // -----------------------------------------------------------
    //               Finding If Page Has More Quotes
    // -----------------------------------------------------------
    const hasMoreQuotes = (page, limit, total) => {
        const startIndex = (page - 1) * limit + 1
        return total === 0 || startIndex < total
    }
    
    
    // -----------------------------------------------------------
    //                         Loading Quotes
    // -----------------------------------------------------------
    const loadQuotes = async (page, limit) => {
        showLoader()
    
        setTimeout(async () => {
            try {
                if(hasMoreQuotes(page, limit, total)) {
                    const response = await getQuotes(page, limit)
                    
                    showQuotes(response.data)
    
                    total = response.total
                }
            } catch(error) {
                console.log(error.message)
            } finally {
                hideLoader()
            }
        }, 500)
    }
    
    // -----------------------------------------------------------
    //                    Attach the Scroll Event
    // -----------------------------------------------------------
    window.addEventListener('scroll', () => {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement
    
        if(scrollTop + clientHeight >= scrollHeight - 5 &&
        hasMoreQuotes(currentPage, limit, total)) {
            currentPage++
            loadQuotes(currentPage, limit)    
        }
    }, { passive: true })
    
    loadQuotes(currentPage, limit)
})()