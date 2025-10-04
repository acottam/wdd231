const KEY = "reviewCount";
let count = Number(localStorage.getItem(KEY) || 0);
count += 1;
localStorage.setItem(KEY, String(count));

const out = document.getElementById("review_count");
if (out) out.textContent = count.toString();
