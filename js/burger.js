document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".header__burger");
    burger.onclick = () => document.body.classList.toggle("opened");
});
