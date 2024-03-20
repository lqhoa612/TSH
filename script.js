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

// Translations object
const translations = {
    en: {
        name: "Fullname",
        birthdate: "Birthdate dd/mm/yyyy",
        header: "Welcome to Numerology Calculator",
        languageLabel: "Language: ",
        calculateBtn: "Start Calculation",
        resultHeading: "Result: ",
        footer: "&copy; 2024 Numerology Calculator by Quoc Hoa Le",

        fullnameLabel: "Fullname: ",
        birthdate2Label: "Birthdate: ",
        todateLabel: "Date generated: ",
        duongdoiLabel: "Lifepath: ",
        sumenhLabel: "Destiny/Mission: ",
        lienketduongdoisumenhLabel: "Connection (Lifepath and Destiny): ",
        truongthanhLabel: "Growth/Mature: ",
        linhhonLabel: "Soul/Urge: ", vowelsLabel: "|     Vowels: ",
        nhancachLabel: "Characteristic: ", consonantsLabel: "|     Consonants: ",
        lienketlinhhonnhancachLabel: "Connection (Soul and Characteristic): ",
        canbangLabel: "Balance: ", initialsLabel: "|     Initials: ",
        tuduylytriLabel: "Rational Thinking: ",
        sucmanhtiemthucLabel: "Subconsious Ability: ",
        sothieuLabel: "Unbalanced Number(s): ",
        ngaysinhLabel: "Birth Day: ",
        namcanhanLabel: "Personal Year: ",
        thangcanhanLabel: "Personal Month: ",
        ngaycanhanLabel: "Personal Day: ",
        changLabel: "Milestones: ",
        tuoiLabel: "Milestones Age: ",
        thachthucLabel: "Challenges: ",
    },
    vi: {
        name: "Họ và Tên",
        birthdate: "Ngày Sinh dd/mm/yyyy",
        header: "Chào mừng đến với Máy tính Thần Số Học",
        languageLabel: "Ngôn ngữ: ",
        calculateBtn: "Bắt đầu tính toán",
        resultHeading: "Kết quả: ",
        footer: "&copy; 2024 Máy tính Thần Số Học do Quốc Hòa Lê phát triển",

        fullnameLabel: "Họ và Tên: ",
        birthdate2Label: "Ngày sinh: ",
        todateLabel: "Ngày hiện tại: ",
        duongdoiLabel: "Đường đời: ",
        sumenhLabel: "Sứ mệnh: ",
        lienketduongdoisumenhLabel: "Liên kết (Đường đời và Sứ mệnh): ",
        truongthanhLabel: "Trưởng thành: ",
        linhhonLabel: "Linh hồn: ", vowelsLabel: "|     Nguyên âm: ",
        nhancachLabel: "Nhân cách: ", consonantsLabel: "|     Phụ âm: ",
        lienketlinhhonnhancachLabel: "Liên kết (Linh hồn và Nhân cách): ",
        canbangLabel: "Cân bằng: ", initialsLabel: "|     Ký tự đầu: ",
        tuduylytriLabel: "Tư duy lý trí: ",
        sucmanhtiemthucLabel: "Sức mạnh tiềm thức: ",
        sothieuLabel: "Số thiếu: ",
        ngaysinhLabel: "Ngày sinh: ",
        namcanhanLabel: "Năm cá nhân: ",
        thangcanhanLabel: "Tháng cá nhân: ",
        ngaycanhanLabel: "Ngày cá nhân: ",
        changLabel: "Chặng: ",
        tuoiLabel: "Tuổi chặng: ",
        thachthucLabel: "Thách thức: ",
    }
};

// Function to translate the page
function translatePage(language) {
    const languageTranslations = translations[language];
    if (!languageTranslations) {
        console.warn(`Translations not found for language '${language}'.`);
        return;
    }

    const placeholders = translations[language];
    document.getElementById('name').placeholder = placeholders.name;
    document.getElementById('birthdate').placeholder = placeholders.birthdate;

    Object.keys(languageTranslations).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = languageTranslations[key];
        } else {
            console.warn(`Element with ID '${key}' not found.`);
        }
    });
}

// Date format function
function formatDate(input) {
    console.log("Input value changed:", input);
    
    // Remove any non-numeric characters from the input
    var cleanedInput = input.replace(/\D/g, '');

    // Check if the input is empty
    if (cleanedInput.length === 0) {
        // Set the input value to empty
        document.getElementById('birthdate').value = '';
        return;
    }

    // Format the date
    var formattedDate = '';

    // Insert first two characters
    formattedDate += cleanedInput.slice(0, 2);

    // Insert "/" after the second character if the input length is 3 or more
    if (cleanedInput.length >= 3) {
        formattedDate += '/';
    }

    // Insert next two characters
    if (cleanedInput.length > 2) {
        formattedDate += cleanedInput.slice(2, 4);
    }

    // Insert "/" after the fifth character if the input length is 5 or more
    if (cleanedInput.length >= 5) {
        formattedDate += '/';
    }

    // Insert remaining characters
    if (cleanedInput.length > 4) {
        formattedDate += cleanedInput.slice(4, 8);
    }

    // Set the input value to the formatted date
    document.getElementById('birthdate').value = formattedDate;
}



// Add event listener when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Event listener for input field value changes
    document.getElementById('birthdate').addEventListener('input', function () {
        console.log("Input field value changed:", this.value);
        // Call the formatDate function when the input field value changes
        formatDate(this.value);
    });

    // Event listener for language selection change
    document.getElementById('language').addEventListener('change', function () {
        const selectedLanguage = this.value;
        translatePage(selectedLanguage);
    });

    // Initial translation based on default language
    translatePage('en');

    // Event listener for the calculate button
    document.getElementById('calculateBtn').addEventListener('click', function () {
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
        var duongdoi = 0; var ngaysinh = 0; var thangsinh = 0; var namsinh = 0;
        for (var i = 0; i < bdChar.length; i++) {
            // Parse the character to a number (if it's numeric)
            var num = parseInt(bdChar[i]);
            // Check if it's a valid number
            if (!isNaN(num)){
                duongdoi += num; // Add the numeric value to the sum
                if (i == 0 || i == 1) {
                    ngaysinh += num;
                }
                else if (i == 3 || i == 4) {
                    thangsinh += num;
                }
                else if (i >= 6 && i <= 9) {
                    namsinh += num
                }
            }
        }
        duongdoi = reduceToSingleDigit(duongdoi, true);
        ngaysinh = reduceToSingleDigit(ngaysinh, false);
        thangsinh = reduceToSingleDigit(thangsinh, false);
        namsinh = reduceToSingleDigit(namsinh, false);

        // Calculate Mission, Soul Urge, Characteristic, Balance
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

        // Calculate Subconcious ability and Unbalance Numbers
        var sothieu = [];
        for (var i = 1; i <= 9; i++) {
            if (!nCharNumStorage.includes(i)) {
                sothieu.push(i);
            }
        }
        var sucmanhtiemthuc = 9 - sothieu.length;

        // Calculate Personal Date
        var namcanhan = reduceToSingleDigit(ngaysinh + thangsinh + reduceToSingleDigit(currentYear, false), false);
        var thangcanhan = reduceToSingleDigit(namcanhan + reduceToSingleDigit(currentMonth, false), false);
        var ngaycanhan = reduceToSingleDigit(thangcanhan + reduceToSingleDigit(currentDay, false), false);

        // Calculate Milestones
        var chang = [];
        chang.push(reduceToSingleDigit(thangsinh + ngaysinh, true));
        chang.push(reduceToSingleDigit(namsinh + ngaysinh, true));
        chang.push(reduceToSingleDigit(chang[0] + chang[1], true));
        chang.push(reduceToSingleDigit(thangsinh + namsinh, true));

        // Calculate Milestone Age
        var tuoi = [];
        tuoi.push(36 - reduceToSingleDigit(duongdoi, false));
        tuoi.push(tuoi[0] + 9);
        tuoi.push(tuoi[1] + 9);
        tuoi.push(tuoi[2] + 9);

        // Calculation Challenges
        var thachthuc = [];
        thachthuc.push(Math.abs(reduceToSingleDigit(thangsinh - ngaysinh), true));
        thachthuc.push(Math.abs(reduceToSingleDigit(namsinh - ngaysinh), true));
        thachthuc.push(Math.abs(reduceToSingleDigit(thachthuc[0] - thachthuc[1]), true));
        thachthuc.push(Math.abs(reduceToSingleDigit(thangsinh - namsinh), true));

        // Display the results
        document.getElementById('fullname').textContent = name;
        document.getElementById('birthdate2').textContent = birthdate;
        document.getElementById('todate').textContent = `${currentDay}/${currentMonth}/${currentYear}`;

        document.getElementById('duongdoi').textContent = duongdoi;
        document.getElementById('sumenh').textContent = sumenh;
        document.getElementById('lienketduongdoisumenh').textContent = lienketduongdoisumenh;
        document.getElementById('truongthanh').textContent = truongthanh;
        document.getElementById('linhhon').textContent = linhhon;
        document.getElementById('vowels').textContent = vowelsNum;
        document.getElementById('nhancach').textContent = nhancach;
        document.getElementById('consonants').textContent = consonantsNum;
        document.getElementById('lienketlinhhonnhancach').textContent = lienketlinhhonnhancach;
        document.getElementById('canbang').textContent = canbang;
        document.getElementById('initials').textContent = initialsNum;
        document.getElementById('tuduylytri').textContent = tuduylytri;
        document.getElementById('sucmanhtiemthuc').textContent = sucmanhtiemthuc;
        document.getElementById('sothieu').textContent = sothieu;
        document.getElementById('ngaysinh').textContent = ngaysinh;
        document.getElementById('namcanhan').textContent = namcanhan;
        document.getElementById('thangcanhan').textContent = thangcanhan;
        document.getElementById('ngaycanhan').textContent = ngaycanhan;
        document.getElementById('chang').textContent = chang;
        document.getElementById('tuoi').textContent = tuoi;
        document.getElementById('thachthuc').textContent = thachthuc;
    });
});
