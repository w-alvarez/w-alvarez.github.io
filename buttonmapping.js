var result = "";

function mapBtnAction(elem) {
    let newStr;
    let btnVal = document.getElementById(elem).innerText;
    let currentExp = document.getElementById("current-text");
    let lastChar = currentExp.innerText.charAt(currentExp.innerText.length - 1);
    let prevEquation = document.getElementById("history-text");

    switch (btnVal) {
        case "=":
            try {
                //attempt to evaluate what has been inputed
                result = eval(currentExp.innerText);
                prevEquation.innerText = currentExp.innerText + " = ";
                currentExp.innerText = result;
            }
            catch(error) {
                //log error in console and let user know expression was invalid
                prevEquation.innerText = currentExp.innerText + " = ";
                currentExp.innerText = "ERR";
                console.log(error);
                return;
            }
            break;
        case "CE":
            //if answer was previously calculated, clear it
            if (result !== "" || currentExp.innerText === "ERR") {
                currentExp.innerText = "0"
            }
            //otherwise, remove last index
            else {
                newStr = currentExp.innerText.substring(0, currentExp.innerText.length-1);
                currentExp.innerText = newStr
            }
            break;
        case "(":
            //if left bracket placed after number, insert multiplication symbol to prevent error in eval
            if (parseInt(lastChar)) {
                currentExp.innerText = currentExp.innerText + "*" + btnVal
            }
            //default case such as when innertext is empty
            else {
                currentExp.innerText += btnVal
            }
            break;
        case "+":
        case "-":
        case "/":
        case "x":
            result = "";
            //replace x with asterisk to prevent eval error
            if (btnVal === "x") {
                btnVal = "*"
            }
            //if char at index before the one we are inserting, replace operator
            if (lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/") {
                newStr = currentExp.innerText.substring(0, currentExp.innerText.length - 1);
                currentExp.innerText = newStr + btnVal;
                return
            }
            //finally, concatenate expression
            currentExp.innerText += btnVal;

            break;
        default:

            //prevent string from exceeding bounds
            if (currentExp.innerText.length > 23) {
                break
            }

            //if innertext not empty and result calculated, reset text fields and display previous answer above current exp
            else if (currentExp.innerText !== "" && Math.abs(parseFloat(result)) >= 0) {
                result =  "";
                prevEquation.innerText = "Ans = " + currentExp.innerText;
                currentExp.innerText = btnVal
            }

            //as long as we haven't errored out, concat string
            else if (currentExp.innerText !== "ERR") {
                currentExp.innerText += btnVal;
            }

            //clear string
            else {
                currentExp.innerText = btnVal;
            }
            break
    }
}