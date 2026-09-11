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
    lines: [
      narrate("Fog swallows the road behind you completely. Ahead, a warm yellow light glows in the paper window of a tea house, a welcome that feels almost staged."),
      host("The fog out there forgives no one until dawn… Come in. The tea is already poured.")
    ]
  },
  5: {
    title: "Settling",
    lines: [narrate("The embers in the hearth glow a faint red. Time seems to slow. She kneels in silence across from you, watching you over the rim of her cup.")]
  },
  4: {
    title: "The rain",
    lines: [
      narrate("Rain hits the walls all at once, sudden and violent, and the world outside disappears. The lamplight falls on the black lacquer tray and lies there like a mirror of water."),
      host("The storm is here. Now it's just us, and this room.")
    ]
  },
  3: {
    title: "She leaves",
    lines: [
      narrate("“I'll fetch more water,” she says, and slides the door shut behind her. You're alone… but the candle flame doesn't move, as if even the air has stopped."),
      narrate("A guest book lies open beside the water jar. You have just enough time to examine two things before she comes back.")
    ]
  },
  2: {
    title: "Her question",
    lines: [
      narrate("She comes back and kneels slowly across from you, her eyes fixed on yours. The steam from the tea rises between you."),
      host("Tell me, traveller… after everything you've seen, do you really know who you're sitting with?")
    ]
  },
  1: {
    title: "The doors",
    lines: [
      narrate("The candle is down to a last sliver of wax, about to go out, throwing long shadows across the paper doors."),
      host("The candle is at its end… If you want to see daylight, your choice has to be made now.")
    ]
  }
};

// Extra lines that depend on what the player has done
const NUDGE = host("Tea waits for no one… Drink a little. It's still warm.");
const DOORS_CLEAR = narrate("At the door you came in by, the air is stale and still. Through the paper door at the back, a cold, damp breeze slips in, faintly smelling of pine.");
const DOORS_UNCLEAR = narrate("Two identical paper doors in the half-dark. The air is still at both, and nothing tells you which way is true.");
const LEDGER_OFFER = narrate("She sets the ledger down near the doors and holds out a brush soaked in fresh ink, waiting in silence.");

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
    deflect: "The walls are old. The paper warps the light.",
    letGo: "It must just be the paper, yes.",
    letGoReply: "Mm. Your tea is getting cold.",
    press: "The paper isn't moving. Your shadow is.",
    tell: "She lifts her cup. On the wall, the shadow lifted its cup a moment before she did. The fire in the hearth burns blue for a second.",
    reply: "…You notice far too many details for someone so tired."
  },
  teaware: {
    name: "Teaware",
    opener: "This cup… didn't it have a plum branch painted on it?",
    deflect: "It's a set of twelve, every one different. And you're already on your second cup.",
    letGo: "Two cups. Of course.",
    letGoReply: "Of course. Drink deep — the night is long.",
    press: "I've only had one cup. I haven't even finished it.",
    tell: "The steam rising from your cup turns back and sinks into the tea.",
    reply: "One, then. Mortals are so fussy about numbers."
  },
  reflection: {
    name: "Reflection",
    opener: "I saw something in your lacquer tray.",
    deflect: "Lacquer that old doesn't reflect anything clearly. You can't expect it to show everyone at the table.",
    letGo: "It must just be the rain reflecting off the window.",
    letGoReply: "Rain always makes the world look emptier than it really is.",
    press: "I never said anyone was missing from the reflection.",
    tell: "For a moment she goes completely still — not a breath. Then she smiles, her lips stretching a little too far.",
    reply: "Didn't you? Hosts learn to guess what their guests are thinking."
  },
  ledger: {
    name: "Ledger",
    opener: "I read your ledger.",
    deflect: "My guest register. Every traveller signs it before they leave.",
    letGo: "It's a beautiful old book.",
    letGoReply: "Isn't it? There's always room for one more name.",
    press: "Every name has tonight's date. Decades apart.",
    tell: "She doesn't look at the book. She looks straight at you.",
    reply: "The fog comes on the same night every year, and so do lost travellers. Is it so strange that I keep count?",
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
  "Her smile freezes for a fraction of a second. Then she pours you more tea with impeccable calm, as if your words were only a passing breeze.",
  "She sets the teapot down on the wooden table with a hard knock, and doesn't touch it again. The warmth has gone from her face completely, and a heavy silence fills the room."
];

// Her question at mark 2. The answer changes the ending's last line, not the ending.
const ANSWERS = {
  lie: {
    label: "Lie",
    say: "Just the lady of this tea house. Nothing more.",
    reply: "Of course. And nothing more than that needs to be said in this room.",
    honest: false
  },
  deflect: {
    label: "Deflect",
    say: "I only know that you serve excellent tea… and that the night would be much colder without it.",
    reply: "That isn't an answer, traveller… but it's a courtesy I appreciate.",
    honest: null
  },
  honest: {
    label: "Be honest",
    say: "I've looked at you closely… and I'm sure I'm not talking to a human.",
    reply: "Honest guests are so rare around here… The mountain air usually brings more pretending.",
    honest: true
  }
};

const ECHO_HONEST = "She'll remember that you looked the spirit in the eye and told the truth.";
const ECHO_LIE = "She'll remember that you chose the lie to keep up appearances.";

// The five endings (DESIGN.md, "Five endings"). Ending 4 has two versions.
const ENDINGS = {
  road: {
    number: 1,
    title: "The road",
    lines: [
      narrate("You slide the paper door open, and the cold night air rushes into your lungs, like waking from a strange dream. Your breath rises as mist under the moonlight. Behind you, the door slides shut on its own."),
      narrate("The air outside has never tasted so good. But don't look back.")
    ]
  },
  table: {
    number: 2,
    title: "The table",
    lines: [
      narrate("You step through, and you're kneeling at the low table again. The candle stands tall and whole, its flame perfectly still. The tea is still steaming."),
      host("You only just sat down… Have a little more tea.")
    ]
  },
  midnight: {
    number: 3,
    title: "Midnight",
    lines: [
      narrate("The flame goes out. A thread of black smoke rises from the wick, and in the dark, fresh ink glistens on the ledger's page: your name, in your own handwriting."),
      host("The night is over. From now on, your story belongs to the house.")
    ]
  },
  maskGood: {
    number: 4,
    title: "The mask",
    lines: [
      narrate("She draws her porcelain mask slightly aside. Beneath it is a sly smile, as if you're both in on the joke, and eyes that shine in the half-dark."),
      host("Three centuries without a mortal unmasking me… Go on, traveller. You've won the night.")
    ]
  },
  maskBad: {
    number: 4,
    title: "The mask",
    lines: [
      narrate("Her mask falls to the tatami with a dry clack. Behind it there's no face, only a shadow, leaning over you."),
      host("Accusations without proof are just bedtime stories. Now sit down, and pour the tea.")
    ]
  },
  stay: {
    number: 5,
    title: "The ledger",
    lines: [
      narrate("You sign. Your own name sits on the page in flawless calligraphy, and the steam from the tea wraps the room in a golden embrace."),
      narrate("Why go back out into the fog, when here the tea never goes cold?")
    ]
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
