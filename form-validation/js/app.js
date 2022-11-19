const usernameElem = document.querySelector('#username')
const emailElem = document.querySelector('#email')
const passwordElem = document.querySelector('#password')
const confirmPasswordElem = document.querySelector('#confirm-password')
const form = document.querySelector('.sign-up-form')

// -------------------------------------------------
//                  Utility Functions
// -------------------------------------------------

const isRequired = value => value === '' ? false : true

const isBetween = (length, min, max) => length < min || length > max ? false : true

const isValidEmail = email => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return regEx.test(email)
}

const isPasswordSecure = password => {
    // ^                | The password starts
    // (?=.*[a-z])      | The password contain at least one lowercase character
    // (?=.*[A-Z])      | The password contain at least one uppercase character
    // (?=.*[0-9])      | The password contain at least one number
    // (?=.*[!@#$%^&*]) | The password contain at least one special character
    // (?=.{8,})        | The password is at least 8 characters long
    const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    return regEx.test(password)
}

// -------------------------------------------------
//               Show Error and Success 
// -------------------------------------------------

const showError = (input, message) => {
    const formField = input.parentElement

    formField.classList.remove('success')
    formField.classList.add('error')

    const errorContainer = formField.querySelector('small')
    errorContainer.textContent = message
}

const showSuccess = (input, message) => {
    const formField = input.parentElement

    formField.classList.remove('error')
    formField.classList.add('success')

    const errorContainer = formField.querySelector('small')
    errorContainer.textContent = ''
}

// -------------------------------------------------
//                Validating Username
// -------------------------------------------------
const checkUsername = () => {
    let valid = false

    const min = 3
    const max = 25

    const username = usernameElem.value.trim()

    if (!isRequired(username)) {
        showError(usernameElem, 'Username cannot be blank')
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameElem, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameElem)
        valid = true
    }

    return valid
}

// -------------------------------------------------
//                 Validating Email
// -------------------------------------------------
const checkEmail = () => {
    let valid = false

    const email = emailElem.value.trim()

    if (!isRequired(email)) {
        showError(emailElem, 'Email cannot be blank')
    } else if (!isValidEmail(email)) {
        showError(emailElem, 'Email is not valid')
    } else {
        showSuccess(emailElem)
        valid = true
    }

    return valid
}

// -------------------------------------------------
//                Validating Password
// -------------------------------------------------
const checkPassword = () => {
    let valid =  false

    const password = passwordElem.value.trim()

    if (!isRequired(password)) {
        showError(passwordElem, 'Password cannot be blank')
    } else if (!isPasswordSecure(password)) {
        showError(passwordElem, 'Password must has at least 8 characters that include at least 1 lowecase character, 1 uppercase character, 1 number, and 1 special character in (!@#$%^&*)')
    } else {
        showSuccess(passwordElem)
        valid = true
    }

    return valid
} 

// -------------------------------------------------
//            Validating Confirm Password
// -------------------------------------------------
const checkConfirmPassword = () => {
    let valid = false

    const password = passwordElem.value.trim()
    const confirmPassword = confirmPasswordElem.value.trim()

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordElem, 'Please enter the password again')
    } else if (password !== confirmPassword) {
        showError(confirmPasswordElem, 'Confirm password does not match')
    } else {
        showSuccess(confirmPasswordElem)
        valid = true
    }

    return valid
}

form.addEventListener('submit', event => {
    event.preventDefault()

    let isUsernameValid = checkUsername(),
        isValidEmail = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword()

    let isFormValid = isUsernameValid &&
        isValidEmail &&
        isPasswordValid &&
        isConfirmPasswordValid

    if (isFormValid) {
        alert('Your subscription was sent to the server!')
    }
})

// -------------------------------------------------
//              Adding Instatnt Feedback 
// -------------------------------------------------
// Debounce Function
const debounce = (func, delay = 500) => {
    let timeoutId

    // cancel the previous timer
    return (...args) => {
        clearTimeout(timeoutId)

        // setup a new timer
        setTimeout(() => {
            func.apply(null, args)
        }, delay);
    }
}

const checkInputs = event => {
    switch(event.target.id) {
        case 'username':
            checkUsername()
            break
        case 'email':
            checkEmail()
            break
        case 'password':
            checkPassword()
            break
        case 'confirm-password':
            checkConfirmPassword()
            break
    }
}

form.addEventListener('input', debounce(checkInputs))
