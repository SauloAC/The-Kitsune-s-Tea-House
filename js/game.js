// The Kitsune's Tea House — game logic
//
// Everything the game knows lives in `state`. Each choice the player makes
// calls a function that changes `state`, then show() redraws the scene from
// it. The HTML never holds game data of its own.
//
//   1. Rules and state
//   2. Words — every line of in-game text
//   3. Drawing the screen
//   4. What the player can do right now
//   5. Player actions — examine() and ask() are the heart of the game
//   6. Endings and starting over

// ---------- 1. Rules and state ----------

const MAX_MARKS = 6;       // the candle
const FREE_LOOKS = 2;      // looks at mark 3, while she's out of the room
const MAX_SUSPICION = 3;   // at 3 she stops pretending

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
    answeredHonestly: null   // the mark-2 answer; changes the ending text
  };
}

let state = freshState();

// ---------- 2. Words ----------

// Every line on screen is narration, the host speaking, or you speaking.
function narrate(text) {
  return { who: null, text };
}

function host(text) {
  return { who: "Host", text };
}

function you(text) {
  return { who: "You", text };
}

// How each candle mark begins (DESIGN.md, "The six marks")
const MARKS = {
  6: {
    title: "Arrival",
    lines: [narrate("Fog swallows the road behind you. A single lamp burns in the window of a tea house, and the host is already pouring a second cup. The road, she mentions lightly, isn't safe until dawn.")]
  },
  5: {
    title: "Settling",
    lines: [narrate("The fire settles into a low glow. She kneels across from you, quiet, as if she has all night.")]
  },
  4: {
    title: "The rain",
    lines: [narrate("Rain comes down hard, all at once. The window goes black, and the lacquer tray on the table catches the lamplight like still water.")]
  },
  3: {
    title: "She leaves",
    lines: [
      narrate("“More water,” she says, and rises. The door slides shut behind her. You're alone — and the candle flame holds perfectly still."),
      narrate("A guest book lies open beside the water jar. She'll be back soon: you have time to look at two things.")
    ]
  },
  2: {
    title: "Her question",
    lines: [
      narrate("She comes back with the water and kneels across from you. For a long moment she only watches the steam."),
      host("Do you know what I am?")
    ]
  },
  1: {
    title: "The doors",
    lines: [
      narrate("The candle is almost gone. She sets down her cup."),
      host("The road will be safe soon. If you still want it.")
    ]
  }
};

// Extra lines that depend on what the player has done
const NUDGE = host("You haven't touched your tea. Here — it's still warm.");
const DOORS_CLEAR = narrate("Two doors: the one you came in by, and a paper door at the back. No air moves at the door you came in by. The paper door stirs — cold air and the smell of wet pine come through it.");
const DOORS_UNCLEAR = narrate("Two doors: the one you came in by, and a paper door at the back. You look from one to the other. Nothing tells them apart.");
const LEDGER_OFFER = narrate("She sets the ledger down beside the doors and holds out a brush. Every traveller signs it before they go.");

// Everything in the room that can be examined.
//   from:      the first mark it's open (marks count down, so 4 means "4 and below")
//   onlyAt:    open at this one mark only
//   flaw:      the flaw it reveals, if any
//   whileAway: what you see at mark 3, while she's out of the room
//   afterRain: what you see from mark 4 on
const HOTSPOTS = {
  hearth: {
    label: "the hearth",
    from: 6,
    flaw: "shadow",
    text: "Firelight throws her shadow across the paper wall. You count the tails twice and get a different number each time.",
    whileAway: "The fire has burned low. On the paper wall, where she was kneeling, her shadow is still kneeling. You count the tails twice and get a different number each time. Then it fades."
  },
  tea: {
    label: "the tea service",
    from: 6,
    flaw: "teaware",
    text: "The cup in your hands has a crane painted on it, wings spread. You'd have sworn it was a plum branch when she poured."
  },
  window: {
    label: "the window",
    from: 6,
    text: "Fog presses against the paper panes, so thick the lamplight stops a hand's width outside. Somewhere out there is the road you came in on.",
    afterRain: "Rain drums on the shutters. The window has gone black; you can't see the road at all now."
  },
  scroll: {
    label: "the wall scroll",
    from: 6,
    text: "A hanging scroll: one long brushstroke of a mountain path, and a poem too faded to read. Only the last line survives — “the traveller rests; the road waits.”"
  },
  fan: {
    label: "her fan",
    from: 6,
    text: "Her fan lies folded on the low table: plain paper, worn soft at the ribs, painted with a single maple leaf. It smells faintly of cedar smoke."
  },
  tray: {
    label: "the lacquer tray",
    from: 4,
    flaw: "reflection",
    text: "Rain has turned the window black, and the lacquer tray holds the lamplight like still water. In it you see the room behind you: the hearth, the scrolls, your own shoulder — and no one sitting across from you.",
    whileAway: "The lacquer tray holds the lamplight like still water. In it you see the room behind you — and her, kneeling across from you, pouring tea. Her cushion is empty."
  },
  ledger: {
    label: "the ledger",
    onlyAt: 3,
    text: "A guest book lies open beside the water jar. Names in a hundred different hands — brush, pencil, a child's careful letters. Every entry is dated the same night. This night. Decades apart."
  }
};

// What you can bring up with her once you've seen it (DESIGN.md, "Flaw dialogue")
const TOPICS = {
  shadow: {
    name: "Shadow",
    opener: "Your shadow looks strange on that wall.",
    deflect: "Old walls. The paper warps.",
    letGo: "Must be the paper.",
    letGoReply: "Mm. Your tea is getting cold.",
    press: "The paper isn't moving. Your shadow is.",
    tell: "She lifts her cup. On the wall, the shadow lifted its cup a moment before she did. The fire gutters blue for a breath.",
    reply: "…You notice a great deal, for someone so tired."
  },
  teaware: {
    name: "Teaware",
    opener: "This cup — wasn't there a plum branch on it?",
    deflect: "A set of twelve, every one different. You've had two cups already.",
    letGo: "Two cups. Of course.",
    letGoReply: "Of course. Drink deeply — it's a long night.",
    press: "I've had one cup. I haven't even finished it.",
    tell: "The steam from your cup sinks back into the tea instead of rising.",
    reply: "One, then. Mortals are so particular about counting."
  },
  reflection: {
    name: "Reflection",
    opener: "I saw something in your tray.",
    deflect: "Lacquer that old holds nothing clearly. You can't expect it to show everyone at the table.",
    letGo: "Just the rain on the window, I suppose.",
    letGoReply: "The rain makes everything look emptier than it is.",
    press: "I never said anyone was missing.",
    tell: "For a moment she doesn't move at all — not a breath. Then she smiles, a little too wide.",
    reply: "Didn't you? Hosts learn to guess what their guests are thinking."
  },
  ledger: {
    name: "Ledger",
    opener: "I read your ledger.",
    deflect: "My guest book. Every traveller signs it before they go.",
    letGo: "It's a beautiful old book.",
    letGoReply: "Isn't it? There's always room for one more name.",
    press: "Every name is dated tonight. Decades apart.",
    tell: "She doesn't look at the book. She looks at you.",
    reply: "The fog comes on the same night every year, and so do travellers. Is it so strange that I keep count?",
    after: "Strange, yes. But nothing she said was wrong."
  }
};

// Suspicion is shown in words, never as a coloured bar.
// The index is state.suspicion (0–3).
const SUSPICION_LINES = [
  "She is pouring tea.",
  "She has not blinked.",
  "She is watching your hands.",
  "She has stopped pretending."
];

// How rattled she is after each confirmed clue. The index is how many
// clues are confirmed; the third press always ends the game instead.
const COMPOSURE = [
  null,
  "She refills your cup as if nothing happened.",
  "She sets the teapot down, and doesn't pick it up again."
];

// Her question at mark 2. The answer changes the ending's last line, not the ending.
const ANSWERS = {
  lie: { label: "Lie", say: "You keep a tea house. That's all.", reply: "Of course I do.", honest: false },
  deflect: { label: "Deflect", say: "I know you make very good tea.", reply: "That isn't an answer. But it's a kind one.", honest: null },
  honest: { label: "Be honest", say: "I don't think you're human.", reply: "Honest guests are so rare.", honest: true }
};

const ECHO_HONEST = "She'll remember that you told her the truth.";
const ECHO_LIE = "She'll remember that you lied to her.";

// The five endings (DESIGN.md, "Five endings"). Ending 4 has two versions.
const ENDINGS = {
  road: {
    number: 1,
    title: "The road",
    lines: [narrate("You slide the paper door open and step into real fog and real cold. Behind you there's no lamplight and no tea house — only pines, the road, and the first grey of dawn.")]
  },
  table: {
    number: 2,
    title: "The table",
    lines: [narrate("You step through the door you came in by — and you're kneeling at the low table again. She's pouring. The candle has six marks.")]
  },
  midnight: {
    number: 3,
    title: "Midnight",
    lines: [narrate("The flame gutters and goes out. In the dark, a page turns. When the lamp is lit again, there's a new name in the ledger — yours, in your own handwriting.")]
  },
  maskGood: {
    number: 4,
    title: "The mask",
    lines: [
      narrate("She lifts her mask away. The face beneath is a fox's, and it's laughing."),
      host("Three centuries since a mortal saw through my glamour without falling asleep first."),
      host("A trickster only holds those who allow themselves to be fooled."),
      narrate("The paper door slides open by itself, onto the road and the starlight.")
    ]
  },
  maskBad: {
    number: 4,
    title: "The mask",
    lines: [
      narrate("She lifts her mask away. The face beneath is a fox's, and it isn't laughing."),
      host("You guessed. Guessing isn't seeing."),
      narrate("The lamp dims. When it brightens again, there are no doors at all.")
    ]
  },
  stay: {
    number: 5,
    title: "The ledger",
    lines: [narrate("You take the brush. Your name goes down beneath a hundred others, dated tonight. She refills your cup. Outside, the fog doesn't lift, and you find you don't mind.")]
  }
};

// ---------- 3. Drawing the screen ----------

const titleEl = document.querySelector("#scene-title");
const sceneEl = document.querySelector("#scene-text");
const choicesEl = document.querySelector("#choices");
const marksLeftEl = document.querySelector("#marks-left");
const candleEl = document.querySelector("#candle");
const suspicionEl = document.querySelector("#suspicion");
const cluesEl = document.querySelector("#clues");

// show() draws one moment of the game: a heading, the lines, and the choices.
// Each choice is { label, note, quiet, action } — note and quiet are optional.
function show(title, lines, choices) {
  titleEl.textContent = title;

  sceneEl.replaceChildren();
  for (const line of lines) {
    const p = document.createElement("p");
    if (line.who) {
      const name = document.createElement("strong");
      name.textContent = `${line.who}: `;
      p.append(name, `“${line.text}”`);
    } else {
      p.textContent = line.text;
    }
    sceneEl.append(p);
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

// The candle, her suspicion and the clue list
function renderStatus() {
  renderCandle();
  renderSuspicion();
  renderClues();
}

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
    item.innerHTML = `<span aria-hidden="true">✓</span> ${TOPICS[flaw].name} — confirmed`;
    cluesEl.append(item);
  }
}

// ---------- 4. What the player can do right now ----------

function markTitle() {
  return `Mark ${state.marks} — ${MARKS[state.marks].title}`;
}

// The normal view during play: what just happened, then the choices
function showTurn(lines) {
  show(markTitle(), lines, turnChoices());
}

// The lines that open a new candle mark
function beatLines() {
  const lines = [...MARKS[state.marks].lines];

  // Mark 5: if you've looked at neither the hearth nor the tea, she nudges you
  const lookedAtTea = state.examined.includes("hearth") || state.examined.includes("tea");
  if (state.marks === 5 && !lookedAtTea) lines.push(NUDGE);

  // Mark 1: two confirmed clues are enough to tell the doors apart
  if (state.marks === 1) {
    lines.push(state.clues.length >= 2 ? DOORS_CLEAR : DOORS_UNCLEAR);
    if (state.readLedger) lines.push(LEDGER_OFFER);
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
      label: `Examine ${HOTSPOTS[id].label}`,
      note: examineNote(),
      action: () => examine(id)
    });
  }

  // At mark 3 she's out of the room, so there's no one to talk to
  if (state.marks === 3) {
    choices.push({ label: "Sit back down", quiet: true, action: sitBackDown });
  } else {
    choices.push(...talkChoices());
  }

  return choices;
}

// Hotspots open at this mark that haven't been examined yet
function openHotspots() {
  return Object.keys(HOTSPOTS).filter((id) => {
    const spot = HOTSPOTS[id];
    if (state.examined.includes(id)) return false;
    if (spot.onlyAt) return state.marks === spot.onlyAt;
    return state.marks <= spot.from;
  });
}

// What examining costs right now, written on the button
function examineNote() {
  if (state.marks === 3) {
    return `free — ${state.freeLooks} ${state.freeLooks === 1 ? "look" : "looks"} left`;
  }
  if (state.marks === 1) return "burns the last mark";
  return "burns 1 mark";
}

// She can be asked about flaws you've seen but not confirmed, and about
// the ledger once you've read it (until you've pressed her about it)
function talkChoices() {
  const topics = state.seen.filter((flaw) => !state.clues.includes(flaw));
  if (state.readLedger && !state.pressedLedger) topics.push("ledger");

  return topics.map((id) => ({
    label: `Ask: “${TOPICS[id].opener}”`,
    quiet: true,
    action: () => talk(id)
  }));
}

// Mark 1: the way out, the way back in, and — if you read it — the ledger
function doorChoices() {
  const clear = state.clues.length >= 2;
  const choices = [
    { label: "Open the door you came in by", note: clear ? "still air" : "", action: () => endGame("table") },
    { label: "Open the paper door at the back", note: clear ? "a cold draft" : "", action: () => endGame("road") }
  ];
  if (state.readLedger) {
    choices.push({ label: "Sign the ledger", action: () => endGame("stay") });
  }
  return choices;
}

function answerChoices() {
  return Object.keys(ANSWERS).map((id) => ({
    label: `${ANSWERS[id].label}: “${ANSWERS[id].say}”`,
    action: () => answer(id)
  }));
}

// ---------- 5. Player actions ----------

// What you see depends on when you look
function lookText(spot) {
  if (state.marks === 3 && spot.whileAway) return spot.whileAway;
  if (state.marks <= 4 && spot.afterRain) return spot.afterRain;
  return spot.text;
}

// examine(id) — looking at something in the room.
// Normally it burns a candle mark. At mark 3 she's out of the room, so it
// spends one of the two free looks instead. At mark 1 it burns the last mark.
function examine(id) {
  const spot = HOTSPOTS[id];
  const lines = [narrate(lookText(spot))];

  state.examined.push(id);
  if (spot.flaw) state.seen.push(spot.flaw);
  if (id === "ledger") state.readLedger = true;

  if (state.marks === 3) {
    state.freeLooks--;
    if (state.freeLooks > 0) {
      showTurn(lines);
      return;
    }
    lines.push(narrate("Footsteps in the hall. She's coming back."));
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
  herReturns([narrate("You sit back down before she can find you standing.")]);
}

// She comes back, and the candle burns down to mark 2
function herReturns(lines) {
  state.marks--;
  showTurn([...lines, ...beatLines()]);
}

// Bringing something up is free. She explains it away — then you decide.
function talk(id) {
  const topic = TOPICS[id];
  show(markTitle(), [you(topic.opener), host(topic.deflect)], [
    { label: `Let it go: “${topic.letGo}”`, quiet: true, action: () => letGo(id) },
    { label: `Press her: “${topic.press}”`, note: "+1 suspicion", action: () => ask(id) }
  ]);
}

// Letting it go costs nothing, and the topic stays open for later
function letGo(id) {
  const topic = TOPICS[id];
  showTurn([you(topic.letGo), host(topic.letGoReply)]);
}

// ask(id) — pressing her about something you've seen.
// This is where the rules meet: it checks what you know, confirms clues,
// spends suspicion, and decides whether she stops pretending.
function ask(id) {
  const topic = TOPICS[id];

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
    lines.push(narrate(`✓ ${topic.name} — confirmed`));
    const composure = COMPOSURE[state.clues.length];
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
  const reply = ANSWERS[id];
  state.answeredHonestly = reply.honest;
  state.marks--;
  showTurn([you(reply.say), host(reply.reply), ...beatLines()]);
}

// ---------- 6. Endings and starting over ----------

function endGame(id, lines = []) {
  const ending = ENDINGS[id];
  const text = [...lines, ...ending.lines];

  // Your answer at mark 2 changes the last line, not the ending
  if (state.answeredHonestly === true) text.push(narrate(ECHO_HONEST));
  if (state.answeredHonestly === false) text.push(narrate(ECHO_LIE));

  text.push(narrate(`Clues confirmed: ${state.clues.length} of 3.`));

  show(`Ending ${ending.number} of 5 — ${ending.title}`, text, [
    { label: "Play again", action: start }
  ]);
}

function start() {
  state = freshState();
  showTurn(beatLines());
}

start();
