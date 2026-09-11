// The Kitsune's Tea House — game logic
//
// Everything the game knows lives in `state`. Player actions change
// `state`, then render() redraws the screen from it. The HTML never
// holds game data of its own.

const MAX_MARKS = 6;

const state = {
  marks: MAX_MARKS,       // candle marks left; at 0 it's midnight
  suspicion: 0,           // 0–3; at 3 the host stops pretending
  seen: [],               // flaws noticed by examining
  clues: [],              // flaws confirmed: seen AND asked about
  readLedger: false,      // unlocks the "Stay" ending
  answeredHonestly: null  // the mark-2 answer; changes the ending text
};

// Suspicion is shown in words, never as a coloured bar.
// The index is state.suspicion (0–3).
const SUSPICION_LINES = [
  "She is pouring tea.",
  "She has not blinked.",
  "She is watching your hands.",
  "She has stopped pretending."
];

const FLAW_NAMES = {
  shadow: "Shadow",
  teaware: "Teaware",
  reflection: "Reflection"
};

const marksLeftEl = document.querySelector("#marks-left");
const candleEl = document.querySelector("#candle");
const suspicionEl = document.querySelector("#suspicion");
const cluesEl = document.querySelector("#clues");

function renderCandle() {
  marksLeftEl.textContent = state.marks;
  candleEl.replaceChildren();

  for (let i = 0; i < MAX_MARKS; i++) {
    const mark = document.createElement("span");
    mark.className = i < state.marks ? "mark mark--lit" : "mark mark--burnt";
    candleEl.append(mark);
  }
}

function renderSuspicion() {
  suspicionEl.textContent = SUSPICION_LINES[state.suspicion];
}

function renderClues() {
  cluesEl.replaceChildren();

  if (state.clues.length === 0) {
    const empty = document.createElement("li");
    empty.className = "clues__empty";
    empty.textContent = "None yet.";
    cluesEl.append(empty);
    return;
  }

  // A tick AND the word "confirmed" — never colour alone
  for (const flaw of state.clues) {
    const item = document.createElement("li");
    item.innerHTML = `<span aria-hidden="true">✓</span> ${FLAW_NAMES[flaw]} — confirmed`;
    cluesEl.append(item);
  }
}

function render() {
  renderCandle();
  renderSuspicion();
  renderClues();
}

// Still to build for the first playable (Week 2):
//   examine(hotspot) — burns a mark, adds a flaw to state.seen
//   ask(topic)       — turns a seen flaw into a clue, raises suspicion
//   checkEnding()    — picks one of the five endings

render();
