# Frontend Mentor - Shortly URL shortening API Challenge solution

This is a solution to the [Shortly URL shortening API Challenge challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Your challenge is to build out this landing page, integrate with the [shrtcode API](https://app.shrtco.de/) and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

Your users should be able to:

- View the optimal layout for the site depending on their device's screen size
- Shorten any valid URL
- See a list of their shortened links, even after refreshing the browser
- Copy the shortened link to their clipboard in a single click
- Receive an error message when the `form` is submitted if:
  - The `input` field is empty

### Screenshot

![](<./src//screenshots/Screenshot%20(138).png>)
![](<./src//screenshots/Screenshot%20(139).png>)
![](<./src//screenshots/Screenshot%20(140).png>)
![](<./src//screenshots/Screenshot%20(141).png>)

### Links

- Solution URL: [Solution URL here](https://www.frontendmentor.io/solutions/url-shortener-built-using-tailwind-vanilla-js-html-sass-parcel-niSwvRnJfo)
- Live Site URL: [Live site URL here](https://shortcutlify.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Scss / Sass
- Mobile-first workflow
- Vanilla JS
- [Tailwind](https://tailwindcss.com/docs/installation) - CSS Framework
- [Parcel](https://parceljs.org/) - Build Tool

### What I learned

I learnt how to copy items unto the clipboard using the navigator.clipboard `API`

```js
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
```

### Continued development

I'll continue developing myself in becoming a better programmer. I think I'm getting the hang of using OOP in my projects. If there's one visbile benefit of using OOP in any project, it's avoiding to write spaghetti codes.

Using OOP paradigm makes coding so much easier and less complicated at least if one understands the concepts.
I can easily come back to read my codes without really having to think much about what does what ever again!

### Useful resources

- [Tailwind](https://tailwindcss.com/docs/installation) - CSS Framework, used to build and style the website much faster.
- [Parcel](https://parceljs.org/) - Build Tool, used for compiling and minifying my files
- [ShrtCode](https://shrtco.de/) - API used to shorten URL's using the `GET` Request.

## Author

- Website - [Abdullah Ayoola](https://github.com/abdullah43577)
- Frontend Mentor - [@abdullah43577](https://www.frontendmentor.io/profile/abdullah43577)
- Twitter - [@officialayo540](https://twitter.com/officialayo540)
