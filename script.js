
// region Init
let operand1 = '';
let operand2 = '';
let operator = '';
let displayValue = '';
let evaluationComplete = false;
const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');

clear();

buttons.forEach((button) => {
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
        operand1 = displayValue;
        operand2 = '';
        evaluationComplete = false;
    } else if (operand2) {
        operate(operator, operand1, operand2);
        operand1 = displayValue;
        operand2 = '';
        evaluationComplete = false;
    }
    operator = buttonText;
}

function operate(operation, a, b) {
    switch (operation) {
        case '+':
            displayValue = add(parseInt(a), parseInt(b));
            break;
        case '-':
            displayValue = sub(parseInt(a), parseInt(b));
            break;
        case '*':
            displayValue = mult(parseInt(a), parseInt(b));
            break;
        case '/':
            if (parseInt(b) === 0) {
                displayValue = "Nice try. Not today!"
                break;
            }
            displayValue = div(parseInt(a), parseInt(b));
            break;
    }

    evaluationComplete = true;
    updateDisplay();
}

function clear() {
    operator = "";
    operand1 = "";
    operand2 = "";
    displayValue = "";
    evaluationComplete = false;
    updateDisplay();
}
