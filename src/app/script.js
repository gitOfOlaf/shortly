class Generator {
  constructor() {
    this.burger = document.querySelector(".burger");
    this.form = document.querySelector("form");
    this.mobileMenu = document.querySelector(".mobile-menu");

    this.burger.addEventListener("click", this._toggleMenuBar.bind(this));
    this.form.addEventListener("submit", this._submitForm.bind(this));
  }

  _toggleMenuBar() {
    this.burger.classList.toggle("toggle");
    this.mobileMenu.classList.toggle("translate-x-[120%]");
  }

  _submitForm(e) {
    e.preventDefault();
    console.log("submitted");
  }
}

const gen = new Generator();
