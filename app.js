const billEl = document.querySelector('.bill-input')
let bill;

const tipButtonEl = document.querySelectorAll('.tip__button')
let tipPercentage;
let tipChosen = false

const peopleEl = document.querySelector('.people-input')
const peopleElLabel = document.querySelector('.people__label')
let peopleNumber;



let tipAmountEl = document.getElementById('tip-amount')
let totalAmountEl = document.getElementById('total-amount')
let tipAmount;
let totalAmount;

function render() {
    tipAmount = (bill * tipPercentage) / peopleNumber
    if (tipAmount) {
        tipAmountEl.textContent = `$${tipAmount.toFixed(2)}`
    } else {
        tipAmountEl.textContent = `$0.00`
    }

    totalAmount = (bill + tipAmount) / peopleNumber
    if (totalAmount) {
        totalAmountEl.textContent = `$${totalAmount.toFixed(2)}`
    } else {
        totalAmountEl.textContent = `$0.00` 
    }
}

billEl.addEventListener('change', () => {
    bill = parseInt(billEl.value)
    console.log(bill)
    if (peopleNumber && tipPercentage) {
        render()
    }
})

peopleEl.addEventListener('change', () => {
    if (peopleEl.value != 0) {
        peopleEl.classList.remove('error-input')
        peopleElLabel.innerHTML = `Number of people`
        peopleNumber = parseInt(peopleEl.value)
        if(bill && tipPercentage) {
            render()
        }
    } else {
        peopleEl.classList += ' error-input'
        peopleElLabel.innerHTML += `<span class="error">Can't be zero</span>`
    }
})

for (let i = 0; i < tipButtonEl.length; ++i) {
    if (i === tipButtonEl.length -1) {
        tipButtonEl[i].addEventListener('change', () => {
            if (tipChosen) {
                tipButtonEl.forEach(button => button.classList.remove('tip__chosen'))
                tipPercentage = parseInt(tipButtonEl[i].value) / 100
                tipButtonEl[i].classList += ' tip__chosen'
                if (bill && peopleNumber) {
                    render()
                }
            } else {
                tipPercentage = parseInt(tipButtonEl[i].value) / 100
                tipButtonEl[i].classList += ' tip__chosen'
                tipChosen = true
                if (bill && peopleNumber) {
                    render()
                }
            }
        })
    } else {
        tipButtonEl[i].addEventListener('click', () => {
            if (tipChosen) {
                tipButtonEl.forEach(button => button.classList.remove('tip__chosen'))
                tipButtonEl[i].classList += ' tip__chosen'
                tipPercentage = parseInt(tipButtonEl[i].value) / 100
                if (bill && peopleNumber) {
                    render()
                }
            } else {
                tipButtonEl[i].classList += ' tip__chosen'
                tipPercentage = parseInt(tipButtonEl[i].value) / 100
                tipChosen = true
                if (bill && peopleNumber) {
                    render()
                }
            }
        })
    }
}

function resetBill () {
    tipButtonEl.forEach(button => button.classList.remove('tip__chosen'))
    tipChosen = false
    bill = null
    tipPercentage = null
    peopleNumber = null
    billEl.value = null
    peopleEl.value = null
    tipAmountEl.textContent = `$0.00`
    totalAmountEl.textContent = `$0.00`
    tipAmount = 0;
    totalAmount = 0;
}