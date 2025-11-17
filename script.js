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
