// script.js

// Page Formatting, Inputs, and features --->
function translatePage(language) {
    // Translations
    const translations = {
    en: {
        name: "Fullname (last middle first)",
        birthdate: "Birthdate (dd/mm/yyyy)",
        header: "Welcome to Numerology Calculator",
        languageLabel: "Language: ",
        calculateBtn: "Start Calculation",
        resultHeading: "Result: ",
        rightHead: "How to use:",
        guide1: "Enter your fullname in Last-Middle-First name order. Ex: John Micheal Smith, enter Smith Micheal John.",
        guide2: "If you have multiple middle names, enter anyhow you like just make sure to enter your first name LAST.",
        guide3: "Enter your birthdate in dd-mm-yyyy format, just the numbers, like 1st January 1111, enter 01011111.",
        guide4: "Finally just hit Enter key or click the Calculate button and your Numerology results should appear below the button.",
        guide5: "*** To learn more about your Numerology result, contact me via the email below with the result and I'll get back to you as soon as I can.",
        guide6: "*** Please email me if there is any error with the calculator or any feedback/improvement you want to share.",
        guide7: "*** Disclamer: This is a work in process!",
        footer: "&copy; 2024 Numerology Calculator by Quoc Hoa Le",
        contactHead: "Contact Information:",

        yourmapLabel: "Your map: ",
        fullnameLabel: "Fullname: ",
        birthdate2Label: "Birthdate: ",
        todateLabel: "Date generated: ",
        duongdoiLabel: "Life path: ",
        sumenhLabel: "Destiny/Mission: ",
        lienketduongdoisumenhLabel: "Connection (Life path - Destiny): ",
        truongthanhLabel: "Growth/Mature: ",
        linhhonLabel: "Soul/Urge: ",
        nhancachLabel: "Characteristic: ",
        lienketlinhhonnhancachLabel: "Connection (Soul - Characteristic): ",
        canbangLabel: "Balance: ",
        tuduylytriLabel: "Rational Thinking: ",
        sucmanhtiemthucLabel: "Subconsious Ability: ",
        sothieuLabel: "Imbalanced Number(s): ",
        ngaysinhLabel: "Birth Day: ",
        namcanhanLabel: "Personal Year: ",
        thangcanhanLabel: "Personal Month: ",
        ngaycanhanLabel: "Personal Day: ",
        changLabel: "Milestones: ",
        tuoiLabel: "Milestone Ages: ",
        thachthucLabel: "Challenges: ",
    },
    vi: {
        name: "Họ và Tên (họ đệm tên)",
        birthdate: "Ngày Sinh (dd/mm/yyyy)",
        header: "Chào mừng đến với Máy tính Thần Số Học",
        languageLabel: "Ngôn ngữ: ",
        calculateBtn: "Bắt đầu tính toán",
        resultHeading: "Kết quả: ",
        rightHead: "Cách sử dụng:",
        guide1: "Nhập họ và tên không dấu để độ chính xác cao hơn, không quan trọng viết hoa hay viết thường.",
        guide2: "Nếu bạn có nhiều tên đệm, bạn nhập theo thứ tự nào cũng được, riêng tên gọi phải được nhập cuối cùng.",
        guide3: "Nhập ngày tháng năm sinh theo dd/mm/yyyy, ví dụ như ngày 1 tháng 1 năm 1111, thì nhập 01011111",
        guide4: "Cuối cùng nhấn Enter hoặc nhấp vào nút tính toán và kết quả Thần Số Học sẽ hiện ra ở dưới nút tính toán.",
        guide5: "*** Để tìm hiểu thêm về chỉ số Thần Số Học của bạn, hãy liên hệ tôi qua email bên dưới kèm theo kết quả bạn tính được, và tôi sẽ gửi cho bạn thông tin về các chỉ số sớm nhất có thể.",
        guide6: "*** Hãy liên hệ với tôi nếu bạn cho rằng chương trình tính có lỗi hoặc bạn muốn chia sẻ cảm nhận. Mọi đóng góp đều mang ý nghĩa rất lớn đối với tôi.",
        guide7: "*** Chú ý: Đây là chương trình thử nghiệm!",
        footer: "&copy; 2024 Máy tính Thần Số Học do Quốc Hòa Lê phát triển",
        contactHead: "Thông Tin Liên Lạc:",

        yourmapLabel: "Bản đồ của bạn: ",
        fullnameLabel: "Họ và Tên: ",
        birthdate2Label: "Ngày sinh: ",
        todateLabel: "Ngày hiện tại: ",
        duongdoiLabel: "Đường đời: ",
        sumenhLabel: "Sứ mệnh: ",
        lienketduongdoisumenhLabel: "Liên kết (Đường đời - Sứ mệnh): ",
        truongthanhLabel: "Trưởng thành: ",
        linhhonLabel: "Linh hồn: ",
        nhancachLabel: "Nhân cách: ",
        lienketlinhhonnhancachLabel: "Liên kết (Linh hồn - Nhân cách): ",
        canbangLabel: "Cân bằng: ",
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

function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function formatDate(input) {
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
// Page Formatting, Inputs, and features <---

// Calculate Numerology --->
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

function calculateNumerology() {
    clearMessages();
    clearMap();
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
    var ngaysinhIndex = reduceToSingleDigit(ngaysinh, true);

    // Calculate personal date, milestones, and challenges
    var namcanhan = reduceToSingleDigit(ngaysinh + thangsinh + reduceToSingleDigit(year, false), false);
    var thangcanhan = reduceToSingleDigit(namcanhan + reduceToSingleDigit(month, false), false);
    var ngaycanhan = reduceToSingleDigit(thangcanhan + reduceToSingleDigit(day, false), false);
    var [chang, thachthuc] = calculateMilestonesAndChallanges(ngaysinh, thangsinh, namsinh);
    var tuoi = calculateMilestoneAges(duongdoi);

    // Display the results
    displayResults(rawName, birthdate, day, month, year, duongdoi, sumenh, lienketduongdoisumenh, truongthanh, linhhon, nhancach, lienketlinhhonnhancach, canbang, tuduylytri, sucmanhtiemthuc, sothieu, ngaysinhIndex, namcanhan, thangcanhan, ngaycanhan, chang, tuoi, thachthuc);
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

// Explanation for the idecies --->
var prevButton;

function buttonListener() {
    var buttons = document.querySelectorAll('#index-container p');
    // Loop through each button and add event listener
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            var buttonId = this.id;
            console.log(buttonId + " - " + getCurrentLanguage());
            if (getCurrentLanguage() == 'en') {
                englishIndexButtons(buttonId);
            }
            else if (getCurrentLanguage() == 'vi') {
                vietnameseIndexButtons(buttonId);
            }
            prevButton = buttonId
        });
    });
}

function getCurrentLanguage() {
    const languageSelect = document.getElementById('language');
    if (languageSelect) {
        return languageSelect.value;
    } else {
        console.warn("Language select element not found.");
        return null;
    }
}

function translateButtonMeaning(prevButton) {
    var buttonId = prevButton;
    if (getCurrentLanguage() == 'en') {
        englishIndexButtons(buttonId);
    }
    else if (getCurrentLanguage() == 'vi') {
        vietnameseIndexButtons(buttonId);
    }
}

function englishIndexButtons(buttonId) {
    var header = document.getElementById('bottomHead');
    var mess1 = document.getElementById('message1');
    var mess2 = document.getElementById('message2');
    var mess3 = document.getElementById('message3');
    var mess4 = document.getElementById('message4');
    if (prevButton == 'yourmapBtn') {
        clearMap();
        clearMap();
    } else {
        clearMessages();
    }
    
    switch (buttonId) {
        case 'yourmapBtn':
            header.textContent = "Your map"
            displayBirthdateMap();
            displayNameMap();
            break;
        case 'duongdoiBtn':
            header.textContent = "Life path"
            mess1.textContent = "Life path numbers reveal who you are, your strengths and weaknesses."
            mess2.textContent = "It tells you the lesson you need to learn to be your better version."
            mess3.textContent = "Life path number is calculated by add each numbers of your birthday and reduce to a single digit (from 1 to 9)."
            mess4.textContent = "Exept when it is 11, 22 or 33."
            break;
        case 'sumenhBtn':
            header.textContent = "Destiny/Mission"
            mess1.textContent = "Destiny numbers explore what you are destined to do in your lifetime, your mission and who you are destined to become."
            mess2.textContent = "It also points out the strengths you can use and develop to fulfill your life path."
            
            break;
        case 'lienketduongdoisumenhBtn':
            header.textContent = "Connection (Life path - Destiny/Mission)"
            mess1.textContent = "Connection numbers show how you can become what you are destined to be and by that, fulfill your life path."
            
            break;
        case 'truongthanhBtn':
            header.textContent = "Growth/Mature"
            mess1.textContent = "Growth or Mature numbers tell you how you can grow with your body, your mind, and your heart."
            
            break;
        case 'linhhonBtn':
            header.textContent = "Soul/Urge"
            mess1.textContent = "The soul urge numbers reveal what you would love to do, what you would want to become, what you are urging for in life."
            mess2.textContent = "They also project how you want people to treat you."
            
            break;
        case 'nhancachBtn':
            header.textContent = "Characteristic"
            mess1.textContent = "Characteristic numbers tell you how people see you."
            mess2.textContent = "It is sometimes called First Impression numbers."
            mess3.textContent = "And sometimes this is not who you really are."
            break;
        case 'lienketlinhhonnhancachBtn':
            header.textContent = "Connection (Soul/Urge - Characteristic)"
            mess1.textContent = "Sometimes the way people see you is not the way you want to express."
            mess2.textContent = "These numbers suggest you how to unify the two of them, how to live as your true self and not something else."
            
            break;
        case 'canbangBtn':
            header.textContent = "Balance"
            mess1.textContent = "These numbers show how you face problems in life."
            
            break;
        case 'tuduylytriBtn':
            header.textContent = "Rational thinking"
            mess1.textContent = "These numbers reveal the way you think, how you would approach a problem in life."
            
            break;
        case 'sucmanhtiemthucBtn':
            header.textContent = "Subconcious ability"
            mess1.textContent = "Subconsios ability numbers tell you about what you are capable of, your speciality in your past life that is brought to this life."
            
            break;
        case 'sothieuBtn':
            header.textContent = "Imbalance number(s)"
            mess1.textContent = "Imbalance numbers are numbers whose energy is exceeding or contrasting to the standard."
            mess2.textContent = "For example if you have a number X as one of the imbalance numbers, you might be talking too much that you cannot control what you are saying, or you are not communicating enough yet you think no one understands you."
            
            break;
        case 'ngaysinhBtn':
            header.textContent = "Birth day"
            mess1.textContent = "Your natural talents are hidden behind your very own day of birth."
            mess2.textContent = "Just reduce your day of birth to a single digit and you will have your birth day number."
            
            break;
        case 'namcanhanBtn':
            header.textContent = "Personal year"
            mess1.textContent = "In Numerology, everyone has their 4 milestones and each milestone is 9 years."
            mess2.textContent = "From the day you are born to 9 years before"
            
            break;
        case 'thangcanhanBtn':
            header.textContent = "Personal month"
            break;
        case 'ngaycanhanBtn':
            header.textContent = "Personal day"
            break;
        case 'changBtn':
            header.textContent = "Milestones"
            break;
        case 'tuoiBtn':
            header.textContent = "Milestone ages"
            break;
        case 'thachthucBtn':
            header.textContent = "Challenges"
            break;
        default:
            break;
    }
}

function vietnameseIndexButtons(buttonId) {
    var header = document.getElementById('bottomHead');
    var mess1 = document.getElementById('message1');
    var mess2 = document.getElementById('message2');
    var mess3 = document.getElementById('message3');
    var mess4 = document.getElementById('message4');
    if (prevButton == 'yourmapBtn') {
        clearMap();
    } else {
        clearMessages();
    }
    
    switch (buttonId) {
        case 'yourmapBtn':
            header.textContent = "Bản đồ của bạn:"
            displayBirthdateMap();
            break;
        case 'duongdoiBtn':
            header.textContent = "Đường đời";
            break;
        case 'sumenhBtn':
            header.textContent = "Sứ mệnh";
            break;
        case 'lienketduongdoisumenhBtn':
            header.textContent = "Liên kết (Đường đời - Sứ mệnh)";
            break;
        case 'truongthanhBtn':
            header.textContent = "Trưởng thành";
            break;
        case 'linhhonBtn':
            header.textContent = "Linh hồn";
            break;
        case 'nhancachBtn':
            header.textContent = "Nhân cách";
            break;
        case 'lienketlinhhonnhancachBtn':
            header.textContent = "Liên kết (Linh hồn - Nhân cách)";
            break;
        case 'canbangBtn':
            header.textContent = "Cân bằng";
            break;
        case 'tuduylytriBtn':
            header.textContent = "Tư duy lý trí";
            break;
        case 'sucmanhtiemthucBtn':
            header.textContent = "Sức mạnh tiềm thức";
            break;
        case 'sothieuBtn':
            header.textContent = "Số thiếu";
            break;
        case 'ngaysinhBtn':
            header.textContent = "Ngày sinh";
            break;
        case 'namcanhanBtn':
            header.textContent = "Năm cá nhân";
            break;
        case 'thangcanhanBtn':
            header.textContent = "Tháng cá nhân";
            break;
        case 'ngaycanhanBtn':
            header.textContent = "Ngày cá nhân";
            break;
        case 'changBtn':
            header.textContent = "Chặng";
            break;
        case 'tuoiBtn':
            header.textContent = "Tuổi kết thúc chặng";
            break;
        case 'thachthucBtn':
            header.textContent = "Thách thức";
            break;
        default:
            break;
    }
}

function displayBirthdateMap() {
    const header = document.createElement('h3');
    header.textContent = 'Birthdate map';

    const birthday = document.getElementById('birthdate').value;
    const birthdateString = birthday.replace(/\//g, '');

    var frameMap = [
        [3,6,9],
        [2,5,8],
        [1,4,7]
    ];
    let matrixContainer = document.getElementById('birthdateMatrixContainer');
    const table = document.createElement('table');

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            let cellContent = '';
            for (let index = 0; index < birthdateString.length; index++) {
                if (birthdateString[index] == frameMap[i][j]) {
                    cellContent += birthdateString[index];
                }
            }
            cell.textContent = cellContent || ' ';
            row.appendChild(cell);
            
        }
        table.appendChild(row);
    }
    matrixContainer.appendChild(header);
    matrixContainer.appendChild(table);
}

function displayNameMap() {
    const header = document.createElement('h3');
    header.textContent = 'Name map';

    var rawName = document.getElementById('name').value;
    var name = removeAccents(rawName);
    name = name.toLowerCase();
    var nChar = ' ';
    var nCharNumStorage = [];
    let nCharNum;
    for (let i = 0; i < name.length; i++) {
        nChar = name.charAt(i);
        if (/[a-z]/.test(nChar)) {
            nCharNum = reduceToSingleDigit(nChar.charCodeAt(0)-96, false);
            nCharNumStorage.push(nCharNum.toString());
        }
    }
    
    var frameMap = [
        [3,6,9],
        [2,5,8],
        [1,4,7]
    ];
    const matrixContainer = document.getElementById('nameMatrixContainer');
    const table = document.createElement('table');

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            let cellContent = '';
            for (let index = 0; index < nCharNumStorage.length; index++) {
                if (nCharNumStorage[index] == frameMap[i][j]) {
                    cellContent += nCharNumStorage[index];
                }
            }
            cell.textContent = cellContent || ' ';
            row.appendChild(cell);
            
        }
        table.appendChild(row);
    }
    matrixContainer.appendChild(header);
    matrixContainer.appendChild(table);
}

function clearMap() {
    var birthdateMatrixContainer = document.getElementById('birthdateMatrixContainer');
    var nameMatrixContainer = document.getElementById('nameMatrixContainer');
    if (birthdateMatrixContainer == null || nameMatrixContainer == null) {
        return;
    }
    // Remove all child elements from matrixContainer
    while (birthdateMatrixContainer.firstChild != null && nameMatrixContainer.firstChild != null) {
        birthdateMatrixContainer.removeChild(birthdateMatrixContainer.firstChild);
        nameMatrixContainer.removeChild(nameMatrixContainer.firstChild);
    }
}

function clearMessages() {
    var header = document.getElementById('bottomHead');
    var mess1 = document.getElementById('message1');
    var mess2 = document.getElementById('message2');
    var mess3 = document.getElementById('message3');
    var mess4 = document.getElementById('message4');
    
    if (header !== null && mess1 !== null && mess2 !== null && mess3 !== null && mess4 !== null) {
        header.textContent = "";
        mess1.textContent = "";
        mess2.textContent = "";
        mess3.textContent = "";
        mess4.textContent = "";
    }
}
// Explanation for the idecies <---

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
        // Call the formatDate function when the input field value changes
        formatDate(this.value);
    });

    // Event listener for language selection change
    document.getElementById('language').addEventListener('change', function () {
        const selectedLanguage = this.value;
        translatePage(selectedLanguage);
        translateButtonMeaning(prevButton);
    });
    translatePage('en'); // Initial translation based on default language
    buttonListener();

    // Event listener for calculate button press
    document.getElementById('calculateBtn').addEventListener('click', calculateNumerology);
});