// get Elements from the document
const radiusOutput = document.getElementById('radius');
const areaOutput = document.querySelector('#area');
let babygender = 'Boy';

const reveal = document.getElementById('reveal');
reveal.textContent = `🎉 Congratulations! You are having a <strong>${babygender}</strong>!`;

let area = 0;
const PI = 3.14159;

let radius = 10;
area = PI * radius * radius;
radiusOutput.textContent = radius;
areaOutput.textContent = area;

radius = 20;
area = PI * radius * radius;
radiusOutput.textContent = radius;
areaOutput.textContent = area;


