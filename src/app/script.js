class Generator {
  #taskInfo = JSON.parse(localStorage.getItem("URLs")) || [];
  #index = this.#taskInfo.length;
  constructor() {
    this.burger = document.querySelector(".burger");
    this.form = document.querySelector("form");
    this.mobileMenu = document.querySelector(".mobile-menu");
    this.input = document.querySelector("input");
    this.errorMsg = document.querySelector(".errorMsg");
    this.generatedLinksContainer = document.querySelector(".generated--links");
    this.mainContainer = document.querySelector(".links--generator");
    this.validDomainTest =
      /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z]+){1,}(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i;

    this.burger.addEventListener("click", this._toggleMenuBar.bind(this));
    this.form.addEventListener("submit", this._submitForm.bind(this));
    this.mainContainer.addEventListener(
      "click",
      this._copyToClipboard.bind(this)
    );
    this._renderGeneratedLink();
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

      if (!res.ok)
        throw new Error(
          "something went wrong, make sure your search query is inputted correctly!"
        );

      const originalURL = data.result.original_link;
      const shortURL = data.result.full_short_link;

      let storage = {
        id: ++this.#index,
        short_URL: shortURL,
        long_URL: originalURL,
      };

      this.#taskInfo.push(storage);
      // storing items into localStorage
      localStorage.setItem("URLs", JSON.stringify(this.#taskInfo));

      this._renderGeneratedLink();
    } catch (err) {
      console.log(
        `Something went wrong, make sure you're connected to the internet ${err.message}`
      );
    }
  }

  _renderGeneratedLink() {
    let html = "";
    if (this.#taskInfo) {
      this.#taskInfo.forEach((task) => {
        html += `
        <div class="link items-center justify-between p-5 lg:flex" draggable="true">
            <p class="text-sm lg:text-base">
              <a href="${task.long_URL}" target=_"blank">${task.long_URL}</a>
            </p>
             <div class="link--section--copy mt-2 flex flex-col border-t border-grayishViolet lg:mt-0 lg:flex-row lg:items-center lg:border-none">
              <p class="cursor-pointer py-2 text-xs text-cyan hover:underline lg:py-0 lg:pr-2 lg:text-sm">
               <a href="${task.short_URL}" target=_"blank">${task.short_URL}</a>
              </p>
                <button class="copy w-full rounded bg-cyan px-5 py-2 text-sm text-white lg:w-auto">Copy</button>
            </div>
      </div>`;
      });

      this.generatedLinksContainer.innerHTML = html;
    }
  }

  _copyToClipboard(e) {
    const copyBtn = e.target.closest(".copy");
    if (!copyBtn) return;

    // accessing the shortURL index / position
    const link = copyBtn.previousElementSibling.textContent.trim();

    // copy text to clipboard
    navigator.clipboard
      .writeText(link)
      .then(() => {
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
      this.input.value = "";
    } else {
      this._throwError();
    }
  }
}

const gen = new Generator();
