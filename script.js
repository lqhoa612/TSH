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
        var duongdoi = 0; var ngaysinh = 0;
        for (var i = 0; i < bdChar.length; i++) {
            // Parse the character to a number (if it's numeric)
            var num = parseInt(bdChar[i]);
            // Check if it's a valid number
            if (!isNaN(num)){
                duongdoi += num; // Add the numeric value to the sum
                if (i == 0 || i == 1) {
                    ngaysinh += num;
                }
            }
        }
        duongdoi = reduceToSingleDigit(duongdoi, true);

        // Calculate Destiny, Soul Urge, Characteristic, Balance
        name = name.toLowerCase();
        var prevChar = ' '; // Initialize with a non-letter character to include the first letter
        var sumenh = 0; var linhhon = 0; var nhancach = 0; var canbang = 0;
        var nCharNumStorage = []; var vowelsNum = []; var consonantsNum = []; var initialsNum = [];// Initialize vector
        for (var i = 0; i < name.length; i++) {
            var nChar = name.charAt(i);
            // Check if the character is alphabetic
            if (/[a-z]/.test(nChar)) {
                // Assign a number to the character (1 for 'a', 2 for 'b', ..., 26 for 'z')
                var nCharNum = reduceToSingleDigit(nChar.charCodeAt(0) - 96, false); // 'a' has ASCII code 97, so subtracting 96 gives 1 for 'a', 2 for 'b', and so on
                // Check if the character is an initial (preceded by a non-letter character)
                if (!/[a-z]/.test(prevChar)) {
                    canbang += nCharNum; // sum for Balance
                    initialsNum.push(nCharNum);
                }
                // Check if the character is vowels
                if (/[aeiou]/.test(nChar)) {
                    linhhon += nCharNum; // sum for Soul Urge
                    vowelsNum.push(nCharNum);
                }
                // count 'y' as a vowel, if the character before it is not
                else if (/[y]/.test(nChar) && !/[aeiou]/.test(prevChar)) {
                    linhhon += nCharNum;
                    vowelsNum.push(nCharNum);
                }
                else {
                    nhancach += nCharNum; // sum for Charateristic
                    consonantsNum.push(nCharNum);
                }
                sumenh += nCharNum; // sum for Destiny
                nCharNumStorage.push(nCharNum);
            }
            prevChar = nChar;
        }
        sumenh = reduceToSingleDigit(sumenh, true);
        linhhon = reduceToSingleDigit(linhhon, true);
        nhancach = reduceToSingleDigit(nhancach, true);
        canbang = reduceToSingleDigit(canbang, true);

        // Calculate Lifepath & Destiny Connection
        var lienketduongdoisumenh = Math.abs(reduceToSingleDigit(duongdoi, false) - reduceToSingleDigit(sumenh, false));

        // Calculate Growth
        var truongthanh = reduceToSingleDigit(duongdoi + sumenh, true);

        // Calculate Soul Urge & Charateristic Connection
        var lienketlinhhonnhancach = Math.abs(reduceToSingleDigit(linhhon, false) - reduceToSingleDigit(nhancach, false));;

        // Calculate Rational Thinking
        var tuduylytri = ngaysinh;
        for (var i = name.length - 1; i >= 0; i--) {
            var nChar = name.charAt(i);
            if (/[a-z]/.test(nChar)) {
                var nCharNum = reduceToSingleDigit(nChar.charCodeAt(0) - 96, false);
                tuduylytri += nCharNum;
            }
            else {
                break;
            }
        }
        tuduylytri = reduceToSingleDigit(tuduylytri, true);
        


        // Display the results
        document.getElementById('fullname').textContent = "Full Name: " + name;
        document.getElementById('birthdate').textContent = "Birthdate: " + birthdate;
        document.getElementById('todate').textContent = `Generated Date: ${currentDay}/${currentMonth}/${currentYear}`;

        document.getElementById('duongdoi').textContent = "1. Lifepath: " + duongdoi;
        document.getElementById('sumenh').textContent = "2. Destiny: " + sumenh;
        document.getElementById('lienketduongdoisumenh').textContent = "3. Connection (Lifepath & Destiny): " + lienketduongdoisumenh;
        document.getElementById('truongthanh').textContent = "4. Growth: " + truongthanh;
        document.getElementById('linhhon').textContent = "5. Soul Urge: " + linhhon + " | Vowels: " + vowelsNum;
        document.getElementById('nhancach').textContent = "6. Charateristic: " + nhancach + " | Consonants: " + consonantsNum;
        document.getElementById('lienketlinhhonnhancach').textContent = "7. Connection (Soul Urge & Charateristic): " + lienketlinhhonnhancach;
        document.getElementById('canbang').textContent = "8. Balance: " + canbang + " | Initials: " + initialsNum;
        document.getElementById('tuduylytri').textContent = "9. Rational Thinking: " + tuduylytri;
    });
});
