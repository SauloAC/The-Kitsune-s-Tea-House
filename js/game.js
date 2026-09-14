// The Kitsune's Tea House — game logic
//
// Everything the game knows lives in `state`. Each choice the player makes
// calls a function that changes `state`, then show() redraws the scene from
// it. The HTML never holds game data of its own.
//
// The words live in js/text.js, once per language; this file holds the rules.
// Text is looked up at the moment of drawing, through words() and t() in
// js/i18n.js, so switching language redraws the same state in a new language.
//
//   1. Rules and state
//   2. Drawing the screen
//   3. What the player can do right now
//   4. Player actions — examine() and ask() are the heart of the game
//   5. Endings and starting over

// ---------- 1. Rules and state ----------

const MAX_MARKS = 6;       // the candle
const FREE_LOOKS = 2;      // looks at mark 3, while she's out of the room
const MAX_SUSPICION = 3;   // at 3 she stops pretending

// When each hotspot is open, and which flaw it reveals.
//   from:   the first mark it's open (marks count down, so 4 means "4 and below")
//   onlyAt: open at this one mark only
const HOTSPOT_RULES = {
  hearth: { from: 6, flaw: "shadow" },
  tea: { from: 6, flaw: "teaware" },
  window: { from: 6 },
  scroll: { from: 6 },
  fan: { from: 6 },
  tray: { from: 4, flaw: "reflection" },
  ledger: { onlyAt: 3 }
};

// Her question at mark 2: what each answer means, not what it says
const ANSWER_HONESTY = { lie: false, deflect: null, honest: true };

// Ending 4 has two versions, good and bad
const ENDING_NUMBERS = { road: 1, table: 2, midnight: 3, maskGood: 4, maskBad: 4, stay: 5 };

function freshState() {
  return {
    marks: MAX_MARKS,        // candle marks left; at 0 it's midnight
    suspicion: 0,            // 0–3; at 3 the host stops pretending
    freeLooks: FREE_LOOKS,   // mark 3: looks left while she's out of the room
    examined: [],            // every hotspot looked at; each only once
    seen: [],                // flaws noticed by examining
    clues: [],               // flaws confirmed: seen AND pressed
    readLedger: false,       // unlocks "Sign the ledger" at mark 1
    pressedLedger: false,    // suspicion spent on the ledger — never a clue
    answeredHonestly: null,  // the mark-2 answer; changes the ending text
    ending: null             // which ending is on screen, if the game is over
  };
}

let state = freshState();

// ---------- 2. Drawing the screen ----------

const titleEl = document.querySelector("#scene-title");
const sceneEl = document.querySelector("#scene-text");
const choicesEl = document.querySelector("#choices");
const candleLabelEl = document.querySelector("#candle-label");
const candleEl = document.querySelector("#candle");
const suspicionEl = document.querySelector("#suspicion");
const cluesEl = document.querySelector("#clues");
const hostEl = document.querySelector("#host");
const hostImageEl = document.querySelector("#host-image");
const hostCaptionEl = document.querySelector("#host-caption");
const logDialogEl = document.querySelector("#log-dialog");
const logEntriesEl = document.querySelector("#log-entries");
const logButtonEl = document.querySelector("#log-button");
const logCloseEl = document.querySelector("#log-close");

// Every moment the player has been shown, so the Log can replay the night.
// It keeps the words as they appeared, so anything read before a language
// switch stays in the language it was read in.
let logEntries = [];

// True only while a language switch redraws the moment already on screen,
// so the same scene isn't written into the log twice.
let redrawing = false;

// Narration becomes a plain paragraph; speech gets the speaker's name and the
// quote marks of the language in use — “…” in English, «…» in Spanish.
function renderLines(container, lines) {
  container.replaceChildren();
  for (const line of lines) {
    const p = document.createElement("p");
    if (line.who) {
      const name = document.createElement("strong");
      name.textContent = `${t(`ui.speaker${line.who === "host" ? "Host" : "You"}`)}: `;
      p.append(name, `${t("ui.quoteOpen")}${line.text}${t("ui.quoteClose")}`);
    } else {
      p.textContent = line.text;
    }
    container.append(p);
  }
}

// show() draws one moment of the game: a heading, the lines, and the choices.
// Each choice is { label, note, quiet, action } — note and quiet are optional.
function show(title, lines, choices) {
  titleEl.textContent = title;
  renderLines(sceneEl, lines);

  // Several views happen inside one candle mark — talking, letting it go,
  // pressing — so the log gathers them under a single heading instead of
  // repeating "Mark 5 — Settling" three times in a row.
  if (!redrawing) {
    const last = logEntries[logEntries.length - 1];
    if (last && last.title === title) {
      last.lines = [...last.lines, ...lines];
    } else {
      logEntries.push({ title, lines: [...lines] });
    }
  }

  choicesEl.replaceChildren();
  for (const choice of choices) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = choice.quiet ? "btn btn--quiet" : "btn";
    button.textContent = choice.label;

    // The cost of a choice is written on the button, e.g. "+1 suspicion"
    if (choice.note) {
      const note = document.createElement("span");
      note.className = "choice__note";
      note.textContent = choice.note;
      button.append(note);
    }

    button.addEventListener("click", () => {
      choice.action();
      titleEl.focus(); // keyboard and screen-reader players land on the new scene
    });
    choicesEl.append(button);
  }

  renderStatus();
}

// The three portraits of the host. An empty string here brings back the dashed
// placeholder box, which is how the page looked before the art existed.
const HOST_PORTRAITS = {
  normal: "img/host-normal.jpg",
  suspicious: "img/host-suspicious.jpg",
  unmasked: "img/host-unmasked.jpg"
};

// Each portrait describes itself for players who can't see it, in every language
const PORTRAIT_ALT = {
  normal: "pages.gameHostNormal",
  suspicious: "pages.gameHostSuspicious",
  unmasked: "pages.gameHostUnmasked"
};

// Which portrait fits this moment: unmasked at Ending 4, suspicious once she's
// watching your hands, and otherwise the composed one.
function portraitState() {
  if (state.ending === "maskGood" || state.ending === "maskBad") return "unmasked";
  if (state.suspicion >= 2) return "suspicious";
  return "normal";
}

function renderHost() {
  const which = portraitState();
  const src = HOST_PORTRAITS[which];

  hostEl.classList.toggle("host--filled", Boolean(src));
  hostCaptionEl.hidden = Boolean(src);
  hostImageEl.hidden = !src;
  if (!src) return;

  hostImageEl.src = src;
  hostImageEl.alt = t(PORTRAIT_ALT[which]);
}

// The portrait, the candle, her suspicion and the clue list
function renderStatus() {
  renderHost();
  renderCandle();
  renderSuspicion();
  renderClues();
}

function renderCandle() {
  candleLabelEl.textContent = t("ui.candle", { n: state.marks });
  candleEl.replaceChildren();

  for (let i = 0; i < MAX_MARKS; i++) {
    const mark = document.createElement("span");
    mark.className = i < state.marks ? "mark mark--lit" : "mark mark--burnt";
    candleEl.append(mark);
  }
}

function renderSuspicion() {
  suspicionEl.textContent = words().suspicion[state.suspicion];
}

function renderClues() {
  cluesEl.replaceChildren();

  if (state.clues.length === 0) {
    const empty = document.createElement("li");
    empty.className = "clues__empty";
    empty.textContent = t("ui.cluesNone");
    cluesEl.append(empty);
    return;
  }

  // A tick AND the word "confirmed" — never colour alone
  for (const flaw of state.clues) {
    const item = document.createElement("li");
    const tick = document.createElement("span");
    tick.setAttribute("aria-hidden", "true");
    tick.textContent = "✓ ";
    item.append(tick, t("ui.clueItem", { name: words().topics[flaw].name }));
    cluesEl.append(item);
  }
}

// ---------- 3. What the player can do right now ----------

function markTitle() {
  return t("ui.markTitle", { n: state.marks, title: words().marks[state.marks].title });
}

// The normal view during play: what just happened, then the choices
function showTurn(lines) {
  show(markTitle(), lines, turnChoices());
}

// The lines that open a new candle mark
function beatLines() {
  const lines = [...words().marks[state.marks].lines];

  // Mark 5: if you've looked at neither the hearth nor the tea, she nudges you
  const lookedAtTea = state.examined.includes("hearth") || state.examined.includes("tea");
  if (state.marks === 5 && !lookedAtTea) lines.push(words().nudge);

  // Mark 1: two confirmed clues are enough to tell the doors apart
  if (state.marks === 1) {
    lines.push(state.clues.length >= 2 ? words().doorsClear : words().doorsUnclear);
    if (state.readLedger) lines.push(words().ledgerOffer);
  }

  return lines;
}

// Every choice open right now, in the order they appear
function turnChoices() {
  if (state.marks === 2) return answerChoices(); // her question: you must answer

  const choices = [];
  if (state.marks === 1) choices.push(...doorChoices());

  for (const id of openHotspots()) {
    choices.push({
      label: t("ui.examine", { thing: words().hotspots[id].label }),
      note: examineNote(),
      action: () => examine(id)
    });
  }

  // At mark 3 she's out of the room, so there's no one to talk to
  if (state.marks === 3) {
    choices.push({ label: t("ui.sitBack"), quiet: true, action: sitBackDown });
  } else {
    choices.push(...talkChoices());
  }

  return choices;
}

// Hotspots open at this mark that haven't been examined yet
function openHotspots() {
  return Object.keys(HOTSPOT_RULES).filter((id) => {
    const rule = HOTSPOT_RULES[id];
    if (state.examined.includes(id)) return false;
    if (rule.onlyAt) return state.marks === rule.onlyAt;
    return state.marks <= rule.from;
  });
}

// What examining costs right now, written on the button
function examineNote() {
  if (state.marks === 3) {
    return state.freeLooks === 1
      ? t("ui.costFreeOne")
      : t("ui.costFreeMany", { n: state.freeLooks });
  }
  if (state.marks === 1) return t("ui.costLast");
  return t("ui.costMark");
}

// She can be asked about flaws you've seen but not confirmed, and about
// the ledger once you've read it (until you've pressed her about it)
function talkChoices() {
  const topics = state.seen.filter((flaw) => !state.clues.includes(flaw));
  if (state.readLedger && !state.pressedLedger) topics.push("ledger");

  return topics.map((id) => ({
    label: t("ui.ask", { line: words().topics[id].opener }),
    quiet: true,
    action: () => talk(id)
  }));
}

// Mark 1: the way out, the way back in, and — if you read it — the ledger
function doorChoices() {
  const clear = state.clues.length >= 2;
  const choices = [
    {
      label: t("ui.doorIn"),
      note: clear ? t("ui.doorInNote") : "",
      action: () => endGame("table")
    },
    {
      label: t("ui.doorBack"),
      note: clear ? t("ui.doorBackNote") : "",
      action: () => endGame("road")
    }
  ];
  if (state.readLedger) {
    choices.push({ label: t("ui.signLedger"), action: () => endGame("stay") });
  }
  return choices;
}

function answerChoices() {
  return Object.keys(words().answers).map((id) => ({
    label: t("ui.answer", {
      label: words().answers[id].label,
      line: words().answers[id].say
    }),
    action: () => answer(id)
  }));
}

// ---------- 4. Player actions ----------

// What you see depends on when you look
function lookText(id) {
  const spot = words().hotspots[id];
  if (state.marks === 3 && spot.whileAway) return spot.whileAway;
  if (state.marks <= 4 && spot.afterRain) return spot.afterRain;
  return spot.text;
}

// examine(id) — looking at something in the room.
// Normally it burns a candle mark. At mark 3 she's out of the room, so it
// spends one of the two free looks instead. At mark 1 it burns the last mark.
function examine(id) {
  const rule = HOTSPOT_RULES[id];
  const lines = [narrate(lookText(id))];

  state.examined.push(id);
  if (rule.flaw) state.seen.push(rule.flaw);
  if (id === "ledger") state.readLedger = true;

  if (state.marks === 3) {
    state.freeLooks--;
    if (state.freeLooks > 0) {
      showTurn(lines);
      return;
    }
    lines.push(words().stepsBack);
    herReturns(lines);
    return;
  }

  state.marks--;
  if (state.marks === 0) {
    endGame("midnight", lines);
    return;
  }
  showTurn([...lines, ...beatLines()]);
}

// Mark 3 ends early if you choose to sit back down
function sitBackDown() {
  herReturns([words().sitBackDown]);
}

// She comes back, and the candle burns down to mark 2
function herReturns(lines) {
  state.marks--;
  showTurn([...lines, ...beatLines()]);
}

// Bringing something up is free. She explains it away — then you decide.
function talk(id) {
  const topic = words().topics[id];
  show(markTitle(), [you(topic.opener), host(topic.deflect)], [
    { label: t("ui.letGo", { line: topic.letGo }), quiet: true, action: () => letGo(id) },
    { label: t("ui.press", { line: topic.press }), note: t("ui.costSuspicion"), action: () => ask(id) }
  ]);
}

// Letting it go costs nothing, and the topic stays open for later
function letGo(id) {
  const topic = words().topics[id];
  showTurn([you(topic.letGo), host(topic.letGoReply)]);
}

// ask(id) — pressing her about something you've seen.
// This is where the rules meet: it checks what you know, confirms clues,
// spends suspicion, and decides whether she stops pretending.
function ask(id) {
  const topic = words().topics[id];

  // 1. You can only press her about something you've actually seen
  const known = id === "ledger" ? state.readLedger : state.seen.includes(id);
  if (!known) return;

  // 2. A flaw becomes a confirmed clue. The ledger never does: it isn't proof.
  if (id === "ledger") {
    state.pressedLedger = true;
  } else {
    state.clues.push(id);
  }

  // 3. Every press costs suspicion
  state.suspicion++;

  // 4. Her reaction — and, for a real clue, how rattled she is so far
  const lines = [you(topic.press), narrate(topic.tell), host(topic.reply)];
  if (id === "ledger") {
    lines.push(narrate(topic.after));
  } else {
    lines.push(narrate(t("ui.confirmed", { name: topic.name })));
    const composure = words().composure[state.clues.length];
    if (composure) lines.push(narrate(composure));
  }

  // 5. The third press: she stops pretending. It's the good ending only
  //    if all three clues are confirmed — otherwise you accused her without proof.
  if (state.suspicion >= MAX_SUSPICION) {
    endGame(state.clues.length === 3 ? "maskGood" : "maskBad", lines);
    return;
  }

  showTurn(lines);
}

// Mark 2: answering her question burns the candle down to mark 1
function answer(id) {
  const reply = words().answers[id];
  state.answeredHonestly = ANSWER_HONESTY[id];
  state.marks--;
  showTurn([you(reply.say), host(reply.reply), ...beatLines()]);
}

// ---------- 5. Endings and starting over ----------

function endGame(id, lines = []) {
  state.ending = id;
  const ending = words().endings[id];
  const text = [...lines, ...ending.lines];

  // Your answer at mark 2 changes the last line, not the ending
  if (state.answeredHonestly === true) text.push(narrate(words().echoHonest));
  if (state.answeredHonestly === false) text.push(narrate(words().echoLie));

  text.push(narrate(t("ui.cluesCount", { n: state.clues.length })));

  show(t("ui.endingTitle", { n: ENDING_NUMBERS[id], title: ending.title }), text, [
    { label: t("ui.playAgain"), action: start }
  ]);
}

function start() {
  state = freshState();
  logEntries = [];
  showTurn(beatLines());
}

// ---------- 6. The log ----------

// Replays every moment that has been shown, oldest first.
function renderLog() {
  logEntriesEl.replaceChildren();

  if (logEntries.length === 0) {
    const empty = document.createElement("p");
    empty.className = "clues__empty";
    empty.textContent = t("pages.gameLogEmpty");
    logEntriesEl.append(empty);
    return;
  }

  for (const entry of logEntries) {
    const section = document.createElement("section");
    section.className = "log__entry";

    const heading = document.createElement("h3");
    heading.textContent = entry.title;

    const body = document.createElement("div");
    renderLines(body, entry.lines);

    section.append(heading, body);
    logEntriesEl.append(section);
  }
}

logButtonEl.addEventListener("click", () => {
  renderLog();
  logDialogEl.showModal();
  logEntriesEl.scrollTop = logEntriesEl.scrollHeight; // the newest moment first
});

logCloseEl.addEventListener("click", () => logDialogEl.close());

// Esc closes it too, and either way the focus goes back to the button
logDialogEl.addEventListener("close", () => logButtonEl.focus());

// Switching language redraws what's on screen from the same state: the candle,
// the clues and her suspicion are kept, and the scene starts the current mark
// again in the new language.
onLanguageChange(() => {
  redrawing = true;
  if (state.ending) {
    endGame(state.ending);
  } else {
    showTurn(beatLines());
  }
  redrawing = false;
});

start();
