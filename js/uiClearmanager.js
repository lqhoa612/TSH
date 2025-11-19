// uiClearManager.js

export function clearUI() {
    // Clear bottom-right message box
    const msg1 = document.getElementById("message1");
    const msg2 = document.getElementById("message2");
    const msg3 = document.getElementById("message3");
    const msg4 = document.getElementById("message4");

    if (msg1) msg1.textContent = "";
    if (msg2) msg2.textContent = "";
    if (msg3) msg3.textContent = "";
    if (msg4) msg4.textContent = "";

    // Clear MAPS (birth / combined)
    const birth = document.getElementById("birthdate-map");
    const combined = document.getElementById("combined-map");
    const bc = document.getElementById("birth-comments");
    const cc = document.getElementById("combined-comments");

    if (birth) birth.innerHTML = "";
    if (combined) combined.innerHTML = "";
    if (bc) bc.innerHTML = "";
    if (cc) cc.innerHTML = "";

    // Clear Calendars
    const calendar = document.getElementById("personalCalendar");
    if (calendar) calendar.innerHTML = "";
}
