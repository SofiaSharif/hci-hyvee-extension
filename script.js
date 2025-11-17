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
            card.className = 'hist-container';

            card.innerHTML = `
                <p class="hist-title"> ${rx.name} </p>
                    <div class="hist-btn-icons">
                        <button id="cart-btn" class="hist-btn-icons">
                            <img src="assests/screen-icons/cart.png" alt="Cart Icon">
                        </button>
                        <button id="more-btn" class="hist-btn-icons">
                            <img src="assests/screen-icons/ellipses.png" alt="More Icon">
                        </button>
                    </div>
                    <div class="hist-amount hist-box">
                        <img class="hist-icon-size" src="assests/screen-icons/amount.png" alt="Amount Icon">
                        <p> ${rx.amount} </p>
                    </div>
                    <div class="hist-time hist-box">
                        <img class="hist-icon-size" src="assests/screen-icons/clock.png" alt="Time Icon">
                        <p> ${rx.time_to_take} </p>
                    </div>
                    <details class="hist-description">
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
