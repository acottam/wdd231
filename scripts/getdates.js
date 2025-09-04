// getdates.js
const currentyear = document.querySelector("#currentyear");
const lastmodified = document.querySelector("#lastmodified");

// use the date object
const today = new Date();

// set the text content of the span element with the current year
currentyear.textContent = today.getFullYear();

// set the text content of the span element with the last modified date
lastmodified.textContent = document.lastModified;