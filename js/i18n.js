// Language support for all three pages.
//
// Which language: ?lang= in the address, then the last choice saved in this
// browser, then the browser's own language, then English.
//
// Every element with data-t gets its text from TEXT (js/text.js). A few need
// inline markup like <strong>, so they use data-t-html instead. All of those
// strings are ours, written in text.js — nothing here comes from the player.

const LANGUAGES = ["en", "pt", "es"];
const LANG_STORAGE_KEY = "kitsune-tea-house-lang";

let currentLang = firstAvailableLanguage();
const languageListeners = [];

// A language counts only if text.js actually has a block for it, so the page
// can never claim a language it can't show.
function isReady(lang) {
  return LANGUAGES.includes(lang) && Boolean(TEXT[lang]);
}

function firstAvailableLanguage() {
  const asked = new URLSearchParams(location.search).get("lang");
  if (isReady(asked)) return asked;

  // localStorage throws in some privacy modes, so never let it break the page
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (isReady(saved)) return saved;
  } catch (error) {
    // no saved choice available; fall through
  }

  const browser = (navigator.language || "en").slice(0, 2);
  return isReady(browser) ? browser : "en";
}

// The whole text block for the language in use. game.js reads this.
function words() {
  return TEXT[currentLang] || TEXT.en;
}

// t("ui.candle", { n: 4 }) → "Candle: 4 of 6 marks left"
function t(path, values = {}) {
  let value = path.split(".").reduce((step, key) => (step ? step[key] : undefined), words());
  if (value === undefined) value = path; // a missing key shows itself, instead of "undefined"

  return String(value).replace(/\{(\w+)\}/g, (whole, key) =>
    key in values ? values[key] : whole
  );
}

function setLanguage(lang) {
  if (!isReady(lang) || lang === currentLang) return;
  currentLang = lang;

  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (error) {
    // the choice just won't be remembered next visit
  }

  // Keep the address in step, so the page can be shared in this language
  const url = new URL(location.href);
  url.searchParams.set("lang", lang);
  history.replaceState(null, "", url);

  applyLanguage();
  for (const listener of languageListeners) listener();
}

// game.js asks to be told, so it can redraw the scene
function onLanguageChange(listener) {
  languageListeners.push(listener);
}

function applyLanguage() {
  // Screen readers use this to choose the right pronunciation
  document.documentElement.lang = currentLang;

  const page = document.body.dataset.page; // "home", "game" or "howTo"
  if (page) document.title = t(`pages.${page}TitleTag`);

  const description = document.querySelector('meta[name="description"]');
  if (description && page === "home") description.content = t("pages.homeDescription");

  for (const el of document.querySelectorAll("[data-t]")) {
    el.textContent = t(el.dataset.t);
  }

  for (const el of document.querySelectorAll("[data-t-html]")) {
    el.innerHTML = t(el.dataset.tHtml);
  }

  for (const el of document.querySelectorAll("[data-t-label]")) {
    el.setAttribute("aria-label", t(el.dataset.tLabel));
  }

  markCurrentLanguage();
}

// The switcher shows the current language in bold and underlined, never by
// colour alone, and tells screen readers with aria-current.
function markCurrentLanguage() {
  for (const link of document.querySelectorAll("[data-lang]")) {
    if (link.dataset.lang === currentLang) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  }
}

// The switcher works without JavaScript as plain links; with it, switching is
// instant and the game keeps its state.
for (const link of document.querySelectorAll("[data-lang]")) {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setLanguage(link.dataset.lang);
  });
}

applyLanguage();
