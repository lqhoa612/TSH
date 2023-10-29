#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <unordered_map>
#include <ctime>

using namespace std;

int reduceToSingleDigit(int num, bool allowMaster) {
    if (allowMaster == true) {
        if (num == 11 || num == 22 || num == 33)
            return num;
    }

    if (num <= 9)
            return num;

    while (num > 9)
    {
        int sum = 0;
        while (num > 0) {
            if (allowMaster == true) {
                if (num == 11 || num == 22 || num == 33)
                    return num;
            }
            sum += num % 10;
            num /= 10;
        }
        num = sum;
    }

    return num;
}
bool isVowel(char c) {
    char chth = tolower(c);
    return chth == 'a' || chth == 'e' || chth == 'i' || chth == 'o' || chth == 'u';
}

void TSH(string name, string birthdate) {
    //Get system date
    time_t currentTime;
    time(&currentTime);
    struct tm localTime;
    if (localtime_s(&localTime, &currentTime) != 0) {
        cerr << "Failed to get local time." << endl;
    }
    int currentYear = localTime.tm_year + 1900;
    int currentMonth = localTime.tm_mon + 1;
    int currentDay = localTime.tm_mday;

    //1 Lifepath
    int duongdoi = 0;
    for (char c : birthdate) {
        if (isdigit(c)) {
            duongdoi += c - '0';
        }
    }
    duongdoi = reduceToSingleDigit(duongdoi, true);
    cout << "Duong Doi: " << duongdoi << endl;

    //2 Destiny
    int sumenh = 0;
    vector<int> nameInNum; //for sothieu
    for (char c : name) {
        if (isalpha(c)) {
            char lowercaseChar = tolower(c);
            int charValue = lowercaseChar - 'a' + 1;
            sumenh += charValue;
            nameInNum.push_back(reduceToSingleDigit(charValue, false)); //for sothieu
        }
    }
    sumenh = reduceToSingleDigit(sumenh, true);
    cout << "Su Menh: " << sumenh << endl;

    //3 Lifepath - Destiny Bridge
    int lienket = 0;
    lienket = reduceToSingleDigit(abs(duongdoi - sumenh), false);
    cout << "Lien ket DuongDoi-SuMenh: " << lienket << endl;

    //4 Growth
    int truongthanh = 0;
    truongthanh = reduceToSingleDigit(duongdoi + sumenh, true);
    cout << "Truong Thanh: " << truongthanh << endl;

    //5 Soul Urge
    int linhhon = 0;
    bool previousCharIsVowel = false;
    for (char c : name) {
        if (isalpha(c) != 0) {
            char chth = tolower(c);
            if (isVowel(chth) == true) {
                switch (chth) {
                case 'a':
                    linhhon += 1;
                    previousCharIsVowel = true;
                    break;
                case 'e':
                    linhhon += 5;
                    previousCharIsVowel = true;
                    break;
                case 'i':
                    linhhon += 9;
                    previousCharIsVowel = true;
                    break;
                case 'o':
                    linhhon += 6;
                    previousCharIsVowel = true;
                    break;
                case 'u':
                    linhhon += 3;
                    previousCharIsVowel = true;
                    break;
                default:
                    linhhon += 0;
                    previousCharIsVowel = false;
                    break;
                }
            }
            else if (chth == 'y' && previousCharIsVowel == false) {
                linhhon += 7;
                previousCharIsVowel = true;
            }
            else {
                previousCharIsVowel = false;
            }
        }
    }
    linhhon = reduceToSingleDigit(linhhon, true);
    cout << "Linh Hon: " << linhhon << endl;

    //6 Character
    int nhancach = 0;
    for (char c : name) {
        if (isalpha(c) != 0) {
            char chth = tolower(c);
            if (chth != 'a' && chth != 'e' &&
                chth != 'i' && chth != 'o' &&
                chth != 'u') {
                // Calculate the numerical value of the consonant
                int charValue = chth - 'a' + 1;
                nhancach += charValue;
            }
        }
    }
    nhancach = reduceToSingleDigit(nhancach, true);
    cout << "Nhan Cach: " << nhancach << endl;

    //7 Soul Urge - Character Bridge
    int lienket_lhnc = 0;
    lienket_lhnc = reduceToSingleDigit(abs(reduceToSingleDigit(linhhon, false) - reduceToSingleDigit(nhancach, false)), false);
    cout << "Lien ket LinhHon-NhanCach: " << lienket_lhnc << endl;

    //8 Balance
    int canbang = 0;
    bool isInitialLetter = false;
    for (char c : name) {
        if (isalpha(c) != 0 && isInitialLetter == false) {
            char chth = tolower(c);
            int charValue = chth - 'a' + 1;
            canbang += charValue;
            isInitialLetter = true;
        }
        if (isInitialLetter == true && isalpha(c) != 0);
        else isInitialLetter = false;
    }
    canbang = reduceToSingleDigit(canbang, true);
    cout << "Can Bang: " << canbang << endl;

    //9 Rational Thinking
    int tuduylytri = 0;
    size_t lastSpacePosition = name.find_last_of(' ');
    size_t firstSlashPosition = birthdate.find_first_of('/');
    string ten, ngay;
    if (firstSlashPosition != string::npos) ngay = birthdate.substr(0, firstSlashPosition);
    if (lastSpacePosition != string::npos) ten = name.substr(lastSpacePosition + 1);
    else ten = name;

    int tenTemp = 0;
    for (char c : ten) {
        if (isalpha(c)) {
            char lowercaseChar = tolower(c);
            int charValue = lowercaseChar - 'a' + 1;
            tenTemp += charValue;
        }
    }
    tenTemp = reduceToSingleDigit(tenTemp, false);

    int ngayTemp = 0;
    for (char c : ngay) {
        if (isdigit(c)) {
            ngayTemp += c - '0';
        }
    }
    ngayTemp = reduceToSingleDigit(ngayTemp, false);
    
    tuduylytri = reduceToSingleDigit(tenTemp + ngayTemp, true);
    cout << "Tu Duy Ly Tri: " << tuduylytri << endl;

    //10 Subconcious Power + Missing Number(s)
    int sumanhtiemthuc = 0;
    vector<int> sothieu;
    sort(nameInNum.begin(), nameInNum.end());

    for (int i = 1; i <= 9; i++) {
        if (!std::binary_search(nameInNum.begin(), nameInNum.end(), i)) {
            sothieu.push_back(i);
        }
    }

    sumanhtiemthuc = 9 - sothieu.size();
    cout << "Suc Manh Tiem Thuc: " << sumanhtiemthuc << endl;

    cout << "So Thieu: ";
    if (!sothieu.empty()) {
        for (int i : sothieu)
            cout << i << " ";
        cout << endl;
    }
    else cout << "0" << endl;

    //11 Birthday
    int ngaysinh = (birthdate.at(0) - '0') + (birthdate.at(1) - '0');
    ngaysinh = reduceToSingleDigit(ngaysinh, true);
    cout << "Ngay Sinh: " << ngaysinh << endl;

    //12 Passion
    int damme = 0;
    unordered_map<int, int> countMap;
    int maxCount = 0;
    for (int i : nameInNum) {
        countMap[i]++;
        if (countMap[i] > maxCount) {
            maxCount = countMap[i];
            damme = i;
        }
    }
    cout << "Dam Me: " << damme << endl;

    //13 Personal Year
    int namcanhan = 0;
    int thangsinh = (birthdate.at(3) - '0') + (birthdate.at(4) - '0');
    thangsinh = reduceToSingleDigit(thangsinh, false);
    namcanhan = ngaysinh + thangsinh + reduceToSingleDigit(currentYear, false);
    namcanhan = reduceToSingleDigit(namcanhan, false);
    cout << "Nam Ca Nhan: " << namcanhan << endl;

    //14 Personal Month
    int thangcanhan = 0;
    thangcanhan = namcanhan + reduceToSingleDigit(currentMonth, false);
    thangcanhan = reduceToSingleDigit(thangcanhan, false);
    cout << "Thang Ca Nhan: " << thangcanhan << endl;

    //15 Personal Day
    int ngaycanhan = 0;
    ngaycanhan = thangcanhan + reduceToSingleDigit(currentDay, false);
    ngaycanhan = reduceToSingleDigit(ngaycanhan, false);
    cout << "Ngay Ca Nhan: " << thangcanhan << endl;

    //16 Milestones
    vector<int> chang = {0, 0, 0, 0};
    int namsinh = (birthdate.at(6) - '0') + (birthdate.at(7) - '0') + (birthdate.at(8) - '0') + (birthdate.at(9) - '0');
    namsinh = reduceToSingleDigit(namsinh, false);
    chang.at(0) = reduceToSingleDigit(ngaysinh + thangsinh, true);
    chang.at(1) = reduceToSingleDigit(ngaysinh + namsinh, true);
    chang.at(2) = reduceToSingleDigit(chang.at(0) + chang.at(1), true);
    chang.at(3) = reduceToSingleDigit(thangsinh + namsinh, true);
    cout << "Chang: ";
    for (int i : chang)
        cout << i << " ";
    cout << endl;

    //17 Challenges
    vector<int> thachthuc = { 0, 0, 0, 0 };
    thachthuc.at(0) = abs(ngaysinh - thangsinh);
    thachthuc.at(1) = abs(ngaysinh - namsinh);
    thachthuc.at(2) = abs(chang.at(0) - chang.at(1));
    thachthuc.at(3) = abs(thangsinh - namsinh);
    cout << "Thach Thuc: ";
    for (int i : thachthuc)
        cout << i << " ";
    cout << endl;
}

int main() {
    string birthdate = ("17/02/2000");
    cout << birthdate << endl;
    string name = ("dao thi huong tra");
    cout << name << endl;
    TSH(name, birthdate);
}
