// script.js

// Define a function to reduce the sum to a single-digit number
function reduceToSingleDigit(sum) {
    // Reduce the sum to a single-digit number
    while (sum > 9) {
        sum = sum.toString().split('').reduce(function (acc, digit) {
            return acc + parseInt(digit);
        }, 0);
    }
    return sum;
}

// Define a function to check if a character is a vowel
function isVowel(character) {
    // Convert the character to lowercase for case-insensitive comparison
    character = character.toLowerCase();

    // Check if the character is a vowel
    if (character === 'a' || character === 'e' || character === 'i' || character === 'o' || character === 'u') {
        return character;
    }
}

// Add event listener when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    var processButton = document.getElementById('calculate-btn');

    processButton.addEventListener('click', function () {
        var string1 = document.getElementById('string1').value;
        var string2 = document.getElementById('string2').value;

        // You can perform any action with string1 and string2 here

        // Get the current system date
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth() + 1;
        var currentDay = currentDate.getDate();
        

        // Split string2 into individual characters
        var characters = string2.split('');

        // Initialize sum
        var sum = 0;

        // Iterate through each character and sum the numeric value
        for (var i = 0; i < characters.length; i++) {
            // Parse the character to a number (if it's numeric)
            var num = parseFloat(characters[i]);
            // Check if it's a valid number
            if (!isNaN(num)) {
                // Add the numeric value to the sum
                sum += num;
            }
        }

        // Reduce the sum to a single-digit number
        sum = reduceToSingleDigit(sum);

        // Display the results
        document.getElementById('fullname').textContent = "Họ và Tên: " + string1;
        document.getElementById('birthdate').textContent = "Ngày Sinh: " + string2;
        document.getElementById('todate').textContent = `Ngày hiện tại: ${currentDay}/${currentMonth}/${currentYear}`;
        document.getElementById('duongdoi').textContent = "Đường đời: " + sum;
    });
});
