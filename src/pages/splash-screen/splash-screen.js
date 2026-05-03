/* ==========================================
   SPLASH SCREEN — video-driven dismissal
   Exits when the video ends, with a 6s safety fallback.
   ========================================== */
export async function initSplash(rootSelector = "#splash-root") {
  var splash = document.querySelector(rootSelector);
  if (!splash) return;

  // Anchor fragment + video URLs to this module so paths resolve
  // independently of which page mounts the splash.
  try {
    var fragmentUrl = new URL("./index.html", import.meta.url);
    var res = await fetch(fragmentUrl);
    if (res.ok) splash.innerHTML = await res.text();
  } catch (_) {}

  var video = document.getElementById("splash-video");
  if (video) {
    video.src = new URL("../../assets/videos/splash.mp4", import.meta.url).href;
  }

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
