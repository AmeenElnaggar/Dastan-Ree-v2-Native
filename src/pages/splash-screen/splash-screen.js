/* ==========================================
     SPLASH SCREEN — video-driven dismissal
     Exits when the video ends, with a 6s safety fallback.
     ========================================== */
export function initSplash() {
  var splash = document.getElementById("splash");
  if (!splash) return;

  var video = document.getElementById("splash-video");

  document.body.classList.add("splash-active");

  var dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    splash.classList.add("splash--done");
    setTimeout(function () {
      document.body.classList.remove("splash-active");
      splash.remove();
    }, 600);
  }

  if (video) {
    video.addEventListener("ended", dismiss);
    video.addEventListener("error", dismiss);
    var playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(dismiss);
    }
  }

  setTimeout(dismiss, 6000);
}
