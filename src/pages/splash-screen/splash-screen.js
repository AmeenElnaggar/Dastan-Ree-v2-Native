/* ==========================================
   SPLASH SCREEN — video-driven dismissal
   Builds the <video> in JS so there's no fragment fetch
   to fail silently on the host. Falls back to a 6s timeout.
   ========================================== */
export function initSplash(rootSelector = "#splash-root") {
  var splash = document.querySelector(rootSelector);
  if (!splash) return;

  var video = document.createElement("video");
  video.id = "splash-video";
  video.className = "splash__video";
  video.autoplay = true;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("muted", "");
  video.preload = "auto";
  // Anchor video URL to this module so cPanel deploys resolve it predictably.
  video.src = new URL("../../assets/videos/splash.mp4", import.meta.url).href;
  splash.appendChild(video);

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

  video.addEventListener("ended", dismiss);
  video.addEventListener("error", function () {
    console.warn("[splash] video failed:", video.error, "src=", video.currentSrc);
    dismiss();
  });

  var playAttempt = video.play();
  if (playAttempt && typeof playAttempt.catch === "function") {
    playAttempt.catch(function (err) {
      console.warn("[splash] play() rejected:", err);
      dismiss();
    });
  }

  setTimeout(dismiss, 6000);
}
