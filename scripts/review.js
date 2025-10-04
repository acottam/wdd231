// ---- Review Count ---- //
const KEY = "reviewCount";
let count = Number(localStorage.getItem(KEY) || 0);
count += 1;

// ---- Store Review Count ---- //
localStorage.setItem(KEY, String(count));

// ---- Set Review count ---- //
const review_count = document.getElementById("review_count");
if (review_count) review_count.textContent = count.toString();
