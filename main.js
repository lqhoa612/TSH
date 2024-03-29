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

// Function to translate the page
function translatePage(language) {
    // Translations
    const translations = {
    en: {
        name: "Fullname last middle first",
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
        linhhonLabel: "Soul/Urge: ", // vowelsLabel: "|     Vowels: ",
        nhancachLabel: "Characteristic: ", //consonantsLabel: "|     Consonants: ",
        lienketlinhhonnhancachLabel: "Connection (Soul and Characteristic): ",
        canbangLabel: "Balance: ", // initialsLabel: "|     Initials: ",
        tuduylytriLabel: "Rational Thinking: ",
        sucmanhtiemthucLabel: "Subconsious Ability: ",
        sothieuLabel: "Imbalanced Number(s): ",
        ngaysinhLabel: "Birth Day: ",
        namcanhanLabel: "Personal Year: ",
        thangcanhanLabel: "Personal Month: ",
        ngaycanhanLabel: "Personal Day: ",
        changLabel: "Milestones: ",
        tuoiLabel: "Milestones Age: ",
        thachthucLabel: "Challenges: ",
    },
    vi: {
        name: "Họ và Tên họ đệm tên",
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
        linhhonLabel: "Linh hồn: ", // vowelsLabel: "|     Nguyên âm: ",
        nhancachLabel: "Nhân cách: ", // consonantsLabel: "|     Phụ âm: ",
        lienketlinhhonnhancachLabel: "Liên kết (Linh hồn và Nhân cách): ",
        canbangLabel: "Cân bằng: ", // initialsLabel: "|     Ký tự đầu: ",
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

// Function to remove accents from a string
function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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

// Calculate Numerology --->
function calculateNumerology() {
    // Get user inputs
    var rawName = document.getElementById('name').value;
    var name = removeAccents(rawName);
    var birthdate = document.getElementById('birthdate').value;

    // Get system date
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    // Handle birthdate input
    var [ngaysinh, thangsinh, namsinh] =  birthdate.split('/').map(Number);

    // Perform calculation of core numbers
    var [duongdoi, sumenh, linhhon, nhancach, canbang, sucmanhtiemthuc, sothieu] = calculateCoreNumbers(name, ngaysinh, thangsinh, namsinh);

    // Calculate connections and other indices
    var lienketduongdoisumenh = Math.abs(reduceToSingleDigit(duongdoi, false) - reduceToSingleDigit(sumenh, false));
    var truongthanh = reduceToSingleDigit(duongdoi + sumenh, true);
    var lienketlinhhonnhancach = Math.abs(reduceToSingleDigit(linhhon, false) - reduceToSingleDigit(nhancach, false));
    var tuduylytri = calculateRationalThinking(name, ngaysinh);

    // Calculate personal date, milestones, and challenges
    var namcanhan = reduceToSingleDigit(ngaysinh + thangsinh + reduceToSingleDigit(year, false), false);
    var thangcanhan = reduceToSingleDigit(namcanhan + reduceToSingleDigit(month, false), false);
    var ngaycanhan = reduceToSingleDigit(thangcanhan + reduceToSingleDigit(day, false), false);
    var [chang, thachthuc] = calculateMilestonesAndChallanges(ngaysinh, thangsinh, namsinh);
    var tuoi = calculateMilestoneAges(duongdoi);

    // Display the results
    displayResults(rawName, birthdate, day, month, year, duongdoi, sumenh, lienketduongdoisumenh, truongthanh, linhhon, nhancach, lienketlinhhonnhancach, canbang, tuduylytri, sucmanhtiemthuc, sothieu, ngaysinh, namcanhan, thangcanhan, ngaycanhan, chang, tuoi, thachthuc);
}

function calculateCoreNumbers(name, ngaysinh, thangsinh, namsinh) {
    var [duongdoi, sumenh, linhhon, nhancach, canbang, sucmanhtiemthuc, nCharNum] = [0, 0, 0, 0, 0, 0, 0];
    var [nChar, prevChar] = [' ', ' '];
    var [nCharNumStorage, vowelsNumStorage, consonantsNumStorage, initialsNumStorage, sothieu] = [[], [], [], [], []];
    name = name.toLowerCase();
    // Lifepath
    duongdoi = reduceToSingleDigit(ngaysinh, false) + reduceToSingleDigit(thangsinh, false) + reduceToSingleDigit(namsinh, false);
    duongdoi = reduceToSingleDigit(duongdoi, true);

    // Destiny, Soul Urge, Characteristic, and Balance
    for (var i = 0; i < name.length; i++) {
        nChar = name.charAt(i);
        if (/[a-z]/.test(nChar)) {
            nCharNum = reduceToSingleDigit(nChar.charCodeAt(0)-96, false);
            sumenh += nCharNum;
            nCharNumStorage.push(nCharNum);
            if (/[aeiou]/.test(nChar)) {
                linhhon += nCharNum;
                vowelsNumStorage.push(nCharNum);
            }
            else if (/[y]/.test(nChar) && !/[aeiou]/.test(prevChar)) {
                linhhon += nCharNum;
                vowelsNumStorage.push(nCharNum);
            }
            else {
                nhancach += nCharNum;
                consonantsNumStorage.push(nCharNum);
            }
            if (!/[a-z]/.test(prevChar)) {
                canbang += nCharNum;
                initialsNumStorage.push(nCharNum);
            }
        }
        prevChar = nChar;
    }
    // Subconcious Power and Imbalance Number(s)
    for (var i = 1; i <= 9; i++) {
        if (!nCharNumStorage.includes(i)) {
            sothieu.push(i);
        }
    }

    sumenh = reduceToSingleDigit(sumenh, true); console.log('sumenh: ', nCharNumStorage);
    linhhon = reduceToSingleDigit(linhhon, true); console.log('nguyenam: ', vowelsNumStorage);
    nhancach = reduceToSingleDigit(nhancach, true); console.log('phuam: ', consonantsNumStorage);
    canbang = reduceToSingleDigit(canbang, true); console.log('chucaidau: ', initialsNumStorage);
    sucmanhtiemthuc = 9 - sothieu.length;

    return [duongdoi, sumenh, linhhon, nhancach, canbang, sucmanhtiemthuc, sothieu];
}

function calculateRationalThinking(name, ngaysinh) {
    var tuduylytri = ngaysinh;
    name = name.toLowerCase();
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
    return reduceToSingleDigit(tuduylytri, true);
}

function calculateMilestonesAndChallanges(ngaysinh, thangsinh, namsinh) {
    var [chang, thachthuc] = [[], []];
    ngaysinh = reduceToSingleDigit(ngaysinh, false);
    thangsinh = reduceToSingleDigit(thangsinh, false);
    namsinh = reduceToSingleDigit(namsinh, false);

    chang.push(reduceToSingleDigit(thangsinh + ngaysinh, true));
    chang.push(reduceToSingleDigit(namsinh + ngaysinh, true));
    chang.push(reduceToSingleDigit(chang[0] + chang[1], true));
    chang.push(reduceToSingleDigit(thangsinh + namsinh, true));

    thachthuc.push(Math.abs(reduceToSingleDigit(thangsinh - ngaysinh), true));
    thachthuc.push(Math.abs(reduceToSingleDigit(namsinh - ngaysinh), true));
    thachthuc.push(Math.abs(reduceToSingleDigit(thachthuc[0] - thachthuc[1]), true));
    thachthuc.push(Math.abs(reduceToSingleDigit(thangsinh - namsinh), true));

    return [chang, thachthuc];
}

function calculateMilestoneAges(duongdoi) {
    var tuoi = [];
    tuoi.push(36 - reduceToSingleDigit(duongdoi, false));
    tuoi.push(tuoi[0] + 9);
    tuoi.push(tuoi[1] + 9);
    tuoi.push(tuoi[2] + 9);
    return tuoi;
}

function displayResults(rawName, birthdate, day, month, year, duongdoi, sumenh, lienketduongdoisumenh, truongthanh, linhhon, nhancach, lienketlinhhonnhancach, canbang, tuduylytri, sucmanhtiemthuc, sothieu, ngaysinh, namcanhan, thangcanhan, ngaycanhan, chang, tuoi, thachthuc) {
    document.getElementById('fullname').textContent = rawName;
    document.getElementById('birthdate2').textContent = birthdate;
    document.getElementById('todate').textContent = `${day}/${month}/${year}`;

    document.getElementById('duongdoi').textContent = duongdoi;
    document.getElementById('sumenh').textContent = sumenh;
    document.getElementById('lienketduongdoisumenh').textContent = lienketduongdoisumenh;
    document.getElementById('truongthanh').textContent = truongthanh;
    document.getElementById('linhhon').textContent = linhhon;
    document.getElementById('nhancach').textContent = nhancach;
    document.getElementById('lienketlinhhonnhancach').textContent = lienketlinhhonnhancach;
    document.getElementById('canbang').textContent = canbang;
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
}
// Calculate Numerology <---

// Add event listener when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Event listener for the Enter key press
    document.addEventListener('keydown', function(event) {
        // Check if the pressed key is Enter (keycode 13)
        if (event.keyCode === 13) {
            // Trigger the click event of the calculation button
            document.getElementById('calculateBtn').click();
        }
    });

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

    // Event listener for calculate button press
    document.getElementById('calculateBtn').addEventListener('click', calculateNumerology);
});