clearCalculator();


function append_num(element) {
    if (firstInput) {
        num1 += element.value;
        displayNumber(num1);
        disableOperations(false);
    }
    else {
        num2 += element.value;
        displayNumber(num2);
    }
}

function chooseOperation(element) {
    operation += element.value;
    firstInput = false;
    displayNumber(operation);
    disableOperations(true);
}

function calculate() {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    var answer = 0;
    if (operation === "+") {
        answer = num1 + num2;
        displayNumber(answer);
    }
    else if (operation === "-") {
        answer = num1 - num2;
        displayNumber(answer);
    }
    else if (operation === "*") {
        answer = num1 * num2;
        displayNumber(answer);
    }
    else if (operation === "/") {
        answer = num1 / num2;
        displayNumber(answer);
    }
    num1 = answer;
    num2 = "";
    operation = "";
    disableOperations(false);
}

function clearCalculator() {
    num1 = "";
    num2 = "";
    operation = "";
    firstInput = true;
    disableOperations(true);
    document.querySelector(".num").disabled = false;
    displayNumber("");  
}

function displayNumber(number) {
    document.querySelector("#num").value = number;
}

function disableOperations(disabled) {
    const operationButtons = document.querySelectorAll(".operation");
    operationButtons.forEach(button => {
        button.disabled = disabled;
    });
}

// function disableNums(disabled) {
//     const operationButtons = document.querySelectorAll(".num");
//     operationButtons.forEach(button => {
//         button.disabled = disabled;
//     });
// }