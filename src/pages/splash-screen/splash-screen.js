/* ==========================================
     SPLASH SCREEN — orchestration + cleanup
     Timeline: draw(0-2s) → fill(1.8s) → words(1.6-1.85s)
               → sweep(2.2s) → exit(3s) → remove(3.6s)
     ========================================== */
export function initSplash() {
  var splash = document.getElementById("splash");
  if (!splash) return;

  // Lock scroll during splash
  document.body.classList.add("splash-active");

  // At 1.9s: begin exit animation (animations finish ~1.7s)
  setTimeout(function () {
    splash.classList.add("splash--exit");
  }, 1900);

  // At 2.5s: fade the entire overlay out
  setTimeout(function () {
    splash.classList.add("splash--done");
  }, 2500);

  // At 3.1s: remove from DOM + unlock scroll (after 600ms fade transition)
  setTimeout(function () {
    document.body.classList.remove("splash-active");
    splash.remove();
  }, 2200);
}
