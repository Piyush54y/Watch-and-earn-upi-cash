
function openAd() {
  adsWatched++;
  localStorage.setItem('adsWatched', adsWatched);
  countDisplay.textContent = adsWatched;

  // Open blank tab and inject MultiTag ad code
  const adWindow = window.open("", "_blank");

  if (adWindow) {
    adWindow.document.write(`
      <html>
        <head>
          <title>Ad Loading...</title>
        </head>
        <body>
          <script src="https://fpyf8.com/88/tag.min.js" data-zone="162210" async data-cfasync="false"></script>
        </body>
      </html>
    `);
    adWindow.document.close();
  } else {
    alert("Please allow pop-ups for this site to open ads.");
  }

  // Hide timer & progress bar
  progressContainer.style.display = "none";
  timerDisplay.style.display = "none";

  // Show withdraw form if eligible
  if (adsWatched >= maxAdsPerDay) {
    withdrawForm.style.display = "block";
  }
}
