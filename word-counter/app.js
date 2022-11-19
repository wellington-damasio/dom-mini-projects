class WordCounter {
    constructor(inputText) {
        this.inputText = inputText

        // When you use the arrow function, the 'this' value references the object
        //of the surrounding block which is the WordCounter in this case.
        // In other words, by using the arrow function you can access all the properties
        //and methods of the WordCounter class
        this.inputText.addEventListener('input', () => this.count())
    }

    count() {
        let wordStat = this.getWordStats(this.inputText.value.trim())
        this.emitEvent(wordStat)
    }

    emitEvent(wordStat) {
        let countEvent = new CustomEvent('count', {
            bubbles: true,
            cancelable: true,
            detail: { wordStat }
        })

        this.inputText.dispatchEvent(countEvent)
    }

    getWordStats(str) {
        let matches = str.match(/\S+/g)

        return {
            characters: str.length,
            words: matches ? matches.length : 0
        }
    }
}

const inputText = document.querySelector('#text')
const statElement = document.querySelector('#stat')

new WordCounter(inputText)

const render = event => {
    statElement.innerHTML = `
<small id="stat">You've written
    <span class="bold">${event.detail.wordStat.words} words</span> and 
    <span class="bold">${event.detail.wordStat.characters} characters</span>.
</small>`
}

inputText.addEventListener('count', render)