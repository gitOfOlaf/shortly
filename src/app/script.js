class Generator {
  constructor() {
    this.burger = document.querySelector(".burger");
    this.form = document.querySelector("form");
    this.mobileMenu = document.querySelector(".mobile-menu");
    this.input = document.querySelector("input");
    this.errorMsg = document.querySelector(".errorMsg");
    this.generatedLinksContainer = document.querySelector(".generated--links");
    this.mainContainer = document.querySelector(".links--generator");
    this.validDomainTest =
      /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z]{2,}){1,}$/i;

    this.burger.addEventListener("click", this._toggleMenuBar.bind(this));
    this.form.addEventListener("submit", this._submitForm.bind(this));
    this.mainContainer.addEventListener(
      "click",
      this._copyToClipboard.bind(this)
    );
  }

  _toggleMenuBar() {
    this.burger.classList.toggle("toggle");
    this.mobileMenu.classList.toggle("translate-x-[120%]");
  }

  _inputValidator() {
    return this.validDomainTest.test(this.input.value);
  }

  _throwError() {
    this.input.style.borderColor = "hsl(0, 87%, 67%)";
    this.input.style.borderWidth = "2px";
    this.input.style.color = "hsl(0, 87%, 67%)";
    this.errorMsg.classList.remove("hidden");

    setTimeout(() => {
      this.input.style.borderColor = "transparent";
      this.input.style.borderWidth = "0px";
      this.input.style.color = "black";
      this.errorMsg.classList.add("hidden");
    }, 5000);
  }

  async _fetchRequest(url) {
    try {
      const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
      const data = await res.json();

      if (!res.ok) throw new Error("something went wrong");

      const originalURL = data.result.original_link;
      const shortURL = data.result.full_short_link;
      this._renderGeneratedLink(originalURL, shortURL);
    } catch (err) {
      console.log(err.message);
    }
  }

  _renderGeneratedLink(originalURL, shortURL) {
    let html = `
    <div class="link items-center justify-between p-5 lg:flex" draggable="true">
        <p class="text-sm lg:text-base">
          <a href="${originalURL}" target=_"blank">${originalURL}</a>
        </p>
         <div class="link--section--copy mt-2 flex flex-col border-t border-grayishViolet lg:mt-0 lg:flex-row lg:items-center lg:border-none">
          <p class="cursor-pointer py-2 text-xs text-cyan hover:underline lg:py-0 lg:pr-2 lg:text-sm">
           <a href="${shortURL}" target=_"blank">${shortURL}</a>
          </p>
            <button class="copy w-full rounded bg-cyan px-5 py-2 text-sm text-white lg:w-auto">Copy</button>
        </div>
  </div>`;

    this.generatedLinksContainer.insertAdjacentHTML("beforebegin", html);
  }

  _copyToClipboard(e) {
    const copyBtn = e.target.closest(".copy");
    if (!copyBtn) return;

    // accessing the shortURL index / position
    const link =
      copyBtn.parentElement.previousElementSibling.textContent.trim();

    // copy text to clipboard
    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log(`Copied "${link}" to clipboard`);
        copyBtn.textContent = "Copied!";
        copyBtn.style.backgroundColor = "hsl(257, 27%, 26%)";

        setTimeout(() => {
          copyBtn.textContent = "Copy";
          copyBtn.style.backgroundColor =
            "hsl(180 66% 49% / var(--tw-bg-opacity))";
        }, 1000);
      })
      .catch((error) => {
        console.error(`Error copying text: ${error}`);
      });
  }

  _submitForm(e) {
    e.preventDefault();

    if (this._inputValidator()) {
      this._fetchRequest(this.input.value);
      console.log("submitted!");
      this.input.value = "";
    } else {
      this._throwError();
      console.log("wrong format!");
    }
  }
}

const gen = new Generator();
