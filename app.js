<script>
// ── INLINE MANIFEST (PWA) ──────────────────────────────────



  // Service Worker
 if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}
</script>

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}
