document.addEventListener("DOMContentLoaded", function() {
    const loader = document.querySelector(".custom-loader");
    const content = document.getElementById("content");

    // Simulating delay for demonstration purposes
    setTimeout(() => {
        loader.style.display = "none";
        content.style.display = "block";
    }, 3000);

    const exitButton = document.getElementById("exitButton");
    exitButton.addEventListener("click", closeApplication);

    function closeApplication() {
        window.close();
    }

    const convertButton = document.getElementById("convertButton");
    const clearButton = document.getElementById("clearButton");
    const inputValue = document.getElementById("inputValue");
    const resultValue = document.getElementById("resultValue");

    inputValue.setAttribute("autocomplete", "off"); // Disable autocomplete

    convertButton.addEventListener("click", convertTemperature);
    clearButton.addEventListener("click", clearFields);

    inputValue.addEventListener("input", validateInput);

    function convertTemperature() {
        const value = inputValue.value;
        const unitFrom = document.getElementById("unitFrom").value;
        const unitTo = document.getElementById("unitTo").value;

        if (!isValidNumber(value)) {
            alert("Please enter a valid number");
            return;
        }

        const result = convert(value, unitFrom, unitTo);
        resultValue.value = result;
    }

    function clearFields() {
        inputValue.value = "";
        document.getElementById("unitFrom").selectedIndex = 0;
        document.getElementById("unitTo").selectedIndex = 0;
        resultValue.value = "";
    }

    function validateInput() {
        const value = inputValue.value;

        if (!isValidNumber(value)) {
            alert("Please enter a valid number");
        }
    }

    function isValidNumber(value) {
        return /^-?\d*\.?\d*$/.test(value);
    }

    function convert(value, fromUnit, toUnit) {
        if (fromUnit === toUnit) {
            return value + " " + toUnit;
        }

        if (fromUnit === "celsius") {
            if (toUnit === "fahrenheit") {
                return (value * 9 / 5) + 32 + " °F";
            } else if (toUnit === "kelvin") {
                return parseFloat(value) + 273.15 + " K";
            }
        } else if (fromUnit === "fahrenheit") {
            if (toUnit === "celsius") {
                return (value - 32) * 5 / 9 + " °C";
            } else if (toUnit === "kelvin") {
                return (value - 32) * 5 / 9 + 273.15 + " K";
            }
        } else if (fromUnit === "kelvin") {
            if (toUnit === "celsius") {
                return value - 273.15 + " °C";
            } else if (toUnit === "fahrenheit") {
                return (value - 273.15) * 9 / 5 + 32 + " °F";
            }
        }

        return "Invalid conversion";
    }
});