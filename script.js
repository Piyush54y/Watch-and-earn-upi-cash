
function openAd() {
  adsWatched++;
  localStorage.setItem('adsWatched', adsWatched);
  countDisplay.textContent = adsWatched;

  // Open separate ad page in new tab
  window.open("ad.html", "_blank");

  // Hide timer & progress bar
  progressContainer.style.display = "none";
  timerDisplay.style.display = "none";

  // Show withdraw form if eligible
  if (adsWatched >= maxAdsPerDay) {
    withdrawForm.style.display = "block";
  }
}
