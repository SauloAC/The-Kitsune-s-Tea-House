// Turns the site into something a phone can install and open with no network.
//
// The service worker in sw.js does the work; this only asks for it, and only
// where it can run: browsers refuse it over plain http, except on localhost, so
// a file opened straight from the disk simply carries on without it. Nothing on
// this page depends on it — the game works the same either way.

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Relative, so it works at the site root and under a project path alike
    navigator.serviceWorker.register("sw.js").catch(() => {
      // No offline copy this time; the game still plays over the network
    });
  });
}
