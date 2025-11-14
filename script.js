let currentScreen = document.getElementById("screen main");
showScreen("screen main");

function showScreen(screenId) {
    currentScreen.classList.remove("active");
    currentScreen = document.getElementById(screenId);
    currentScreen.classList.add("active");
}

