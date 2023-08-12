const inputElement = document.querySelector(".current")
const fullOperationElement = document.querySelector(".previous")
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const clearButton = document.querySelector(".clear")
const toggleSign = document.querySelector(".toggle")
const percentage = document.querySelector(".percentage")
const equalsButton = document.querySelector(".equals")

// let input = ""
const fullOperation = {
    prev: "",
    current: "",
    operation: ""
}

let firstOperand = ""
let secondOperand = ""
let operation = ""

const clear = () => {
    // input = ""
    fullOperation.prev = ""
    fullOperation.current = ""
    fullOperation.operation = ""
    return
}

const updateDisplay = () => {
    inputElement.innerText = fullOperation.current
    fullOperationElement.innerText = fullOperation.prev + (fullOperation.operation !== "" ? " " + fullOperation.operation : "")
    return
}

const appendNumber = (number) => {
    let input = fullOperation.current
    if (number === '.' && input.toString().includes('.')) {
        return
    }
    if (input.toString() === "0" && number !== ".") {
        input = number
        return
    }
    input = input.toString() + number.toString()
    fullOperation.current = parseFloat(input)

    console.log(fullOperation)
    return
}

// const addInputToOperation = () => {
//     if (input === "") {
//         return
//     }
//     const newInput = parseFloat(input)
//     if (isNaN(newInput)) {
//         return
//     }
//     // fullOperation.push(newInput)
//     firstOperand = newInput
//     console.log(firstOperand)
//     console.log(secondOperand)
//     console.log(operation)
//     return
// }

const chooseOperation = (operator) => {
    // if (input === "" && (fullOperation[fullOperation.length - 1] === "+" || fullOperation[fullOperation.length - 1] === "-" || fullOperation[fullOperation.length - 1] === "x" || fullOperation[fullOperation.length - 1] === "÷")) {
    //     return
    // }
    if (fullOperation.operation !== "" && fullOperation.prev !== "" && fullOperation.current !== "") {
        result = compute()
        fullOperation.prev = result
        fullOperation.operation = operator
        fullOperation.current = ""
        console.log(fullOperation)
    }
    else if (!fullOperation.current && !fullOperation.operation && fullOperation.prev) {
        fullOperation.prev = fullOperation.prev
        fullOperation.operation = operator
    } else {
        fullOperation.prev = fullOperation.current
        fullOperation.operation = operator
        fullOperation.current = ""
        console.log(fullOperation)
    }

    return
}

// const compute = (fullOperationArray) => {
//     if (input === "") {
//         return
//     }
//     if (fullOperationArray.length < 3) {
//         return
//     }

//     switch (operation) {
//         case '+':
//             computation = prev + current
//             break
//         case '-':
//             computation = prev - current
//             break
//         case 'x':
//             computation = prev * current
//             break
//         case '÷':
//             computation = prev / current
//             break
//         default:
//             return
//     }




//     for (let i = 0; i < fullOperationArray.length; i++) {
//         if (fullOperationArray.includes("x")) {
//             const mulitplyIndex = fullOperationArray.indexOf("x")
//             const result = fullOperationArray[mulitplyIndex - 1] * fullOperationArray[mulitplyIndex + 1]
//             fullOperationArray.splice((mulitplyIndex - 1), 3, result)
//         }
//     }
//     for (let i = 0; i < fullOperationArray.length; i++) {
//         if (fullOperationArray.includes("÷")) {
//             const divideIndex = fullOperationArray.indexOf("÷")
//             if (fullOperationArray[divideIndex + 1] === 0) {
//                 fullOperationArray = []
//                 break
//             }
//             const result = fullOperationArray[divideIndex - 1] / fullOperationArray[divideIndex + 1]
//             fullOperationArray.splice((divideIndex - 1), 3, result)
//         }
//     }
//     for (let i = 0; i < fullOperationArray.length; i++) {
//         if (fullOperationArray.includes("+")) {
//             const addIndex = fullOperationArray.indexOf("+")
//             const result = fullOperationArray[addIndex - 1] + fullOperationArray[addIndex + 1]
//             fullOperationArray.splice((addIndex - 1), 3, result)
//         }
//     }
//     for (let i = 0; i < fullOperationArray.length; i++) {
//         if (fullOperationArray.includes("-")) {
//             const minusIndex = fullOperationArray.indexOf("-")
//             const result = fullOperationArray[minusIndex - 1] - fullOperationArray[minusIndex + 1]
//             fullOperationArray.splice((minusIndex - 1), 3, result)
//         }
//     }

//     return fullOperationArray[0]
// }

const compute = () => {
    if (!fullOperation.prev || !fullOperation.current || !fullOperation.operation) {
        return
    }

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

    return computation
}



const evaluate = () => {
    if (!fullOperation.operation || !fullOperation.prev || !fullOperation.current) {
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
    console.log(fullOperation)
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

