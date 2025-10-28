let currentScreen = document.getElementById("screen main");
showScreen("screen main");

function showScreen(screenId) {
    currentScreen.classList.remove("active");
    currentScreen = document.getElementById(screenId);
    currentScreen.classList.add("active");
}

function updateHeaderHeight() {
    const header = document.querySelector('header');
    if (!header) return;
    const height = header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', height + 'px');
}

window.addEventListener('load', updateHeaderHeight);
window.addEventListener('resize', updateHeaderHeight);

const headerElement1 = document.querySelector('header');
if (headerElement1 && window.MutationObserver) {
    const mutationObserver = new MutationObserver(updateHeaderHeight);
    mutationObserver.observe(headerElement1, { attributes: true, childList: true, subtree: true });
}