const loginSection = document.querySelector(".login-center");
const loginForm = loginSection.querySelector(".login");
const loginInput = loginForm.querySelector("input");
const main = document.querySelector(".main");
const mainMessage = main.querySelector("h1");

const logoutBtn = main.querySelector(".logout button");

const HIDDEN_CLASS_NAME = "hidden";
const NAME_KEY = "name_GbbQIrtf3b3AhLb7FjaOCPTDm";

const savedName = localStorage.getItem(NAME_KEY);

function showMainMessage(name) {
    loginSection.classList.add(HIDDEN_CLASS_NAME);
    main.classList.remove(HIDDEN_CLASS_NAME);
    mainMessage.innerText = `Hello. ${name} Welcome to word world.`;
}

loginForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    localStorage.setItem(NAME_KEY, loginInput.value);
    showMainMessage(loginInput.value);
});

logoutBtn.addEventListener("click", (evt) => {
    localStorage.clear();
})

if (savedName === null) {
    main.classList.add(HIDDEN_CLASS_NAME);
} else {
    showMainMessage(savedName);
}