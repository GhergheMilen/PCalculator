// Get the DOM element for the result display
const result = document.getElementById("result");

// Get all the button elements
const buttons = document.querySelectorAll("button");

// Initialize variables to hold the current and previous operands and the current operator
let currentOperand = "";
let previousOperand = "";
let currentOperator = null;

// Add event listeners to all the buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // If the button is a number button, handle the number input and update the display
        if (button.classList.contains("number")) {
            handleNumber(button.value);
            updateDisplay();
        }
        // If the button is an operator button, handle the operator input
        else if (button.classList.contains("operator")) {
            handleOperator(button.value);
        }
        // If the button is the clear button, clear the input and update the display
        else if (button.id === "clear") {
            clear();
            updateDisplay();
        }
        // If the button is the calculate button, perform the calculation and update the display
        else if (button.id === "calculate") {
            calculate();
            updateDisplay();
        }
    });
});

// Function to handle number input
function handleNumber(number) {
    // If the user tries to enter a decimal point and one already exists in the current operand, do nothing
    if (number === "." && currentOperand.includes(".")) return;
    // Add the number to the current operand
    currentOperand += number;
}

// Function to handle operator input
function handleOperator(operator) {
    // If an operator already exists, perform the calculation using the existing operator
    if (currentOperator !== null) {
        calculate();
    }
    // Set the current operator and move the current operand to the previous operand
    currentOperator = operator;
    previousOperand = currentOperand;
    currentOperand = "";
}

// Function to clear the input
function clear() {
    currentOperand = "";
    previousOperand = "";
    currentOperator = null;
}

// Function to perform the calculation
function calculate() {
    let calculation;
    // Convert the operands to numbers and perform the calculation based on the operator
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (currentOperator) {
        case "+":
            calculation = prev + current;
            break;
        case "-":
            calculation = prev - current;
            break;
        case "*":
            calculation = prev * current;
            break;
        case "/":
            calculation = prev / current;
            break;
        default:
            return;
    }
    // Update the current operand with the result and clear the previous operand and operator
    currentOperand = calculation.toString();
    currentOperator = null;
    previousOperand = "";
}

// Function to update the display
function updateDisplay() {
    // Update the result element with the current and previous operands and operator
    result.innerText = `${previousOperand} ${
        currentOperator ? currentOperator : ""
    } ${currentOperand}`;
}
