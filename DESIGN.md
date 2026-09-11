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
| Candle    | 6 → 0 | Each examine burns one mark (except mark 3's two free looks) | Midnight |
| Suspicion | 0 → 3 | Each direct question about a flaw | The host stops pretending    |

A flaw becomes a **confirmed clue** only when it is both seen and asked about.
Seeing it alone isn't enough — you noticed something odd, but you don't know what
it means until the host explains it away badly.

## The three flaws

| Flaw       | What you see                                                               | What the host says                             | The contradiction                          |
|------------|----------------------------------------------------------------------------|------------------------------------------------|--------------------------------------------|
| Shadow     | The firelight throws her shadow onto the paper wall. It has too many tails. | "The walls are old. The paper warps the light." | The shadow moved before she did           |
| Teaware    | The cup in your hands has a crane on it. You would have sworn it was a plum branch. | "It's a set of twelve, every one different. And you're already on your second cup." | You've had one |
| Reflection | The lacquer tray reflects the room behind you — but no one sitting across from you. | "Lacquer that old doesn't reflect anything clearly. You can't expect it to show everyone at the table." | She answers before you say what you saw |

Two of three is enough to tell the doors apart. Three unlocks the best ending.
That margin is deliberate — a player who finds all three has earned something.

## Flaw dialogue

Every flaw follows the same four steps:

| Step          | What the player does                        | Cost          | Result                                  |
|---------------|---------------------------------------------|---------------|-----------------------------------------|
| 1. Examine    | Looks at the hotspot                        | 1 candle mark (or a free look at mark 3) | Flaw added to `seen` |
| 2. Talk       | Raises the topic (only appears once seen)   | Free          | She deflects — her lie                  |
| 3a. Let it go | Accepts her explanation                     | Free          | Nothing. The topic stays open for later |
| 3b. Press her | Points at the contradiction                 | +1 suspicion  | Flaw moves to `clues` — confirmed       |

Once a flaw is confirmed, its topic disappears from the talk options.

Talking and pressing never burn the candle — only examining does — so she can
be questioned as often as the player likes whenever she's in the room.

Every press ends with a **tell**: something in the room reacts, described in
words. Each flaw hides its proof in a different place, so the three don't feel
like the same puzzle three times:

- **Shadow** — the proof happens *when you press*. The room gives her away.
- **Teaware** — the proof is *what you already know*. Her lie contradicts it.
- **Reflection** — the proof is *already in her free answer*. Players who read
  closely catch her before they press.
- **Ledger** — there is *no proof at all*. It's the trap (see below).

Underneath all three runs one quiet thread from the tea: she wants you drinking,
and sleepy.

### Shadow — the hearth (from mark 6)

**Examine the hearth** · burns 1 mark

> The firelight throws her shadow onto the paper wall. You count the tails twice
> and get a different number every time.

While she's out of the room (mark 3):

> The fire has burned low. On the paper wall, where she was sitting, her shadow
> is still kneeling. You count the tails, and the number keeps changing. Then
> it fades.

**Talk: "Your shadow looks strange on that wall."** · free

> **Host:** "The walls are old. The paper warps the light."

- **Let it go:** "It must just be the paper, yes." · free, no clue

  > **Host:** "Mm. Your tea is getting cold."

- **Press her:** "The paper isn't moving. Your shadow is." · +1 suspicion

  > *She lifts her cup. On the wall, the shadow lifted its cup a moment before
  > she did. The fire in the hearth burns blue for a second.*
  >
  > **Host:** "…You notice far too many details for someone so tired."
  >
  > ✓ Shadow — confirmed

### Teaware — the tea service (from mark 6)

At mark 5, if the player has examined neither the hearth nor the tea service,
she offers a cup — this is the nudge toward this flaw.

**Examine the tea service** · burns 1 mark

> The cup in your hands has a crane painted on it, wings spread. And yet you
> would have sworn it was a plum branch when she poured your tea.

**Talk: "This cup… didn't it have a plum branch painted on it?"** · free

> **Host:** "It's a set of twelve, every one different. And you're already on
> your second cup."

- **Let it go:** "Two cups. Of course." · free, no clue

  > **Host:** "Of course. Drink deep — the night is long."

- **Press her:** "I've only had one cup. I haven't even finished it." · +1 suspicion

  > *The steam rising from your cup turns back and sinks into the tea.*
  >
  > **Host:** "One, then. Mortals are so fussy about numbers."
  >
  > ✓ Teaware — confirmed

### Reflection — the lacquer tray (from mark 4, the rain)

**Examine the lacquer tray** · burns 1 mark

> The rain has darkened the window, and the lacquer tray reflects the light
> like still water. In it you see the room behind you: the hearth, the scrolls,
> your own shoulder — but no one sitting across from you.

While she's out of the room (mark 3):

> The lacquer tray reflects the light like still water. In it you see the room
> behind you — and the host, kneeling across from you, pouring tea. But the
> real cushion is empty.

*(The dialogue below still works: she answers "can't show everyone" before you
say what you saw — and this time she even guesses wrong.)*

**Talk: "I saw something in your lacquer tray."** · free

> **Host:** "Lacquer that old doesn't reflect anything clearly. You can't expect
> it to show everyone at the table."

*(You never said anyone was missing. That's the tell — it's already here.)*

- **Let it go:** "It must just be the rain reflecting off the window." · free, no clue

  > **Host:** "Rain always makes the world look emptier than it really is."

- **Press her:** "I never said anyone was missing from the reflection." · +1 suspicion

  > *For a moment she goes completely still — not a breath. Then she smiles,
  > her lips stretching a little too far.*
  >
  > **Host:** "Didn't you? Hosts learn to guess what their guests are thinking."
  >
  > ✓ Reflection — confirmed

### The ledger — the trap (examine at mark 3, talk once she's back)

The ledger is the most frightening thing in the room, and it proves nothing
about what she is. Pressing her about it spends suspicion and confirms no clue.
This is what makes Ending 4's bad version reachable: a player at suspicion 2
with two clues who presses the ledger instead of the third flaw has accused her
without proof.

**Examine the ledger** · uses one of mark 3's two free looks — mark 3 only, while she's out of the room

> A guest book lies open beside the water jar. Names in hundreds of different
> hands — in brush, in pencil, even a child's careful letters. Every entry bears
> the date of this same night. Decades apart.

Sets `readLedger` — this also unlocks **Sign the ledger** at mark 1 (the Stay ending).

**Talk: "I read your ledger."** · free

> **Host:** "My guest register. Every traveller signs it before they leave."

- **Let it go:** "It's a beautiful old book." · free

  > **Host:** "Isn't it? There's always room for one more name."

- **Press her:** "Every name has tonight's date. Decades apart." · +1 suspicion, **no clue**

  > *She doesn't look at the book. She looks straight at you.*
  >
  > **Host:** "The fog comes on the same night every year, and so do lost
  > travellers. Is it so strange that I keep count?"
  >
  > *Strange, yes. But nothing she said was wrong.*

*(Nothing uncanny happens — no fire, no steam, no tell. That absence is the
signal that this proved nothing, and no ✓ appears in the clue list. After a
press, the topic disappears like a confirmed flaw's would.)*

### Harmless hotspots — the window, the scroll, her fan (from mark 6)

Three things in the room hide nothing. Each burns a mark like any examine and
adds atmosphere, but creates **no talk topic** — that silence is the only sign
it held nothing. They are cozy on purpose: no wrong details, so they never read
as a flaw the player failed to press.

They exist to make the candle a real choice. Five hotspots are open at mark 6
(six once the tray opens at mark 4), but there are only three paid examines
before mark 3 — the player can't look at everything.

**Examine the window** · burns 1 mark

> Fog presses against the paper panes, so thick that the lamplight dies a hand's
> width away. Somewhere out there is the road you came in on.

After the rain (mark 4 on):

> Rain beats on the wooden shutters. The window has gone completely black; you
> can't see the road outside anymore.

**Examine the wall scroll** · burns 1 mark

> A scroll hangs on the wall: a single long brushstroke in the shape of a
> mountain path, and a poem too worn to read. Only the last line has survived —
> *the traveller rests; the road waits.*

**Examine her fan** · burns 1 mark

> Her fan rests folded on the low table: plain paper, worn at the ribs, painted
> with a single maple leaf. It smells faintly of cedar smoke.

**How the budget plays out** (three paid looks, then mark 3's two free ones):

| First three looks          | Mark 3's two free looks        | Result                                  |
|----------------------------|--------------------------------|-----------------------------------------|
| All three flaws            | Ledger + one harmless hotspot  | Sees everything that matters            |
| Two flaws + one harmless   | The missing flaw + the ledger  | Fully caught up                         |
| One flaw + two harmless    | Two of: missing flaws, ledger  | Must choose — a flaw or the ledger      |

One wasted look is forgiven. Two cost something.

## The six marks

| Mark | Beat          | What happens                                                                                           | Hotspots               |
|------|---------------|--------------------------------------------------------------------------------------------------------|------------------------|
| 6    | Arrival       | Scripted, costs nothing. Fog, lamplight, the host pours. She mentions, lightly, that the road isn't safe until dawn. | Hearth, tea service, window, scroll, fan |
| 5    | Settling      | If the player has examined neither the hearth nor the tea service, she offers a cup — a nudge toward the teaware. | Same as mark 6 |
| 4    | The rain      | Rain comes down hard, the window goes black, the lacquer tray catches the light. **Escalation beat.** | + Reflection (tray)    |
| 3    | She leaves    | She goes for more water. The ledger opens: names in a hundred hands, all dated this same night, decades apart. **Two free looks this turn** — you're alone. No talking until she's back. **Sit back down** ends the turn early. | + Ledger |
| 2    | Her question  | Forced dialogue, no hotspots. "Do you really know who you're sitting with?" Lie, deflect, or answer honestly. Sets a flag that changes the ending *text*, not the ending. | — |
| 1    | The doors     | The door you came in by, and the paper door at the back. With 2+ clues, one has a draft and one doesn't. With fewer, they read the same. The room's hotspots stay open, but examining anything burns the last mark — midnight. If the player read the ledger, a third choice appears: **Sign the ledger**. | Two doors (+ Sign the ledger) + any room hotspot not yet examined |

**Mark 3 is the patience reward — a limited one.** While she's out of the room,
the player gets **two free looks**: any open hotspot, including the ledger,
without burning the candle. Unlimited looks would let everyone see everything
and make the early choices meaningless; two lets a player recover from one
wasted look, not two (see "Harmless hotspots").

The game has to *say* so, or players won't use it: the scene text says she'll be
back soon and the flame holds still while she's gone, and each examine button
reads "(free — 2 looks left)". She returns after the second look, or earlier if
the player chooses **Sit back down**. Either way, the candle burns down to mark 2.

**Mark 1 is the last chance to leave.** The room's unexamined hotspots stay
open, and talking is still free. At least one hotspot is always left: there are
six in the room (hearth, tea service, tray, window, scroll, fan) and only five
looks before mark 1. But examining anything now burns the last mark — its text
plays, the flame gutters out, and it's midnight (Ending 3).

It must be a choice, not a surprise: the candle reads "1 of 6 marks left", the
scene text says the flame is almost gone, and each examine button reads
"(burns the last mark)".

If the player read the ledger, she sets it down beside the doors and holds out a
brush — *every traveller signs it before they go*. That's a third way to end the
night: **Sign the ledger** (Ending 5). Like the doors, it ends the game at once
and burns nothing. Players who never read the ledger never see this choice.

## Five endings

1. **Right door, 2+ clues** — you step into real fog and real cold.
2. **Wrong door** — you walk in, and you're seated at the table again. The candle has six marks.
3. **Candle out** — midnight. Your name appears in the ledger, in your own handwriting.
   Reached by examining something at mark 1 instead of choosing a door.
4. **Suspicion 3** — she removes the mask. With all three clues this is the *good*
   ending: she's impressed and lets you go. With fewer, you accused her without
   proof, and she keeps you — as the one who pours the tea now, the house's new
   host. (The usual way to get here with fewer clues is
   pressing her about the ledger — see "The ledger — the trap".)
5. **Stay** — only if you read the ledger: at mark 1, **Sign the ledger** appears
   beside the doors. You sign. Melancholy rather than punishing.

Ending 4 is the one to build carefully: same trigger, opposite outcomes depending
on whether the player did the work.

---

## State

```js
const state = {
  marks: 6,
  suspicion: 0,
  freeLooks: 2,          // mark 3 looks left while she's out of the room
  examined: [],          // every hotspot looked at (each only once)
  seen: [],              // flaws noticed
  clues: [],             // flaws confirmed
  readLedger: false,
  pressedLedger: false,  // suspicion spent on the ledger — never a clue
  answeredHonestly: null
};
```

**Code walkthrough function (6-minute section): `ask(topic)`.** It's where
everything meets:

1. Check the topic has been seen — `seen` for a flaw, `readLedger` for the ledger.
2. Move it to `clues` — unless it's the ledger, which is never proof.
3. Raise suspicion.
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
for what the unmasking reveals (see below).

### The host's face is the mask

Her human face *is* the mask: a glamour that looks and moves like flesh until
the illusion breaks, and then detaches and falls away like porcelain (Endings 4a
and 4b). During play she has a warm, real-looking face — which is exactly why
her smile freezing, or smiling "a little too wide", reads as creepy.

For the host illustration: a warm, realistic portrait that only subtly hints at
the spirit beneath. The unnatural part should be almost invisible until the
player knows to look for it.

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
      The direction is set — see "The host's face is the mask".
- [x] Draft the dialogue for the three flaws (see "Flaw dialogue").
- [x] Make Ending 4's bad version reachable — the ledger is a trap topic:
      +1 suspicion, no clue (see "The ledger — the trap").
- [x] Mark 3: examining is free while she's out of the room; **Sit back down**
      ends the turn (see the note under "The six marks").
- [x] Make the candle force a choice — three harmless hotspots (window, scroll,
      fan), and mark 3's free looks capped at two (see "Harmless hotspots").
- [x] Make Ending 3 (candle out) reachable — the room's hotspots stay open at
      mark 1, and examining one burns the last mark (see the note under "The
      six marks").
- [ ] **Decided while building the playable version — review these:**
      - The way out is the **paper door at the back**; the door you came in by
        leads back to the table (Ending 2).
      - With fewer than 2 clues the doors read the same, but a lucky guess on
        the paper door still escapes.
      - Rewritten from your own notes: the endings, the mark beats (including
        the nudge, the doors and the ledger offer), her question's three
        answers, the two "she'll remember" lines, her composure lines, the
        flaw dialogue, and the hotspot descriptions. Still Claude's wording
        (approved earlier, but not from your notes): the suspicion lines, and
        the two lines as she returns at mark 3.
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
