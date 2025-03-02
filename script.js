const numberToSpanish = (num) => {
    const unidades = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
    const decenas = ["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
    const especiales = ["once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
    const centenas = ["", "cien", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];
    
    if (num === 100) return "cien";
    
    let result = "";
    
    if (num >= 1000000) {
        let millones = Math.floor(num / 1000000);
        result += (millones === 1 ? "un millón" : numberToSpanish(millones) + " millones") + " ";
        num %= 1000000;
    }
    
    if (num >= 1000) {
        let miles = Math.floor(num / 1000);
        result += (miles === 1 ? "mil" : numberToSpanish(miles) + " mil") + " ";
        num %= 1000;
    }
    
    if (num >= 100) {
        let centena = Math.floor(num / 100);
        result += centenas[centena] + " ";
        num %= 100;
    }
    if (num == 20){
        return "veinte";
    }
    if (num > 20 && num < 30) {
        let decena = Math.floor(num / 10);
        result += "veintei";
        num %= 10;
    }else if (num >= 30) {
        let decena = Math.floor(num / 10);
        result += decenas[decena] + (num % 10 !== 0 ? " y " : " ");
        num %= 10;
    } else if (num >= 11) {
        result += especiales[num - 11] + " ";
        num = 0;
    }
    
    if (num > 0) {
        result += unidades[num] + " ";
    }
    console.log(result)
    return result.trim();
};

document.addEventListener("DOMContentLoaded", () => {
    let currentNumber = 0;
    const numberDisplay = document.getElementById("number-display");
    const inputField = document.getElementById("input-field");
    const checkButton = document.getElementById("check-button");
    const nextButton = document.getElementById("next-button");
    const feedback = document.getElementById("feedback");
    const answer = document.getElementById("answer");

    function generateNumber() {
        currentNumber = Math.floor(Math.random() * 1000000) + 1;
        numberDisplay.textContent = currentNumber;
        inputField.value = "";
        inputField.style.backgroundColor = "white";
        feedback.textContent = "";
        answer.textContent = "";
    }

    checkButton.addEventListener("click", () => {
        const userAnswer = inputField.value.trim().toLowerCase();
        const correctAnswer = numberToSpanish(currentNumber);

        if (userAnswer === correctAnswer) {
            inputField.style.backgroundColor = "lightgreen";
            feedback.textContent = "Correcto! Muy bien!";
            feedback.style.color = "green";
        } else {
            inputField.style.backgroundColor = "lightcoral";
            feedback.textContent = "Incorrect!";
            feedback.style.color = "red";
            answer.textContent = `Correct answer: ${correctAnswer}`
        }
    });

    nextButton.addEventListener("click", generateNumber);

    generateNumber();
});
