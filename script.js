const container = document.querySelector('#container');

let input1;
let input2;
let operation;

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
    switch (operation) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return sub(a, b);
            break;
        case '*':
            return mult(a, b);
            break;
        case '/':
            return div(a, b);
    }
}