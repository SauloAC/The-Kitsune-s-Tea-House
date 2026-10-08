// The service worker: what lets the game be installed and played with no network.
//
// Three rules, and no library:
//
//   pages   network first, cache as a fallback — a page you already have loads
//           when you're offline, and the newest one loads when you're not.
//   files   cache first — the stylesheet, the scripts, the pictures, the music
//           and the two typefaces. They never change without a new version of
//           this file, so serving them from the copy is both faster and right.
//   the rest  straight to the network, untouched.
//
// Nothing here collects anything: a cache is a copy of the game's own files,
// kept by the browser on the device. Clearing the site's data removes it, which
// is what the privacy page says.

const VERSION = "v1";
const SHELL = "shell-" + VERSION;
const RUNTIME = "runtime-" + VERSION;

// Small enough to fetch up front: every page, every rule, every word.
// The pictures and the music are heavy, so they are kept as they are used.
const SHELL_FILES = [
  "./",
  "./index.html",
  "./game.html",
  "./how-to.html",
  "./privacy.html",
  "./manifest.json",
  "./css/style.css",
  "./js/text.js",
  "./js/i18n.js",
  "./js/audio.js",
  "./js/game.js",
  "./js/pwa.js",
  "./img/favicon.svg",
  "./img/susuki.svg"
];

const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL)
      // One file that 404s would fail the whole install, so each is added alone
      .then((cache) => Promise.allSettled(SHELL_FILES.map((file) => cache.add(file))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names.filter((name) => name !== SHELL && name !== RUNTIME).map((name) => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

async function fromCacheThenNetwork(request) {
  const hit = await caches.match(request);
  if (hit) return hit;

  const response = await fetch(request);
  if (response && (response.ok || response.type === "opaque")) {
    const cache = await caches.open(RUNTIME);
    cache.put(request, response.clone());
  }
  return response;
}

async function fromNetworkThenCache(request) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(SHELL);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const hit = await caches.match(request);
    if (hit) return hit;
    // Offline and never visited: the home page is the one everyone has
    const home = await caches.match("./index.html");
    if (home) return home;
    throw error;
  }
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const sameSite = url.origin === self.location.origin;

  if (request.mode === "navigate") {
    event.respondWith(fromNetworkThenCache(request));
    return;
  }

  if (sameSite || FONT_HOSTS.includes(url.hostname)) {
    event.respondWith(fromCacheThenNetwork(request));
  }
});
