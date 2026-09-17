// The music.
//
// One loop for each moment of the night, chosen by the same state that chooses
// the picture: the house outside the game, the table while she is still
// pretending, her suspicion once she has stopped, and one of two endings — you
// left, or the house kept you. game.js only says which moment it is; what
// plays, and when, is decided here.
//
// Nothing ever starts on its own. Browsers refuse sound until the player has
// touched the page, and so does this: the music waits for the first tap, click
// or key, it is off until the player turns it on, and the control in the header
// is always there to stop it again (WCAG 1.4.2).

const MUSIC_TRACKS = {
  house: "audio/house.mp3",
  table: "audio/table.mp3",
  suspicious: "audio/suspicious.mp3",
  escape: "audio/escape.mp3",
  kept: "audio/kept.mp3"
};

const SOUND_KEY = "kitsune-tea-house-sound";
const SOUND_SPOT_KEY = "kitsune-tea-house-sound-spot";
const MUSIC_FADE_MS = 700;

let soundOn = false;
let soundVolume = 0.6;
let wantedScene = null;   // the moment the page is in, whether or not it can play
let playing = null;       // { scene, el } while a track is sounding
const loops = new Map();  // one <audio> per scene, kept so coming back to a
                          // scene starts it again at once, with no download
let gestureSeen = false;
let toggleEl = null;
let volumeEl = null;

// ---------- 1. What the player chose, remembered ----------

function readSound() {
  // localStorage throws in some privacy modes, so never let it break the page
  try {
    const saved = JSON.parse(localStorage.getItem(SOUND_KEY) || "null");
    if (saved && typeof saved === "object") {
      soundOn = Boolean(saved.on);
      if (typeof saved.volume === "number") {
        soundVolume = Math.min(1, Math.max(0, saved.volume));
      }
    }
  } catch (error) {
    // no saved choice; music stays off, which is the default anyway
  }
}

function saveSound() {
  try {
    localStorage.setItem(SOUND_KEY, JSON.stringify({ on: soundOn, volume: soundVolume }));
  } catch (error) {
    // the choice just won't be remembered next visit
  }
}

// Moving between the three pages reloads everything, so the track would start
// over each time. This remembers where it was, for this tab only.
function saveSpot() {
  if (!playing) return;
  try {
    sessionStorage.setItem(SOUND_SPOT_KEY, JSON.stringify({
      scene: playing.scene,
      at: playing.el.currentTime
    }));
  } catch (error) {
    // the track will simply start from the beginning
  }
}

function spotFor(scene) {
  try {
    const spot = JSON.parse(sessionStorage.getItem(SOUND_SPOT_KEY) || "null");
    if (spot && spot.scene === scene && typeof spot.at === "number") return spot.at;
  } catch (error) {
    // start from the beginning
  }
  return 0;
}

// ---------- 2. Playing ----------

function fade(el, to, ms, done) {
  const from = el.volume;
  const started = performance.now();

  function step(now) {
    const part = Math.min(1, (now - started) / ms);
    el.volume = Math.min(1, Math.max(0, from + (to - from) * part));
    if (part < 1) requestAnimationFrame(step);
    else if (done) done();
  }
  requestAnimationFrame(step);
}

function stopPlayer(player) {
  fade(player.el, 0, MUSIC_FADE_MS, () => player.el.pause());
}

// One player per scene, made the first time it is heard. Coming back to a
// scene then picks it up where it was, with nothing to fetch again.
function loopFor(scene) {
  if (loops.has(scene)) return loops.get(scene);

  const el = new Audio(MUSIC_TRACKS[scene]);
  el.loop = true;
  el.volume = 0;
  el.preload = "auto";

  // Where this scene was when the player left the last page, if it was this one
  const at = spotFor(scene);
  if (at > 0) {
    el.addEventListener("loadedmetadata", () => {
      if (at < el.duration) el.currentTime = at;
    }, { once: true });
  }

  loops.set(scene, el);
  return el;
}

function startScene(scene) {
  const leaving = playing;
  const el = loopFor(scene);
  el.volume = 0;

  playing = { scene, el };
  el.play().then(() => {
    fade(el, soundVolume, MUSIC_FADE_MS);
  }).catch(() => {
    // The browser refused because it saw no gesture yet. Wait for the next one.
    if (playing && playing.el === el) playing = null;
    gestureSeen = false;
    el.pause();
  });

  if (leaving) stopPlayer(leaving);
}

// game.js calls this on every view, with the moment it is in
function setMusicScene(scene) {
  if (!(scene in MUSIC_TRACKS)) return;
  wantedScene = scene;

  if (!soundOn || !gestureSeen) return;
  if (playing && playing.scene === scene) return;
  startScene(scene);
}

function stopMusic() {
  if (!playing) return;
  stopPlayer(playing);
  playing = null;
}

function setSoundOn(on) {
  soundOn = on;
  saveSound();
  updateControl();

  if (!on) {
    saveSpot();
    stopMusic();
    return;
  }
  gestureSeen = true;                       // turning it on *is* the gesture
  if (wantedScene) startScene(wantedScene);
}

// The first tap, click or key anywhere on the page
function noteGesture() {
  if (gestureSeen) return;
  gestureSeen = true;
  if (soundOn && wantedScene && !playing) startScene(wantedScene);
}

// ---------- 3. The control in the header ----------

// Two different shapes, never two colours: a speaker with sound coming out of
// it, and a speaker with a cross.
const SPEAKER_ON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9h3.5L12 4.5v15L7.5 15H4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
const SPEAKER_OFF = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9h3.5L12 4.5v15L7.5 15H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';

function buildControl() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const box = document.createElement("div");
  box.className = "sound";

  toggleEl = document.createElement("button");
  toggleEl.type = "button";
  toggleEl.className = "sound__toggle";
  toggleEl.addEventListener("click", () => setSoundOn(!soundOn));

  volumeEl = document.createElement("input");
  volumeEl.type = "range";
  volumeEl.className = "sound__volume";
  volumeEl.min = "0";
  volumeEl.max = "100";
  volumeEl.step = "5";
  volumeEl.value = String(Math.round(soundVolume * 100));
  volumeEl.addEventListener("input", () => {
    soundVolume = Number(volumeEl.value) / 100;
    if (playing) playing.el.volume = soundVolume;
    saveSound();
  });

  box.append(toggleEl, volumeEl);
  header.append(box);
  updateControl();
}

// The button says what pressing it will do, in the language of the page
function updateControl() {
  if (!toggleEl) return;
  toggleEl.innerHTML = soundOn ? SPEAKER_ON : SPEAKER_OFF;
  toggleEl.setAttribute("aria-pressed", String(soundOn));
  toggleEl.setAttribute("aria-label", t(soundOn ? "pages.soundOff" : "pages.soundOn"));
  toggleEl.classList.toggle("sound__toggle--on", soundOn);
  if (volumeEl) volumeEl.setAttribute("aria-label", t("pages.soundVolume"));
}

// ---------- 4. Starting up ----------

readSound();
buildControl();
onLanguageChange(updateControl);

document.addEventListener("pointerdown", noteGesture);
document.addEventListener("keydown", noteGesture);
window.addEventListener("pagehide", saveSpot);

// The home and How to Play pages are the house. The game says its own moment.
if (document.body.dataset.page !== "game") setMusicScene("house");
