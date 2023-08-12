const inputElement = document.querySelector(".current")
const fullOperationElement = document.querySelector(".previous")
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const clearButton = document.querySelector(".clear")
const toggleSign = document.querySelector(".toggle")
const percentage = document.querySelector(".percentage")
const equalsButton = document.querySelector(".equals")

let input = ""
let fullOperation = []

let firstOperand = ""
let secondOperand = ""
let operation = ""

const clear = () => {
    input = ""
    fullOperation = []
    return
}

const updateDisplay = (top) => {
    inputElement.innerText = top
    fullOperationElement.innerText = `${firstOperand} ${operation} ${secondOperand}`
    return
}

const appendNumber = (number) => {
    if (number === '.' && input.includes('.')) {
        return
    }
    if (input === "0" && number !== ".") {
        input = number.toString()
        return
    }
    input = input.toString() + number.toString()
}

const addInputToOperation = () => {
    if (input === "") {
        return
    }
    const newInput = parseFloat(input)
    if (isNaN(newInput)) {
        return
    }
    // fullOperation.push(newInput)
    firstOperand = newInput
    return
}

const chooseOperation = (operator) => {
    // if (input === "" && (fullOperation[fullOperation.length - 1] === "+" || fullOperation[fullOperation.length - 1] === "-" || fullOperation[fullOperation.length - 1] === "x" || fullOperation[fullOperation.length - 1] === "÷")) {
    //     return
    // }
    console.log(firstOperand)
    console.log(secondOperand)
    console.log(operation)
    if (operation !== "" && firstOperand !== "" && input !== "") {
        result = compute()
        firstOperand = result
        operation = operator
        console.log(firstOperand)
        console.log(secondOperand)
        console.log(operation)
    }
    // addInputToOperation()
    // fullOperation.push(operator)
    operation = operator
    input = ""
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
    if (firstOperand === "") {
        return
    }
    secondOperand = parseFloat(input)

    let computation = ""


    switch (operation) {
        case '+':
            computation = firstOperand + secondOperand
            break
        case '-':
            computation = firstOperand - secondOperand
            break
        case 'x':
            computation = firstOperand * secondOperand
            break
        case '÷':
            computation = firstOperand / secondOperand
            break
        default:
            return
    }

    return computation
}



const evaluate = () => {
    addInputToOperation()
    const fullOperationCopy = [...fullOperation]
    let result = compute(fullOperation)
    if (result === undefined) {
        clear()
        return {
            result: "Error",
            computation: []
        }
    }
    const computationArray = [...fullOperationCopy, "=", result]
    input = result
    fullOperation = []
    return {
        result: result,
        computation: computationArray
    }
}

const changeSign = () => {
    if (input === "") {
        return
    }
    input = (parseFloat(input * (-1))).toString()
    return
}

const calculatePercentage = () => {
    if (input === "") {
        return
    }
    if (input.includes(".")) {
        return
    }
    input = (parseFloat(input / (100))).toString()
    return
}

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        appendNumber(number.innerText)
        updateDisplay(input)
    })
})

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        chooseOperation(operator.innerText)
        updateDisplay(input)
    })
})

equalsButton.addEventListener("click", () => {
    const final = evaluate()
    updateDisplay(final.result, final.computation)
})

clearButton.addEventListener("click", () => {
    clear()
    updateDisplay(input, fullOperation)
})

toggleSign.addEventListener("click", () => {
    changeSign()
    updateDisplay(input, fullOperation)
})

percentage.addEventListener("click", () => {
    calculatePercentage()
    updateDisplay(input, fullOperation)
})

