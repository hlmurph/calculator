
// region Init
let operand1 = '';
let operand2 = '';
let operator = '';
let displayValue = '';
let evaluationComplete = false;
let operand1ContainsDecimal = false;
let operand2ContainsDecimal = false;
let buttonToPress
const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');

clear();


buttons.forEach((button) => {

    document.addEventListener('keydown', function (event) {


        // Add listeners for keyboard
        buttonToPress = button.textContent;

        if (button.textContent === '=') {
            buttonToPress = 'Enter';
        } else if (button.textContent === 'Backspace') {
            buttonToPress = 'Backspace';
        } else if (button.textContent === 'Clear') {
            buttonToPress = 'c';
        }

            if (event.key === buttonToPress) {
                document.getElementById(`${buttonToPress}`).click();
            }
        })

    // Change style so background color changes when clicked
    button.addEventListener('mousedown', () => {
        button.setAttribute('style', 'background: #9f9f9f;')
    });

    button.addEventListener('mouseup', () => {
        button.setAttribute('style', 'background: #888484;')
    });

    button.addEventListener('click', () => {


        switch (button.getAttribute('class')) {
            case 'number':
                handleDigitClick(button.textContent);
                break;
            case 'operator':
                handleOperatorClick(button.textContent);
                break;
            case 'decimal':
                handleDecimalClick(button.textContent);
                break;
            case 'backspace':
                handleBackspaceClick();
                break;
        }
    });
});
// endregion

function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mult(a, b) {
    return a * b;
}

function div(a, b) {
    return a / b;
}

function updateDisplay() {
    if ((displayValue.toString()).length > 10) {
        displayValue = Number(displayValue.toString()).toFixed(9);
    }
    display.textContent = displayValue;
}

function handleDigitClick(buttonText) {
    if (evaluationComplete) {
        clear();
    }

    if (!operator) {
        operand1 += buttonText;
        displayValue = operand1;
    } else {
        operand2 += buttonText;
        displayValue = operand2;
    }

    updateDisplay();
}

function handleOperatorClick(buttonText) {
    // When = clicked
    if (buttonText === "=") {
        if (evaluationComplete) {
            operand1 = displayValue;
        }
        operate(operator, operand1, operand2);
        return;
    } else if (buttonText === "Clear") {
        clear();
        return;
    }

    // All other operators
    if (evaluationComplete) {
        operandShift();
        evaluationComplete = false;
    } else if (operand2) {
        operate(operator, operand1, operand2);
        operandShift();
        evaluationComplete = false;
    }

    if (buttonText != "Backspace") {
        operator = buttonText;
    }
}

function handleDecimalClick() {
    if (evaluationComplete) {
        clear();
    }

    if (!operator) {
        if (operand1ContainsDecimal === true) {
            return;
        }
        operand1 += '.';
        displayValue = operand1;
        operand1ContainsDecimal = true;
    } else {
        if (operand2ContainsDecimal === true) {
            return;
        }
        operand2 += '.';
        displayValue = operand2;
        operand2ContainsDecimal = true;
    }
    updateDisplay();
}

function handleBackspaceClick() {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
    if (!operator) {
        operand1 = operand1.slice(0, -1);
    } else {
        operand2 = operand2.slice(0, -1);
    }
}

function operate(operation, a, b) {
    switch (operation) {
        case '+':
            displayValue = add(Number(a), Number(b));
            break;
        case '-':
            displayValue = sub(Number(a), Number(b));
            break;
        case '*':
            displayValue = mult(Number(a), Number(b));
            break;
        case '/':
            if (Number(b) === 0) {
                displayValue = "Nice try. Not today!"
                break;
            }
            displayValue = div(Number(a), Number(b));
            break;
    }

    evaluationComplete = true;
    updateDisplay();
}

function operandShift() {
    operand1 = displayValue;
    operand2 = '';
    operand2ContainsDecimal = false;
    if ((operand1.toString()).search('.')) {
        operand1ContainsDecimal = true;
    } else {
        operand1ContainsDecimal = false;
    }
}

function clear() {
    operator = "";
    operand1 = "";
    operand2 = "";
    displayValue = "";
    evaluationComplete = false;
    operand1ContainsDecimal = false;
    operand2ContainsDecimal = false;
    updateDisplay();
}
