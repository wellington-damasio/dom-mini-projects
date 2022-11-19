// ## The Date Object

// The Date object represents a single moment in time. It contains a number that
//represents the milliseconds since January 1, 1970 UTC.

// ## Create a new Date
const now = new Date()

// ## Get the number of milliseconds since Jan 1, 1970
const time = now.getTime()

// ## Create a new Date object with a specified date and time
const d = new Date('February 02, 2023 17:40:15')
console.log(d.getTime())

// ## Calculate the difference between two times
const d1 = new Date('January 13, 2023 19:00:00')
const d2 = new Date('January 13, 2024 19:00:00')
console.log(d2.getTime() - d1.getTime())

// ## Calculate remaining time
const newTime = 150000
console.log('newTime: ' + newTime + 'ms')
console.log('newTimes: ' + (newTime / 1000 / 60) + 'min')
console.log('newTimes (remaining minutes): ' + Math.floor(newTime / 1000 / 60) + 'min')
console.log('newTimes (remaining seconds) : ' + Math.floor(newTime / 1000) % 60 + 'sec')

document.body.addEventListener('click', () => {
    console.log(now)
    console.log(time)
})
