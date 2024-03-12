// script.js

document.addEventListener('DOMContentLoaded', function () {
    var processButton = document.getElementById('calculate-btn');

    processButton.addEventListener('click', function () {
        var string1 = document.getElementById('string1').value;
        var string2 = document.getElementById('string2').value;

        // You can perform any action with string1 and string2 here
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
        while (sum > 9) {
            sum = sum.toString().split('').reduce(function (acc, digit) {
                return acc + parseInt(digit);
            }, 0);
        }

        // Display the results
        document.getElementById('fullname').textContent = "Ho va Ten: " + string1;
        document.getElementById('birthdate').textContent = "Ngay sinh: " + string2;
        document.getElementById('duongdoi').textContent = "Duong doi: " + sum;
    });
});
