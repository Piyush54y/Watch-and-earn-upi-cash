const maxAdsPerDay = 100;
let adsWatched = parseInt(localStorage.getItem('adsWatched')) || 0;
const countDisplay = document.getElementById('count');
countDisplay.textContent = adsWatched;

const startBtn = document.getElementById('startBtn');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const timerDisplay = document.getElementById('timer');
const secondsText = document.getElementById('seconds');
const withdrawForm = document.getElementById('withdrawForm');

startBtn.addEventListener('click', () => {
  if (adsWatched >= maxAdsPerDay) {
    alert('🎉 You’ve already watched 100 ads today!');
    return;
  }

  let countdown = 10;
  progressContainer.style.display = "block";
  timerDisplay.style.display = "block";
  secondsText.textContent = countdown;
  progressBar.style.width = "0%";

  const interval = setInterval(() => {
    countdown--;
    secondsText.textContent = countdown;
    progressBar.style.width = `${(10 - countdown) * 10}%`;

    if (countdown <= 0) {
      clearInterval(interval);
      openAd();
    }
  }, 1000);
});

function openAd() {
  adsWatched++;
  localStorage.setItem('adsWatched', adsWatched);
  countDisplay.textContent = adsWatched;

  // Open Monetag ad in new tab
  window.open("https://fpyf8.com/88/tag.min.js", "_blank");

  // Hide timer
  progressContainer.style.display = "none";
  timerDisplay.style.display = "none";

  // Show withdraw form if eligible
  if (adsWatched >= maxAdsPerDay) {
    withdrawForm.style.display = "block";
  }
}

withdrawForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const upi = document.getElementById('upi').value;

  const webhookURL = "https://script.google.com/macros/s/YOUR-SCRIPT-ID/exec"; // Replace with yours

  fetch(webhookURL, {
    method: "POST",
    body: JSON.stringify({ name, upi, adsWatched }),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    alert("✅ Withdrawal request sent. ₹5 will be paid to your Paytm UPI soon.");
  }).catch(err => {
    alert("❌ Error submitting withdrawal. Try again later.");
  });
});
