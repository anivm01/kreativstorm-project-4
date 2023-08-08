const currentOperandElement = document.querySelector(".current")
const previousOperandElement = document.querySelector(".previous")
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const clearButton = document.querySelector(".clear")
const toggleDecimal = document.querySelector(".toggle")
const percentage = document.querySelector(".percentage")
const equalsButton = document.querySelector(".equals")


let currentOperand = ""
let previousOperand = ""
let operation

const updateDisplay = () => {
    currentOperandElement.innerText = currentOperand
    previousOperandElement.innerText = previousOperand
}

const appendNumber = (number) => {
    if (number === '.' && currentOperand.includes('.')) {
        return
    }
    currentOperand = currentOperand.toString() + number.toString()
}

const chooseOperation = (operation) => {
    if (currentOperand === '') return
    if (previousOperand !== '') {
        compute()
    }
    operation = operation
    previousOperand = currentOperand
    currentOperand = ""
}

const compute = (firstOperant, operator, secondOperant) => {
    let computation
    if (isNaN(firstOperant) || isNaN(secondOperant)) return
    switch (operator) {
        case '+':
            computation = firstOperant + secondOperant
            break
        case '-':
            computation = firstOperant - secondOperant
            break
        case 'x':
            computation = firstOperant * secondOperant
            break
        case '÷':
            computation = firstOperant / secondOperant
            break
        default:
            return
    }
    return computation
}

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        appendNumber(number.innerText)
        updateDisplay()
    })
})

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        chooseOperation(operator.innerText)
        updateDisplay()
    })
})