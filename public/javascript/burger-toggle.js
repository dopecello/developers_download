const burgerMenuToggler = document.querySelector("#burger-menu");
const nav = document.querySelector(".navbar-menu");

burgerMenuToggler.addEventListener("click", () => {
  nav.classList.toggle("is-active");
});
