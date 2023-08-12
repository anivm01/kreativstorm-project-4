const inputElement = document.querySelector(".current")
const fullOperationElement = document.querySelector(".previous")
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const clearButton = document.querySelector(".clear")
const toggleSign = document.querySelector(".toggle")
const percentage = document.querySelector(".percentage")
const equalsButton = document.querySelector(".equals")

const fullOperation = {
    prev: "",
    current: "",
    operation: ""
}

const clear = () => {
    fullOperation.prev = ""
    fullOperation.current = ""
    fullOperation.operation = ""
    return
}

const backspace = () => {
    let input = fullOperation.current.toString()
    if (input === "") {
        return
    }
    input = input.slice(0, -1)
    if (input.length === 0) {
        fullOperation.current = ""
        return
    }
    fullOperation.current = parseFloat(input)
    return
}

const updateDisplay = () => {
    inputElement.innerText = fullOperation.current.toString()
    fullOperationElement.innerText = fullOperation.prev.toString() + (fullOperation.operation.toString() !== "" ? " " + fullOperation.operation.toString() : "")
    return
}

const appendNumber = (number) => {
    if (fullOperation.prev && fullOperation.operation === "") {
        fullOperation.prev = ""
    }
    let input = fullOperation.current.toString()
    if (input.length > 9) {
        return
    }
    if (number === '.' && input.includes('.')) {
        return
    }
    if (number === '.' && input === "") {
        number = "0."
    }
    if (input === "0" && number !== ".") {
        input = number
        fullOperation.current = input
        return
    }
    input = input + number
    fullOperation.current = input
    return
}

const chooseOperation = (operator) => {
    if (fullOperation.current === "" && fullOperation.prev === "" && fullOperation.operation === "") {
        return
    } else if (fullOperation.prev && fullOperation.operation === "" && fullOperation.current === "") {
        fullOperation.operation = operator
    } else if (fullOperation.prev && fullOperation.operation && fullOperation.current === "") {
        fullOperation.operation = operator
        return
    }
    else if (fullOperation.operation !== "" && fullOperation.prev !== "" && fullOperation.current !== "") {
        result = compute()
        fullOperation.prev = result
        fullOperation.operation = operator
        fullOperation.current = ""
    }
    else {
        fullOperation.prev = fullOperation.current
        fullOperation.operation = operator
        fullOperation.current = ""
    }

    return
}

const compute = () => {
    if (fullOperation.prev === "" || fullOperation.current === "" || fullOperation.operation === "") {
        return
    }
    if (isNaN(fullOperation.prev) || isNaN(fullOperation.current)) {
        return
    }
    fullOperation.current = parseFloat(fullOperation.current)
    fullOperation.prev = parseFloat(fullOperation.prev)

    let computation = ""

    switch (fullOperation.operation) {
        case '+':
            computation = fullOperation.prev + fullOperation.current
            break
        case '-':
            computation = fullOperation.prev - fullOperation.current
            break
        case 'x':
            computation = fullOperation.prev * fullOperation.current
            break
        case '÷':
            computation = fullOperation.prev / fullOperation.current
            break
        default:
            return
    }

    // if (computation.toString().length > 9 && computation.toString().includes(".")) {
    // }
    computation = Math.round((computation + Number.EPSILON) * 100) / 100

    return computation
}

const evaluate = () => {
    if (fullOperation.current === "" || fullOperation.prev === "" || fullOperation.operation === "") {
        return
    }
    if (fullOperation.current === 0 && fullOperation.operation === "÷") {
        clear()
        inputElement.innerText = "Error"
    }
    result = compute()
    fullOperation.prev = result
    fullOperation.operation = ""
    fullOperation.current = ""
    return
}

const changeSign = () => {
    if (fullOperation.current === "") {
        return
    }
    fullOperation.current = (parseFloat(fullOperation.current * (-1)))
    return
}

const calculatePercentage = () => {
    if (fullOperation.current === "") {
        return
    }
    if (fullOperation.current.toString().includes(".")) {
        return
    }
    fullOperation.current = fullOperation.current / 100
    return
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

equalsButton.addEventListener("click", () => {
    evaluate()
    updateDisplay()
})

clearButton.addEventListener("click", () => {
    clear()
    updateDisplay()
})

toggleSign.addEventListener("click", () => {
    changeSign()
    updateDisplay()
})

percentage.addEventListener("click", () => {
    calculatePercentage()
    updateDisplay()
})

document.addEventListener('keydown', (event) => {
    const key = event.key;
    const isShiftPressed = event.shiftKey;

    //single digit number keys
    if (/^\d$/.test(key)) {
        appendNumber(key)
        updateDisplay()
    }

    //operators + - * /
    if (/[+\-\*/]/.test(key)) {
        if (key === "*") {
            chooseOperation("x")
            updateDisplay()
        } else if (key === "/") {
            chooseOperation("÷")
            updateDisplay()
        } else {
            chooseOperation(key)
            updateDisplay()
        }
    }

    if (key === 'Enter') {
        evaluate()
        updateDisplay()
    }

    if (key === 'Escape') {
        clear()
        updateDisplay()
    }

    if (key === 'Backspace') {
        backspace()
        updateDisplay()
    }

    if (key === '%') {
        calculatePercentage()
        updateDisplay()
    }
    if (isShiftPressed && key === '-') {
        changeSign()
        updateDisplay()
    }
});