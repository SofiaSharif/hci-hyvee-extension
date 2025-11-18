let currentScreen = document.getElementById("screen main");
showScreen("screen main");

function showScreen(screenId) {
    currentScreen.classList.remove("active");
    currentScreen = document.getElementById(screenId);
    currentScreen.classList.add("active");
}

const API_URL = 'http://localhost:3001';

async function fetchPrescriptions() {
    const prescriptionList = document.getElementById("prescription-list");
    
    try {
        const response = await fetch(`${API_URL}/api/prescriptions`);
        const prescriptions = await response.json();

        prescriptionList.innerHTML = ''; 

        if (prescriptions.length === 0) {
            alert("No prescriptions to show.");
            return;
        }

        prescriptions.forEach(rx => {
            const card = document.createElement('div');
            card.className = 'rx-container';

            card.innerHTML = `
                <p class="rx-title"> ${rx.name} </p>
                    <div class="rx-btn-icons">
                        <button id="cart-btn" class="rx-btn-icons">
                            <img src="assests/screen-icons/cart.png" alt="Cart Icon">
                        </button>
                        <button id="more-btn" class="rx-btn-icons">
                            <img src="assests/screen-icons/ellipses.png" alt="More Icon">
                        </button>
                    </div>
                    <div class="rx-amount rx-box">
                        <img class="rx-icon-size" src="assests/screen-icons/amount.png" alt="Amount Icon">
                        <p> ${rx.amount} </p>
                    </div>
                    <div class="rx-time rx-box">
                        <img class="rx-icon-size" src="assests/screen-icons/clock.png" alt="Time Icon">
                        <p> ${rx.time_to_take} </p>
                    </div>
                    <details class="rx-description">
                        <summary class="text-underline"> More Prescription Information </summary>
                        ${rx.description}
                    </details>
            `;

            prescriptionList.appendChild(card);
        });

    } catch (error) {
        alert("Error fetching prescriptions.");
        console.log(error);
    } 
    
}

const refillsBtn = document.getElementById("refills-btn");

refillsBtn.onclick = () => {
    showScreen('screen refills');
    fetchPrescriptions();
}

function generateAddReminderTimeDivs() {
    let hour_select = document.getElementById("add-reminder-hour-select");
    let minute_select = document.getElementById("add-reminder-minute-select");
    for (let i = 1; i <= 12; i++) {
        let new_option = document.createElement("option");
        new_option.textContent = i;
        new_option.id = `hour-select-option-${i}`;
        hour_select.appendChild(new_option);
    }
    document.getElementById("hour-select-option-1").selected = "selected";
    for (let i = 0; i <= 60; i++) {
        let new_option = document.createElement("option");
        if (i < 10) {
            new_option.textContent = `0${i}`;
        } else {
            new_option.textContent = i;
        }
        new_option.id = `minute-select-option-${i}`;
        minute_select.appendChild(new_option);
    }
    document.getElementById("minute-select-option-0").selected = "selected";
}

function addNewReminder() {
    let main_container = document.getElementById("reminders-main-container");
    alert = document.getElementById("add-reminder-alert");
    medication_input = document.getElementById("add-reminder-medication-input");
    let hour_select = document.getElementById("add-reminder-hour-select");
    let minute_select = document.getElementById("add-reminder-minute-select");
    if (medication_input.value === "") {
        alert.textContent = "ERROR: No Medication";
        alert.classList = "error";
    } else {
        alert.textContent = `Added Reminder for: ${document.getElementById("add-reminder-medication-input").value}`;
        alert.classList = "added";
        let reminder_container = document.createElement("div");
        reminder_container.classList = "reminder-container";
        //Creating Top Bar
        let reminder_container_top_bar = document.createElement("div");
        reminder_container_top_bar.classList = "reminder-container-top-bar";
        let medication_name = medication_input.value;
        let reminder_title = document.createElement("u");
        reminder_title.classList = "reminder-title";
        reminder_title.textContent = medication_name;
        reminder_container_top_bar.appendChild(reminder_title);
        let reminder_btn = document.createElement("button");
        reminder_btn.classList = "reminder-btn-icons";
        let reminder_btn_icon = document.createElement("img");
        reminder_btn_icon.src = "assests/screen-icons/ellipses.png";
        reminder_btn_icon.alt= "More Icon";
        reminder_btn.appendChild(reminder_btn_icon);
        reminder_container_top_bar.appendChild(reminder_btn);
        reminder_container.appendChild(reminder_container_top_bar);
        //Creating Time Display
        let time_display = document.createElement("b");
        time_display.classList = "reminder-time-display";
        let selected_hour = hour_select.value;
        let selected_minute = minute_select.value;
        let selected_meridiem = document.getElementById("add-reminder-meridiem-select").value;
        time_display.textContent = `${selected_hour}:${selected_minute} ${selected_meridiem}`;
        reminder_container.appendChild(time_display);
        // Creating div of days selected
        let days_selected_div = document.createElement("div");
        let days_text_array = ["M", "T", "W", "TH", "F", "S", "SU"];
        for (let i=0; i<7; i++) {
            let day_check_box = document.getElementById(`day-check-${i}`);
            let day_checked = day_check_box.checked;
            let day_label = document.createElement("label");
            if (day_checked) {
                day_label.classList = "reminders-screen reminder-day clicked";
            } else {
                day_label.classList = "reminders-screen reminder-day";
            }
            day_label.textContent = days_text_array[i];
            days_selected_div.appendChild(day_label);
        }
        reminder_container.appendChild(days_selected_div);
        // Add new remainder_container to main_container which contains all previous remainders
        main_container.appendChild(reminder_container);
    }
}

function reminderGoBack(screenId) {
    showScreen(screenId);
    // Clear add reminder screen
    alert = document.getElementById("add-reminder-alert");
    alert.textContent = "";
    medication_input.value = "";
    for (let i=0; i<7; i++) {
        let day_check_box = document.getElementById(`day-check-${i}`);
        let day_checked = day_check_box.checked;
        if (day_checked) {
            day_check_box.checked = false;
        }
    }
}

generateAddReminderTimeDivs();