# The Kitsune's Tea House — Design Page

Track **C — Story** (mystery / dialogue game). One screen, one clear loop.

This file is the source of truth for the concept. It was written from the
original design conversation so the ideas live in the repo, not in a chat.

---

## Pitch

A short mystery where you shelter from the fog in a roadside tea house and have
until the candle burns down to prove your gracious host is a kitsune — then pick
the door that leads home.

## Core loop

1. **Read** the scene at the current candle mark.
2. **Choose:** examine something (burns a mark) or ask the host about something
   odd (raises her suspicion).
3. **Confirm:** a flaw you have both *seen* and *asked about* becomes a clue.
4. **The candle burns down** and the scene changes.
5. At the last mark, **choose a door.**

---

## Two resources, not one

Examining costs **time**. Asking costs **suspicion**. That split makes this a
dialogue game rather than a search game: the tension is what you are willing to
say out loud, not whether you clicked everything.

| Resource  | Range | Spent by                          | At the limit                 |
|-----------|-------|-----------------------------------|------------------------------|
| Candle    | 6 → 0 | Each examine burns one mark       | Midnight                     |
| Suspicion | 0 → 3 | Each direct question about a flaw | The host stops pretending    |

A flaw becomes a **confirmed clue** only when it is both seen and asked about.
Seeing it alone isn't enough — you noticed something odd, but you don't know what
it means until the host explains it away badly.

## The three flaws

| Flaw       | What you see                                                               | What the host says                             | The contradiction                          |
|------------|----------------------------------------------------------------------------|------------------------------------------------|--------------------------------------------|
| Shadow     | Firelight throws her shadow on the paper wall. It has too many tails.      | "Old walls. The paper warps."                  | The shadow moved before she did            |
| Teaware    | The cup in your hands has a crane on it. You'd have sworn it was a plum branch. | "A set of twelve, every one different. You've had two cups already." | You've had one |
| Reflection | The black lacquer tray shows the room behind you — and no one across from you. | "Lacquer that old holds nothing clearly. You can't expect it to show everyone at the table." | She answers before you say what you saw |

Two of three is enough to tell the doors apart. Three unlocks the best ending.
That margin is deliberate — a player who finds all three has earned something.

## Flaw dialogue

Every flaw follows the same four steps:

| Step          | What the player does                        | Cost          | Result                                  |
|---------------|---------------------------------------------|---------------|-----------------------------------------|
| 1. Examine    | Looks at the hotspot                        | 1 candle mark | Flaw added to `seen`                    |
| 2. Talk       | Raises the topic (only appears once seen)   | Free          | She deflects — her lie                  |
| 3a. Let it go | Accepts her explanation                     | Free          | Nothing. The topic stays open for later |
| 3b. Press her | Points at the contradiction                 | +1 suspicion  | Flaw moves to `clues` — confirmed       |

Once a flaw is confirmed, its topic disappears from the talk options.

Every press ends with a **tell**: something in the room reacts, described in
words. Each flaw hides its proof in a different place, so the three don't feel
like the same puzzle three times:

- **Shadow** — the proof happens *when you press*. The room gives her away.
- **Teaware** — the proof is *what you already know*. Her lie contradicts it.
- **Reflection** — the proof is *already in her free answer*. Players who read
  closely catch her before they press.

Underneath all three runs one quiet thread from the tea: she wants you drinking,
and sleepy.

### Shadow — the hearth (from mark 6)

**Examine the hearth** · burns 1 mark

> Firelight throws her shadow across the paper wall. You count the tails twice
> and get a different number each time.

**Talk: "Your shadow looks strange on that wall."** · free

> **Host:** "Old walls. The paper warps."

- **Let it go:** "Must be the paper." · free, no clue

  > **Host:** "Mm. Your tea is getting cold."

- **Press her:** "The paper isn't moving. Your shadow is." · +1 suspicion

  > *She lifts her cup. On the wall, the shadow lifted its cup a moment before
  > she did. The fire gutters blue for a breath.*
  >
  > **Host:** "…You notice a great deal, for someone so tired."
  >
  > ✓ Shadow — confirmed

### Teaware — the tea service (from mark 6)

At mark 5, if the player has examined neither hotspot, she offers a cup — this
is the nudge toward this flaw.

**Examine the tea service** · burns 1 mark

> The cup in your hands has a crane painted on it, wings spread. You'd have
> sworn it was a plum branch when she poured.

**Talk: "This cup — wasn't there a plum branch on it?"** · free

> **Host:** "A set of twelve, every one different. You've had two cups already."

- **Let it go:** "Two cups. Of course." · free, no clue

  > **Host:** "Of course. Drink deeply — it's a long night."

- **Press her:** "I've had one cup. I haven't even finished it." · +1 suspicion

  > *The steam from your cup sinks back into the tea instead of rising.*
  >
  > **Host:** "One, then. Mortals are so particular about counting."
  >
  > ✓ Teaware — confirmed

### Reflection — the lacquer tray (from mark 4, the rain)

**Examine the lacquer tray** · burns 1 mark

> Rain has turned the window black, and the lacquer tray holds the lamplight
> like still water. In it you see the room behind you: the hearth, the scrolls,
> your own shoulder — and no one sitting across from you.

**Talk: "I saw something in your tray."** · free

> **Host:** "Lacquer that old holds nothing clearly. You can't expect it to show
> everyone at the table."

*(You never said anyone was missing. That's the tell — it's already here.)*

- **Let it go:** "Just the rain on the window, I suppose." · free, no clue

  > **Host:** "The rain makes everything look emptier than it is."

- **Press her:** "I never said anyone was missing." · +1 suspicion

  > *For a moment she doesn't move at all — not a breath. Then she smiles, a
  > little too wide.*
  >
  > **Host:** "Didn't you? Hosts learn to guess what their guests are thinking."
  >
  > ✓ Reflection — confirmed

## The six marks

| Mark | Beat          | What happens                                                                                           | Hotspots               |
|------|---------------|--------------------------------------------------------------------------------------------------------|------------------------|
| 6    | Arrival       | Scripted, costs nothing. Fog, lamplight, the host pours. She mentions, lightly, that the road isn't safe until dawn. | Hearth, tea service    |
| 5    | Settling      | If the player has examined neither hotspot, she offers a cup — a nudge toward the teaware.            | Hearth, tea service    |
| 4    | The rain      | Rain comes down hard, the window goes black, the lacquer tray catches the light. **Escalation beat.** | + Reflection (tray)    |
| 3    | She leaves    | She goes for more water. The ledger opens: names in a hundred hands, all dated this same night, decades apart. **Asking costs no suspicion this turn.** | + Ledger |
| 2    | Her question  | Forced dialogue, no hotspots. "Do you know what I am?" Lie, deflect, or answer honestly. Sets a flag that changes the ending *text*, not the ending. | — |
| 1    | The doors     | The door you came in by, and the paper door at the back. With 2+ clues, one has a draft and one doesn't. With fewer, they read the same. | Two doors |

## Five endings

1. **Right door, 2+ clues** — you step into real fog and real cold.
2. **Wrong door** — you walk in, and you're seated at the table again. The candle has six marks.
3. **Candle out** — midnight. Your name appears in the ledger, in your own handwriting.
4. **Suspicion 3** — she removes the mask. With all three clues this is the *good*
   ending: she's impressed and lets you go. With fewer, you accused her without
   proof, and she keeps you.
5. **Stay** — only if you read the ledger. You sign. Melancholy rather than punishing.

Ending 4 is the one to build carefully: same trigger, opposite outcomes depending
on whether the player did the work.

---

## State

```js
const state = {
  marks: 6,
  suspicion: 0,
  seen: [],              // flaws noticed
  clues: [],             // flaws confirmed
  readLedger: false,
  answeredHonestly: null
};
```

**Code walkthrough function (6-minute section): `ask(topic)`.** It's where
everything meets:

1. Check whether the flaw is in `seen`.
2. Move it to `clues`.
3. Raise suspicion — unless it's mark 3.
4. Pick which of the host's lines to show, based on what's already confirmed.
5. Check whether suspicion hit the threshold.

---

## Screens (wireframes)

Paper versions are still needed for class — these show the layout.

**Start (index.html)**

```
+---------------------------------------------+
| The Kitsune's Tea House   Home  Game  How to|
+---------------------------------------------+
|                                             |
|          THE KITSUNE'S TEA HOUSE            |
|     Fog has closed the road... (pitch)      |
|                                             |
|   [ Enter the tea house ]  [ How to play ]  |
|                                             |
+---------------------------------------------+
```

**Playing (game.html)**

```
+---------------------------------------------+
| The Kitsune's Tea House   Home  Game  How to|
+---------------------------------------------+
| +---------------------+  Candle: 4 of 6     |
| |                     |  [#][#][#][#][.][.] |
| |  host illustration  |  She has not        |
| |                     |  blinked.           |
| +---------------------+                     |
| Mark 4 — The rain                           |
| Scene text...                               |
| [ Examine the tray ]  [ Ask about the cup ] |
|                                             |
| Confirmed clues                             |
|  ✓ Teaware — confirmed                      |
+---------------------------------------------+
```

**Game over (same screen, stage swapped for the ending)**

```
+---------------------------------------------+
| The Kitsune's Tea House   Home  Game  How to|
+---------------------------------------------+
|  Ending title                               |
|  Ending text (varies with the flags)        |
|  Clues confirmed: 2 of 3                    |
|  [ Play again ]  [ How to play ]            |
+---------------------------------------------+
```

---

## Art direction (draft — yours to approve or change)

**Mood: cozy on the surface, wrong in the details.** The reference sheets split
into two moods: warm plant-and-paper characters, and masked, stitched dolls. The
game lives between them, which is the same thing the three flaws do.

### Palette

| Token         | Hex       | Role                               | Contrast on washi |
|---------------|-----------|------------------------------------|-------------------|
| `--washi`     | `#f2e8d5` | Paper wall — page background       | —                 |
| `--sumi`      | `#2a211c` | Ink — body text                    | 13:1              |
| `--tea`       | `#8b5e3c` | Wood, tea — muted text, footer     | 4.6:1             |
| `--sage`      | `#6b7f5e` | Leaves — borders, quiet UI         | 3.6:1 (non-text only) |
| `--lacquer`   | `#2f5d5a` | Lacquer tray — buttons, links      | 6.1:1             |
| `--persimmon` | `#c0582f` | Lamplight — focus ring, candle     | 3.7:1 (non-text only) |

Sage and persimmon are below 4.5:1, so they are never used for text — only for
borders, the focus ring and the candle, where 3:1 is the requirement.

### Type pairing

- **Shippori Mincho** — headings. A Japanese Mincho serif; brush-like contrast.
- **Zen Kaku Gothic New** — body and buttons. A calm Japanese sans that stays
  readable at small sizes on a phone.

Both from Google Fonts, with system fallbacks.

### One reference

The **ram samurai** sheet: ink linework on aged cream paper, teal and vermilion
accents. It's the closest match to a Japanese tea house, and the palette above
is pulled largely from it. The **masked scarecrow / doll sheets** are the model
for the host's mask (the Suspicion-3 unmasking).

> The reference images are other artists' work (several are watermarked). Keep
> them in `img/references/` — that folder is git-ignored so they never end up in
> the public repo.

---

## Accessibility and the non-negotiables

- **Same nav on all 3 pages:** Home · Game · How to Play (`aria-current` marks
  the active page with bold + underline, not colour alone).
- **Phone-playable:** every choice is a button at least 44px tall; no gestures.
- **Keyboard-playable:** choices are real `<button>`s; visible 3px focus ring.
- **Never colour alone:** suspicion is a line of escalating *text* ("She is
  pouring tea" → "She has not blinked" → "She is watching your hands"). No bar,
  no red. Clues get a ✓ **and** the word "confirmed". The candle marks change
  *shape* (full vs. burnt stub) and have a text count.

## Scope guard

- Plain HTML / CSS / JS. No React, no Vite, no build step — GitHub Pages works
  as-is and every line can be explained in the walkthrough.
- The Figma Make project ("Design System – Assets") stays separate. It is where
  art comes from, not where the game lives.

## Open decisions

- [ ] Approve or change the palette and fonts above.
- [ ] Where the host illustration comes from (Figma Make PNG, drawn, generated).
- [x] Draft the dialogue for the three flaws (see "Flaw dialogue").
- [ ] **Ending 4's bad version can't happen yet.** Talk options only appear
      after you've seen a flaw, and every press confirms a clue — so suspicion
      and clues always rise together, and reaching suspicion 3 means you have
      all 3 clues. Suggestion: after mark 3, let the player press her about the
      **ledger**. It's the scariest thing in the room, but it isn't proof of what
      she is: +1 suspicion, no clue. The obvious accusation becomes the trap.
- [ ] **Mark 3 says asking costs no suspicion, but she's out of the room.**
      Decide what's free that turn. Suggestion: examining is free instead (you're
      alone, you can look without the candle burning).
- [ ] The brief grades "split one index.html into files". This repo started
      split — be ready to explain how the three pages load `style.css` and
      `game.js`.

## Timeline

| Week | Goal                                                                 |
|------|----------------------------------------------------------------------|
| 1    | Track chosen + this design page approved                             |
| 2    | First playable version deployed — ugly is fine, broken is not        |
| 3    | Refactor done: files split, tokens in, validator clean. Watch 2 people play |
| 4    | Polish, README                                                       |
