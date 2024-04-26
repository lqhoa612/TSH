// script.js

// Page Formatting, Inputs, and features --->
function translatePage(language) {
    // Translations
    const translations = {
    en: {
        name: "Fullname (last middle first)",
        birthdate: "Birthdate (dd/mm/yyyy)",
        header: "Welcome to Pythagorean Numerology Calculator",
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
        guide7: "*** Disclamer: This is a work in progress!",
        footer: "&copy; 2024 Pythagorean Numerology Calculator by Quoc Hoa Le",
        contactHead: "Contact Information:",

        yourmapLabel: "View your map",
        fullnameLabel: "Fullname: ",
        birthdate2Label: "Birthdate: ",
        todateLabel: "Date generated: ",
        duongdoiLabel: "Life path: ",
        sumenhLabel: "Destiny/Mission: ",
        lienketduongdoisumenhLabel: "Connection (Life path - Destiny): ",
        truongthanhLabel: "Growth/Maturity: ",
        linhhonLabel: "Soul Urge: ",
        nhancachLabel: "Personality: ",
        lienketlinhhonnhancachLabel: "Connection (Soul - Personality): ",
        canbangLabel: "Balance: ",
        tuduylytriLabel: "Rational Thought: ",
        sucmanhtiemthucLabel: "Subconscious Self: ",
        sothieuLabel: "Imbalanced Number(s): ",
        ngaysinhLabel: "Birthday Number: ",
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
        header: "Chào mừng đến với Máy tính Thần Số Học Pythagorean",
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
        footer: "&copy; 2024 Máy tính Thần Số Học Pythagorean do Quốc Hòa Lê phát triển",
        contactHead: "Thông Tin Liên Lạc:",

        yourmapLabel: "Xem bản đồ của bạn",
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
    canbang = reduceToSingleDigit(canbang, false); console.log('chucaidau: ', initialsNumStorage);
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
    } else {
        clearMessages();
    }
    
    switch (buttonId) {
        case 'yourmapBtn':
            header.textContent = "Your map:";
            displayBirthdateMap('en');
            displayCombinedMap('en');
            break;
        case 'duongdoiBtn':
            header.textContent = "Life path";
            mess1.textContent = "Life path number reveals who you are, your strengths and weaknesses.";
            mess2.textContent = "It tells you the lesson you need to learn to be your better version.";
            mess4.textContent = "Your life path number is " + document.getElementById('duongdoi').textContent;
            break;
        case 'sumenhBtn':
            header.textContent = "Destiny/Mission";
            mess1.textContent = "Destiny number explores what you are destined to do in your lifetime, your mission and who you are destined to become.";
            mess2.textContent = "It also points out the strengths you can use and develop to fulfill your life path.";
            mess4.textContent = "Your destiny number is " + document.getElementById('sumenh').textContent;
            break;
        case 'lienketduongdoisumenhBtn':
            header.textContent = "Connection (Life path - Destiny/Mission)";
            mess1.textContent = "Connection number shows how you can become what you are destined to be and by that, fulfill your life path.";
            mess2.textContent = "In some cases, these numbers also represent the challange you need to overcome to walk on the right path.";
            mess4.textContent = "Your connection number is " + document.getElementById('lienketduongdoisumenh').textContent;
            break;
        case 'truongthanhBtn':
            header.textContent = "Growth/Maturity";
            mess1.textContent = "Growth or Maturity number tells you how you can grow with your body, your mind, and your heart.";
            mess2.textContent = "It also indicates an underlying wish or desire that gradually arise when a person is coming into the middle age phase.";
            mess4.textContent = "Your growth number is " + document.getElementById('truongthanh').textContent;
            break;
        case 'linhhonBtn':
            header.textContent = "Soul urge";
            mess1.textContent = "The soul urge number represents the inner desire and motivation of the person.";
            mess4.textContent = "Your soul urge number is " + document.getElementById('linhhon').textContent;
            break;
        case 'nhancachBtn':
            header.textContent = "Personality";
            mess1.textContent = "Personality number represents how other people will think of a person.";
            mess2.textContent = "It is sometimes called First Impression numbers.";
            mess4.textContent = "Your personality number is " + document.getElementById('nhancach').textContent;
            break;
        case 'lienketlinhhonnhancachBtn':
            header.textContent = "Connection (Soul/Urge - Personality)";
            mess1.textContent = "Sometimes the way people see you is not the way you want to express.";
            mess2.textContent = "This number suggest you how to unify the two of them, how to express what you really meant and avoid unwanted misunderstanding.";
            mess4.textContent = "Your connection number is " + document.getElementById('lienketlinhhonnhancach').textContent;
            break;
        case 'canbangBtn':
            header.textContent = "Balance"
            mess1.textContent = "This number provides guidance on how to best deal with difficult situations."
            mess4.textContent = "Your balance number is " + document.getElementById('canbang').textContent;
            break;
        case 'tuduylytriBtn':
            header.textContent = "Rational thought"
            mess1.textContent = "This number reveals the way you think, how you process your thoughts, like do emotions back it, or is it practical?"
            mess4.textContent = "Your rational thought number is " + document.getElementById('tuduylytri').textContent;
            break;
        case 'sucmanhtiemthucBtn':
            header.textContent = "Subconscious self";
            mess1.textContent = "Subconscious self number can be from talking, writing, meeting new people, performing on stage or controlling the crowd to simply your conduct at the workplace.";
            mess2.textContent = "It lets you know your capabilities, competence, spontaneity and management skills.";
            mess4.textContent = "Your subconscious self number is " + document.getElementById('sucmanhtiemthuc').textContent;
            break;
        case 'sothieuBtn':
            header.textContent = "Imbalance number(s)";
            mess1.textContent = "Imbalance number(s) show(s) your weakness(es) via your fullname.";
            mess2.textContent = "These weakenesses might become unnoticeable as you grow, as you change yourself for the better.";
            mess4.textContent = "Your imbalance number(s) are " + document.getElementById('sothieu').textContent;
            break;
        case 'ngaysinhBtn':
            header.textContent = "Birthday number";
            mess1.textContent = "The birthday number shows your other personality traits, specific abilities and natural talents that will assist you during your life time.";
            mess2.textContent = "It also describes the way others see you.";
            mess4.textContent = "Your birthday number is " + document.getElementById('ngaysinh').textContent;
            break;
        case 'namcanhanBtn':
            header.textContent = "Personal year";
            mess1.textContent = "In Pythagorean Numerology, each of us has a personal year numerical vibration which changes each year in a 9-year cycle.";
            mess2.textContent = "It reveals much about the influences and events you will be experiencing, like a weather forecast - a human forecast.";
            mess4.textContent = "Your personal year number is " + document.getElementById('namcanhan').textContent;
            break;
        case 'thangcanhanBtn':
            header.textContent = "Personal month";
            mess1.textContent = "In Pythagorean Numerology, each of us has a personal month numerical vibration which changes each month in a 9-month cycle.";
            mess2.textContent = "It reveals much about the influences and events you will be experiencing, like a weather forecast - a human forecast.";
            mess4.textContent = "Your personal month number is " + document.getElementById('thangcanhan').textContent;
            break;
        case 'ngaycanhanBtn':
            header.textContent = "Personal day"
            mess1.textContent = "In Pythagorean Numerology, each of us has a personal day numerical vibration which changes each day in a 9-day cycle.";
            mess2.textContent = "It reveals much about the influences and events you will be experiencing, like a weather forecast - a human forecast.";
            mess4.textContent = "Your personal day number is " + document.getElementById('ngaycanhan').textContent;
            break;
        case 'changBtn':
            header.textContent = "Milestones";
            mess1.textContent = "Milestones or Pinnacles are a roadmap of what to expect, the type of experiences we're likely to have.";
            mess2.textContent = "There are four of them, in order, each a major cycle of life. They are likely to deepen your life experience.";
            mess4.textContent = "Your milestones are " + document.getElementById('chang').textContent;
            break;
        case 'tuoiBtn':
            header.textContent = "Milestone ages";
            mess1.textContent = "These numbers are the ages you are, were or will be in your ninth year of the corresponding milestone.";
            mess2.textContent = "They reveal when you're coming to the end of a milestone and starting a new cycle in your next milestone.";
            mess4.textContent = "Your milestone ages are " + document.getElementById('tuoi').textContent;
            break;
        case 'thachthucBtn':
            header.textContent = "Challenges";
            mess1.textContent = "These numbers show you four challenges to be faced during your lives.";
            mess2.textContent = "In some cases, the same challenge is repeated, while others have four distinctly different lessons to learn. Repeated challenges may have different meaning according to their position in your life.";
            mess4.textContent = "Your challenge numbers are " + document.getElementById('thachthuc').textContent;
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
            displayBirthdateMap('vi');
            displayCombinedMap('vi');
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

// Map --->
const frameMap = [[3,6,9], [2,5,8], [1,4,7]];
let emptyTable = [[null,null,null], [null,null,null], [null,null,null]];

function displayBirthdateMap(language) {
    const header = document.createElement('h3');
    if (language == 'en') {header.textContent = "Birthdate Map";}
    if (language == 'vi') {header.textContent = "Bản đồ sức mạnh ngày sinh";}

    const birthday = document.getElementById('birthdate').value;
    const birthdateString = birthday.replace(/\//g, '');
    
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
                    emptyTable[i][j] = frameMap[i][j];
                }
            }
            cell.textContent = cellContent || null;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    matrixContainer.appendChild(header);
    matrixContainer.appendChild(table);
    displayMapComments(false, handleMapArrows(emptyTable), language);
}

function displayCombinedMap(language) {
    const header = document.createElement('h3');
    if (language == 'en') {header.textContent = "Combined Map";}
    if (language =='vi') {header.textContent = "Bản đồ được họ tên bổ trợ";}

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
    const matrixContainer = document.getElementById('combinedMartixContainer');
    const table = document.createElement('table');
    const birthdateTable = document.getElementById('birthdateMatrixContainer').querySelector('table');
    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        const birthdateCells = birthdateTable.querySelectorAll('tr')[i].querySelectorAll('td');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            const birthdateTextNode = document.createTextNode(birthdateCells[j].textContent);
            const birthdateSpan = document.createElement('span');
            birthdateSpan.classList.add('birthdate-text');
            birthdateSpan.appendChild(birthdateTextNode);
            cell.appendChild(birthdateSpan);
            for (let index = 0; index < nCharNumStorage.length; index++) {
                if (nCharNumStorage[index] == frameMap[i][j]) {
                    const nameTextNode = document.createTextNode(nCharNumStorage[index]);
                    const nameSpan = document.createElement('span');
                    nameSpan.classList.add('name-text');
                    nameSpan.appendChild(nameTextNode);
                    cell.appendChild(nameSpan);
                    emptyTable[i][j] = frameMap[i][j];
                }
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    matrixContainer.appendChild(header);
    matrixContainer.appendChild(table);
    displayMapComments(true, handleMapArrows(emptyTable), language);
}

function handleMapArrows(table) {
    const patterns = [
        // Rows
        [[2, 0], [2, 1], [2, 2], "1-4-7"],
        [[1, 0], [1, 1], [1, 2], "2-5-8"],
        [[0, 0], [0, 1], [0, 2], "3-6-9"],
        // Columns
        [[2, 0], [1, 0], [0, 0], "1-2-3"],
        [[2, 1], [1, 1], [0, 1], "4-5-6"],
        [[2, 2], [1, 2], [0, 2], "7-8-9"],
        // Diagonals
        [[2, 0], [1, 1], [0, 2], "1-5-9"],
        [[2, 2], [1, 1], [0, 0], "3-5-7"]
    ];

    const results = [];

    for (const pattern of patterns) {
        const [cell1, cell2, cell3, patternName] = pattern;
        const [i1, j1] = cell1;
        const [i2, j2] = cell2;
        const [i3, j3] = cell3;

        if (table[i1][j1] !== null && table[i2][j2] !== null && table[i3][j3] !== null) {
            results.push({ patternName, status: "filled" });
        } else if (table[i1][j1] === null && table[i2][j2] === null && table[i3][j3] === null) {
            results.push({ patternName, status: "empty" });
        }
    }

    return results;
}

function displayMapComments(combined, results, language) {
    const patternContainer = document.getElementById('patternContainer');
    let cmtHead1 = document.getElementById('cmtHead1');
    let cmt1 = document.getElementById('cmt1');
    let cmtHead2 = document.getElementById('cmtHead2');
    let cmt2 = document.getElementById('cmt2');
    if (language == 'en') {
        if (combined == true) {
            handleComments(patternContainer, cmtHead2, cmt2, language, results, "COMBINED");
        } else {
            handleComments(patternContainer, cmtHead1, cmt1, language, results, "BIRTHDATE");
        }
    } else {
        if (combined == true) {
            handleComments(patternContainer, cmtHead2, cmt2, language, results, "ĐÃ ĐƯỢC HỌ TÊN BỔ TRỢ");
        } else {
            handleComments(patternContainer, cmtHead1, cmt1, language, results, "SỨC MẠNH NGÀY SINH");
        }
    }
    

}

function handleComments(container, cmtHeadSlot, cmtSlot, language, results, combined) {
    patternContainer = container;
    cmtHead = cmtHeadSlot;
    cmt = cmtSlot
    if (language == 'en') {
        if (results.length === 0) {
            cmtHead.textContent = "Your " + combined + " map is balanced.";
            patternContainer.appendChild(cmtHead);
            return;
        } else {
            cmtHead.textContent = "Based on your " + combined + " map, you have the following arrow(s):";
            patternContainer.appendChild(cmtHead);
        }
    
        for (const result of results) {
            const { patternName, status } = result;
            if (status == "filled") {
                switch (patternName) {
                    case "1-2-3":
                        cmt.textContent += " +Planning arrow";
                        break;
                    case "4-5-6":
                        cmt.textContent += " +Willpower arrow";
                        break;
                    case "7-8-9":
                        cmt.textContent += " +Activity arrow";
                        break;
                    case "1-4-7":
                        cmt.textContent += " +Practicality arrow";
                        break;
                    case "2-5-8":
                        cmt.textContent += " +Emotional Balance arrow";
                        break;
                    case "3-6-9":
                        cmt.textContent += " +Intellect arrow";
                        break;
                    case "3-5-7":
                        cmt.textContent += " +Compassion arrow";
                        break;
                    case "1-5-9":
                        cmt.textContent += " +Determination arrow";
                        break;
                    default:
                        break;
                }
            } else if (status == "empty") {
                switch (patternName) {
                    case "4-5-6":
                        cmt.textContent += " -Frustration arrow";
                        break;
                    case "7-8-9":
                        cmt.textContent += " -Hesitation arrow";
                        break;
                    case "1-4-7":
                        cmt.textContent += " -Impracticality arrow";
                        break;
                    case "2-5-8":
                        cmt.textContent += " -Emotional Sensitivity arrow";
                        break;
                    case "3-6-9":
                        cmt.textContent += " -Poor Memory arrow";
                        break;
                    case "3-5-7":
                        cmt.textContent += " -Skepticism arrow";
                        break;
                    case "1-5-9":
                        cmt.textContent += " -Indecision arrow";
                        break;
                    default:
                        break;
                }
            }
            patternContainer.appendChild(cmt);
        }
    }
    if (language == 'vi') {
        if (results.length === 0) {
            cmtHead.textContent = "Bản đồ " + combined + " của bạn cân bằng.";
            return;
        } else {
            cmtHead.textContent = "Dựa vào bản dồ " + combined + ", bạn có những mũi tên sau:";
        }
    
        for (const result of results) {
            const { patternName, status } = result;
            if (status == "filled") {
                switch (patternName) {
                    case "1-2-3":
                        cmt.textContent += " +Mũi tên Kế Hoạch";
                        break;
                    case "4-5-6":
                        cmt.textContent += " +Mũi tên Ý Chí";
                        break;
                    case "7-8-9":
                        cmt.textContent += " +Mũi tên Hành Động";
                        break;
                    case "1-4-7":
                        cmt.textContent += " +Mũi tên Thể Chất";
                        break;
                    case "2-5-8":
                        cmt.textContent += " +Mũi tên Tinh Thần";
                        break;
                    case "3-6-9":
                        cmt.textContent += " +Mũi tên Trí Tuệ";
                        break;
                    case "3-5-7":
                        cmt.textContent += " +Mũi tên Trắc Ẩn";
                        break;
                    case "1-5-9":
                        cmt.textContent += " +Mũi tên Quyết Tâm";
                        break;
                    default:
                        break;
                }
            } else if (status == "empty") {
                switch (patternName) {
                    case "4-5-6":
                        cmt.textContent += " -Mũi tên Uất Hận";
                        break;
                    case "7-8-9":
                        cmt.textContent += " -Mũi tên Thụ Động";
                        break;
                    case "1-4-7":
                        cmt.textContent += " -Mũi tên Thiếu Thực Tế";
                        break;
                    case "2-5-8":
                        cmt.textContent += " -Mũi tên Nhạy Cảm";
                        break;
                    case "3-6-9":
                        cmt.textContent += " -Mũi tên Hay Quên";
                        break;
                    case "3-5-7":
                        cmt.textContent += " -Mũi tên Hoài Nghi";
                        break;
                    case "1-5-9":
                        cmt.textContent += " -Mũi tên Thiếu Quyết Đoán";
                        break;
                    default:
                        break;
                }
            }
        }
    }
}

function clearMap() {
    emptyTable = [[null,null,null], [null,null,null], [null,null,null]];
    var birthdateMatrixContainer = document.getElementById('birthdateMatrixContainer');
    var combinedMartixContainer = document.getElementById('combinedMartixContainer');
    document.getElementById('cmtHead1').textContent = "";
    document.getElementById('cmt1').textContent = "";
    document.getElementById('cmtHead2').textContent = "";
    document.getElementById('cmt2').textContent = "";
    if (!birthdateMatrixContainer || !combinedMartixContainer) {
        return;
    }
    // Remove all child elements from matrixContainer
    while (birthdateMatrixContainer.firstChild || combinedMartixContainer.firstChild) {
        birthdateMatrixContainer.removeChild(birthdateMatrixContainer.firstChild);
        combinedMartixContainer.removeChild(combinedMartixContainer.firstChild);
    }
}
// Map <---

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