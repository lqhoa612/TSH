// script.js

// Define a function to reduce the sum to a single-digit number
function reduceToSingleDigit(num, allowMaster) {
    // Reduce the sum to a single-digit number
    if (allowMaster == true) {
        if (num == 11 || num == 22 || num == 33)
        return num;
    }

    while (num > 9) {

        num = num.toString().split('').reduce(function (acc, digit) {
            return acc + parseInt(digit);
        }, 0);
        
        if (allowMaster == true) {
            if (num == 11 || num == 22 || num == 33)
            return num;
        }
    }
    return num;
}

// Define a function to check if a character is a vowel
function isVowel(character) {
    // Convert the character to lowercase for case-insensitive comparison
    character = character.toLowerCase();

    // Check if the character is a vowel
    if (character === 'a' || character === 'e' || character === 'i' || character === 'o' || character === 'u')
        return character;
}

// Add event listener when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    var processButton = document.getElementById('calculate-btn');

    processButton.addEventListener('click', function () {
        // Get user name and birthday inputs
        var name = document.getElementById('name').value;
        var birthdate = document.getElementById('birthdate').value;

        // Get the current system date
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth() + 1;
        var currentDay = currentDate.getDate();
        
        // Calculate Lifepath
        var bdChar = birthdate.split(''); // Split birthdate into individual characters
        var duongdoi = 0;
        for (var i = 0; i < bdChar.length; i++) {
            // Parse the character to a number (if it's numeric)
            var num = parseFloat(bdChar[i]);
            // Check if it's a valid number
            if (!isNaN(num))
                duongdoi += num; // Add the numeric value to the sum
            
        }
        duongdoi = reduceToSingleDigit(duongdoi, true);

        // Calculate Destiny
        name = name.toLowerCase();
        var sumenh = 0;
        for (var i = 0; i < name.length; i++) {
            var nChar = name.charAt(i);
            // Check if the character is alphabetic
            if (/[a-z]/.test(nChar)) {
                // Assign a number to the character (1 for 'a', 2 for 'b', ..., 26 for 'z')
                var nCharNum = nChar.charCodeAt(0) - 96; // 'a' has ASCII code 97, so subtracting 96 gives 1 for 'a', 2 for 'b', and so on
                sumenh += reduceToSingleDigit(nCharNum, false);
            }
        }
        sumenh = reduceToSingleDigit(sumenh, true);

        // Display the results
        document.getElementById('fullname').textContent = "Full Name: " + name;
        document.getElementById('birthdate').textContent = "Birthdate: " + birthdate;
        document.getElementById('todate').textContent = `Generated Date: ${currentDay}/${currentMonth}/${currentYear}`;
        document.getElementById('duongdoi').textContent = "1.Lifepath: " + duongdoi;
        document.getElementById('sumenh').textContent = "2.Destiny: " + sumenh;
    });
});
