// The service worker: what lets the game be installed and played with no network.
//
// Three rules, and no library:
//
//   pages   network first, cache as a fallback — a page you already have loads
//           when you're offline, and the newest one loads when you're not.
//   files   cache first — the stylesheet, the scripts, the pictures, the music
//           and the two typefaces. They never change without a new VERSION
//           below, so serving them from the copy is both faster and right.
//   the rest  straight to the network, untouched.
//
// Nothing here collects anything: a cache is a copy of the game's own files,
// kept by the browser on the device. Clearing the site's data removes it, which
// is what the privacy page says.
//
// Bump VERSION whenever any cached file changes, or the old copy keeps winning.

const VERSION = "v2";
const SHELL = "shell-" + VERSION;
const RUNTIME = "runtime-" + VERSION;

// Everything the game needs to be played through, start to ending, with the
// network off. 1.1 MB of pictures, because "install it" has to mean the whole
// night: the first version kept them only as the night reached them, which
// left an installed game asking for the network to show the next scene.
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
  "./img/susuki.svg",
  "./img/home-cover.jpg",
  "./img/home-cover-mask.png",
  "./img/host-normal.jpg",
  "./img/host-suspicious.jpg",
  "./img/host-mask-good.jpg",
  "./img/host-mask-bad.jpg",
  "./img/scene-fog.jpg",
  "./img/scene-light.jpg",
  "./img/scene-road-earned.jpg",
  "./img/scene-road-lucky.jpg",
  "./img/scene-stay.jpg",
  "./img/scene-midnight.jpg"
];

// 3.5 MB, and silence is a survivable loss, so these are fetched quietly after
// the worker is running rather than holding up the install — and not at all on
// a metered connection the browser tells us to be careful with.
const MUSIC_FILES = [
  "./audio/house.mp3",
  "./audio/table.mp3",
  "./audio/suspicious.mp3",
  "./audio/escape.mp3",
  "./audio/freed.mp3",
  "./audio/kept.mp3"
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

function sparingWithData() {
  const link = self.navigator.connection;
  if (!link) return false;
  return Boolean(link.saveData) || /^(slow-2g|2g)$/.test(link.effectiveType || "");
}

async function keepTheMusic() {
  if (sparingWithData()) return;

  const cache = await caches.open(RUNTIME);
  for (const file of MUSIC_FILES) {
    try {
      if (await cache.match(file)) continue;
      const response = await fetch(file);
      if (response && response.ok) await cache.put(file, response);
    } catch (error) {
      // Offline or interrupted: the loop is fetched when it is first played
    }
  }
}

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names.filter((name) => name !== SHELL && name !== RUNTIME).map((name) => caches.delete(name))
      ))
      .then(() => self.clients.claim())
      .then(keepTheMusic)
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
    // ignoreSearch, because the language switcher writes ?lang= into the
    // address: without it an offline /game.html?lang=pt misses the copy of
    // /game.html and the player lands on the home page instead.
    const hit = await caches.match(request, { ignoreSearch: true });
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

  // Never cache the worker itself: the browser updates it on its own, and a
  // cached copy only confuses anyone reading it back.
  if (url.pathname.endsWith("/sw.js")) return;

  if (request.mode === "navigate") {
    event.respondWith(fromNetworkThenCache(request));
    return;
  }

  if (sameSite || FONT_HOSTS.includes(url.hostname)) {
    event.respondWith(fromCacheThenNetwork(request));
  }
});
