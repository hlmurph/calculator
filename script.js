// Display is the div in the html that will show content
const display = document.querySelector('#display')

// Variables to store entered values and operations to be performed on those values
let input1;
let input2;
let operator;

// Variable for the content of the display
let displayContent = '';

// Bool to indicate whether an initial value has been entered
let nextValue = false;

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('mousedown', () => {
        button.setAttribute('style', 'background: #9f9f9f;')
    })
    button.addEventListener('mouseup', () => {
        button.setAttribute('style', 'background: #888484;')
    })
    button.addEventListener('click', () => {
        if (button.getAttribute('class') == 'number') {
            if (nextValue) {
                displayContent = '';
                display.textContent = '';
                nextValue = false;
            }
            displayContent += button.textContent;
            display.textContent = displayContent;
        } else {
            let operator = button.getAttribute('id');
            operate(operator, input1, input2);
        }
    })
})

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

function operate(operation, a, b) {
    nextValue = true;
    switch (operation) {
        case 'clear':
            input1 = '';
            input2 = '';
            nextValue = false;
            displayContent = '';
            display.textContent = '';
            logVals();
        case '+':
            storeVal(displayContent);
            operator = '+';
            if (input2) {
                input1 = input1 + input2;
                displayContent = input1;
                display.textContent = input1;
                input2 = false;
            }
            return add(a, b);
        case '-':
            storeVal(displayContent);
            operator = '-';
            if (input2) {
                input1 = input1 - input2;
                displayContent = input1;
                display.textContent = input1;
                input2 = false;
            }
            return sub(a, b);
        case '*':
            storeVal(displayContent);
            operator = '*';
            if (input2) {
                input1 = input1 * input2;
                displayContent = input1;
                display.textContent = input1;
                input2 = false;
            }
            return mult(a, b);
        case '/':
            storeVal(displayContent);
            operator = '/';
            if (input2) {
                input1 = input1 / input2;
                displayContent = input1;
                display.textContent = input1;
                input2 = false;
            }
            return div(a, b);
        case '=':
            operate(operator, input1, input2);
    }
}

function storeVal(num) {
    if (!input1) {
        input1 = Number(num);
    } else {
        input2 = Number(num);
    }
}

function logVals() {
    console.log(`input1 = ${input1}\ninput2 = ${input2}`)
}