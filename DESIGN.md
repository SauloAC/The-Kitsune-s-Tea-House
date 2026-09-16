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

Every ending shows **what becomes of your name in the ledger**. That is the
thread that answers the question the ledger raises at mark 3: whose names are
these, all dated tonight and decades apart, and what happened to them?

There are three fates, and every ending lands on one of them and says so in
plain words: you **get away** (1, 4 good), the house **keeps you** as one more
name dated tonight (2, 3), or you **take her place** and she goes free (4 bad,
5). Only a name written by your own choice releases her.

1. **The road** — the paper door at mark 1. Two versions:
   - **With 2+ clues:** you leave at first light, and the ledger stays behind
     with its next page blank. Your name is never written.
   - **With fewer:** you stumble out into the morning and look back at nothing
     but old trees. You got away, but you never learn from what.

   With fewer than two clues the doors read the same, so a lucky guess still
   escapes — it just doesn't earn the same ending as working it out.
2. **The table** — the door you came in by. The night begins again: the candle
   whole, the tea steaming, a fresh blank page waiting. This is why every name
   in the ledger bears tonight's date. The ending says how the loop can end —
   only when something of yours stays in the book, your name or the proof of
   who she is — so the player learns that the other doors are the way out.
   Choosing this door sets the candle back to six marks, because the text says
   it is whole again and the HUD is right there beside it.
3. **Midnight** — examining something at mark 1 instead of choosing a door. In
   the dark, a brush writes your name on its own. You made no choice, so the
   house chose for you — and the ending says what that is worth: the candle is
   lit again, you are still at the table and will stay there, your name under
   all the others dated tonight, while she fills your cup and waits for the
   next traveller. A name taken from you does **not** release her; only the
   one you write yourself does (Ending 5). That is what tells the two apart.
4. **The mask** — suspicion reaches 3. Two versions:
   - **With all three clues:** she lifts the mask, strikes out the space where
     your name would have gone, and lets you go.
   - **With fewer:** you accused her without proof. Her face falls away, an
     empty porcelain mask; you put it on, and find her own name in the ledger's
     first pages, three hundred years old. She was a traveller once. That is
     the house's rule of succession, and the ending says it outright: now you
     keep the hearth lit and pour the tea, forever — or until the next traveller
     accuses without proof and takes your place. A player who knows and *proves*
     it goes free (the good version), so the rule is about accusing, not
     knowing. The house has a second door to the same place — signing the
     ledger (Ending 5) — and that one is chosen, not forced. Either way she is
     released and you take the place she leaves. (The usual way here with fewer clues is pressing her about the
     ledger — see "The ledger — the trap".)
5. **Stay** — only if you read the ledger: at mark 1, **Sign the ledger** appears
   beside the doors. The only ending where you write your own name, and by
   choice — and the house takes it as her release. She sets the teapot down for
   the first time in three hundred years, thanks you, and walks out into the
   fog; you pour the third cup, and the tea won't run out until another
   traveller signs. Melancholy rather than punishing: nobody forced you.

Endings 1 and 4 are the ones to build carefully: the same trigger, opposite
outcomes, depending on whether the player did the work.

### Her question, remembered

Your answer at mark 2 never changes which ending you get. It changes how the
answer is remembered, and by whom. Deflecting leaves nothing to remember.

| When the night ends with… | Endings | The honest answer or the lie is… |
|---|---|---|
| You getting away | The road (both), The mask (good) | *remembered by her* |
| The house keeping you | Midnight, Stay | *remembered by her… forever* |
| The night beginning again | The table | *still remembered, though the night has begun again* |
| You taking her place | The mask (bad) | *remembered by you, behind the mask* — she is gone |

`ENDING_MEMORY` in `js/game.js` picks which of the four; the words live under
`remember` in `js/text.js`.

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
| |  host illustration  |  She doesn't        |
| |                     |  blink.             |
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

## Art direction (approved 2026-09-14)

**Mood: cozy on the surface, wrong in the details.** The reference sheets split
into two moods: warm plant-and-paper characters, and masked, stitched dolls. The
game lives between them, which is the same thing the three flaws do.

### Palette

**The house is paper and the world outside is night.** Every word you read in
the game or the rules sits on washi. The night carries only the header, the
footer, the home page's pitch (and its two buttons, when the cover is too small
to carry them), and the art.

| Token          | Hex       | Role                                   | Contrast |
|----------------|-----------|----------------------------------------|----------|
| `--washi`      | `#f2e8d5` | Paper — every surface you read on      | 13.1:1 as text on night |
| `--sumi`       | `#2a211c` | Ink — text on paper                    | 13:1 on washi |
| `--tea`        | `#8b5e3c` | Wood, tea — muted text on paper        | 4.6:1 on washi |
| `--sage`       | `#6b7f5e` | Leaves — borders, quiet UI             | 3.6:1 on washi and on night (non-text only) |
| `--lacquer`    | `#2f5d5a` | Lacquer tray — buttons, links          | 6.1:1 on washi · **2.1:1 on night, so paper only** |
| `--persimmon`  | `#c0582f` | Lamplight — focus ring, candle, seal   | 3.7:1 on washi, 3.5:1 on night (non-text only) |
| `--night`      | `#1b2233` | The sky — page background              | — |
| `--night-deep` | `#121827` | Where the night meets the ground       | — |
| `--moon`       | `#efe2c2` | The moon — art only                    | never text |
| `--mist`       | `#b8ad98` | Muted text on the night (the footer)   | 7.2:1 on night |

Those ten are the whole palette. Everything else in `css/style.css` is one of
them made translucent with `color-mix` — never a new hue, and never a colour
written out by hand: `--washi-veil`, washi at 90%, for paper laid over a
picture (the HUD and the cover's button slips); sumi at 55% for the log's
backdrop; moon at 12% for its glow. The one exception is the black drop shadow
under the rules page. The
grass in `img/susuki.svg` and the cover print are art, and keep their own
colours.

The rules that keep it readable:

- **Sage and persimmon are below 4.5:1**, so they are never text — only borders,
  the focus ring and the candle, where 3:1 is the requirement. Both clear it on
  paper and on the night.
- **Lacquer never leaves the paper.** On the night it drops to 2.1:1 and the
  buttons would vanish. The home page's two buttons, the only ones on the night,
  are made of paper instead: a washi fill with ink text, and a washi outline.
- **Nothing lighter than `--night` sits behind anything you read or focus.** On
  a lifted indigo like `#26314a` the focus ring falls to 2.9:1. So the moon's
  glow on wide screens hangs in the empty margin beside the page, and the grass
  along the bottom (`img/susuki.svg`) is darker than the sky — text crossing it
  only gains contrast.

### Type pairing

- **Shippori Mincho** — headings, the site title, and the cover's title and
  buttons. A Japanese Mincho serif; brush-like contrast.
- **Zen Kaku Gothic New** — body text, choices and buttons. A calm Japanese
  sans that stays readable at small sizes on a phone.

Both from Google Fonts with `display=swap`, so the words show at once in the
system fallback (Yu Mincho or Georgia; Segoe UI or the system sans) and change
face when the font arrives. Checked on the live site: both families load, so no
page is quietly running on its fallback.

### References

- **The ram samurai sheet** — ink linework on aged cream paper, teal and
  vermilion accents. The paper half of the palette comes from it: washi, sumi,
  tea, sage, lacquer, persimmon.
- **Night prints in the ukiyo-e manner** — Yoshitoshi's *One Hundred Aspects of
  the Moon* and the cover print. The night half comes from them: night,
  night-deep, moon, mist.
- **The masked scarecrow / doll sheets** — the model for what the unmasking
  reveals (see below).

### The home page's cover

`img/home-cover.jpg` — an AI-generated print in the ukiyo-e manner (Gemini),
directed by the author. A red maple and a red moon over a lake with Mount Fuji,
a pagoda and a lone fisherman. On the veranda of the tea house
the host kneels — the same woman as in the game's portraits — while the lit
shoji behind her carries the shadow of a nine-tailed fox.

- **It is the first flaw, told as a picture.** She looks human; the lamp throws
  a shape that isn't. The shadow is the clue.
- **Nothing is written in the picture.** It was generated with an empty
  cartouche and a plain floor on purpose. The title and the buttons are HTML
  laid on top, placed by percentages measured on the pixels (the cartouche's
  inner rule runs 27.9%–72% across and 9.5%–25% down), so they translate, take
  keyboard focus and read aloud. A menu painted into the image would do none of
  that.
- **The picture itself is decorative** (`alt=""`): the title, the pitch and the
  buttons carry everything a screen reader needs.
- **One moon, and it's red.** The generator painted a pale full moon in the
  top left as well as the red one. The pale one was painted out of the source
  (`img/references/cover-source-one-moon.png`): each row of it refilled with
  the sky on either side, so the gradient carries straight through, and the
  sky's own grain copied back in from a clear strip nearby, so the patch
  doesn't read as smooth.
- **The torn paper edge is a mask.** The generator put the print on a white
  ground. `img/home-cover-mask.png` is cut along the deckle — a flood fill of
  the white inward from the image's border, so the moon and the lantern light
  stay untouched — and CSS `mask` uses it to set the print straight on the night.
- **Buttons on the picture, never on the picture's colours.** Ink on bare
  tatami is about 4.4:1 and persimmon falls below 3:1, so each button sits on a
  slip of washi and its focus ring turns to ink. They only move onto the cover
  once it is at least 28rem wide (a container query); smaller than that, they
  sit beneath it on the night, made of paper.
- **No animation.** Moving decoration that runs past five seconds needs a pause
  control under WCAG 2.2.2. A still print needs none.
- **What was thrown away.** An earlier generation painted in a false title
  ("Kitsune Chronicles", 紅狐传奇, which even mixes simplified Chinese into the
  Japanese), a Portuguese-only menu with pages the game doesn't have, a
  white-faced geisha who contradicts "the host's face is the mask", and copies
  of Tsukioka Yoshitoshi's signature, seal and series cartouche from *One
  Hundred Aspects of the Moon* (1892). The prompt was rewritten to forbid text,
  seals and signatures and to describe the game's own host. A hand-drawn SVG
  version came before both and was dropped: flat vector couldn't reach the
  texture of a print.

### The host's face is the mask

Her human face *is* the mask: a glamour that looks and moves like flesh until
the illusion breaks, and then detaches and falls away like porcelain (Endings 4a
and 4b). During play she has a warm, real-looking face — which is exactly why
her smile freezing, or smiling "a little too wide", reads as creepy.

For the host illustration: a warm, realistic portrait that only subtly hints at
the spirit beneath. The unnatural part should be almost invisible until the
player knows to look for it.

### The portraits

| Portrait | Shown when | File |
|----------|------------|------|
| Normal | Suspicion 0–1 | `img/host-normal.jpg` |
| Suspicious | Suspicion 2 or more — she is watching your hands | `img/host-suspicious.jpg` |
| The mask, good | Ending 4, with all three clues | `img/host-mask-good.jpg` |
| The mask, bad | Ending 4, with fewer | `img/host-mask-bad.jpg` |
| The road, earned | Ending 1, with 2+ clues | `img/scene-road-earned.jpg` |
| The road, by luck | Ending 1, with fewer | `img/scene-road-lucky.jpg` |
| The guest book | Ending 5, signing the ledger | `img/scene-stay.jpg` |

All seven are 688 × 516 JPEGs (4:3) in the palette above. `normal` and
`suspicious` share a face, framing and crop, because they swap mid-game, where
anything that moved between them would read as a glitch. The two mask portraits
only appear once the game is over, so each is allowed a shot of its own.

**Each version of Ending 4 has its own reveal**, drawn to match its text:

- **Good:** she lifts a white porcelain mask away from her face. Beneath it are
  amber fox eyes, red markings and a genuine smile; there's a brush in her other
  hand, and one bold stroke struck across the open ledger. The fox shadow behind
  her is calm, its eyes not glowing.
- **Bad:** darkness where her face was. Her face lies on the table as a cracked
  porcelain mask, beside an old ledger and a candle that has just gone out,
  while the fox shadow dissolves into mist. The ending's text says the mask falls
  *onto the table*, to match the picture.

These replace a single "unmasked" portrait of her wearing a horned demon mask,
which told neither story once the endings were rewritten.

**The two escapes show where you are, not her.** While you're in the house the
picture is always the host. Once you've left, it isn't — so the picture itself
says the curse is behind you.

- **The road, earned:** at dawn, a traveller in a straw hat and cloak comes down
  the road with the tea house still glowing behind him and the fog settling in
  the valley. He walks toward the viewer and away from the house, so it reads
  as leaving; a version seen from behind read as arriving, and was dropped.
  Showing his face fits the text, which already calls the traveller "he" in
  Portuguese, Spanish and French.
- **The road, by luck:** an empty clearing of old cedars, where the path simply
  ends in the grass. No house — only a line of mossy stones, like the footing
  of something that isn't there any more.
- **The guest book:** the reverse of the roads. From the guest's place at the
  low table, a pair of hands holds the brush over the open ledger with the ink
  still wet, the teapot set down beside a steaming cup, and the host walking
  away into the fog through the open door. She leaves, you stay — the ending's
  bargain in one frame.

**The HUD follows the picture.** Its last line is normally her suspicion
("She is pouring tea."), but once the night has resolved her suspicion is
beside the point, so the line says how it ended instead. On the two roads:
"She pours tea for the next traveller." with
the house still behind you, and "The house is gone, and so is she." when it has
vanished. The lines are short on purpose: a longer first draft wrapped to four
lines on a phone and pushed the HUD down over the tea house in the picture, so
every line was measured to keep the HUD no taller than it is during play. The good mask ending keeps "She has stopped
pretending.", because its picture shows her in the room at that very moment.
The other three: "The tea is yours now." after signing, "Your name is in the
book now." at midnight, and "The night has begun again." at the table. The
lines live under `afterEnding` in `js/text.js` — the key was `afterEscape`
while only the roads used it.

Endings with art of their own are listed in `HOST_PORTRAITS` under the ending's
own name, so `portraitState()` shows them with one test (`state.ending in
HOST_PORTRAITS`). The table and midnight keep the host's portrait. That is a
known mismatch at midnight: the text puts you in total darkness while the
picture is her lit portrait, so midnight is the next scene to draw — the dead
candle still smoking, the ledger open with a fresh name on it, her hand
filling your cup in the gloom.

`normal` and `suspicious` are cut from the AI-generated sheets; the two mask
portraits were generated with Gemini from prompts written for these endings, with
`host-normal.jpg` as the reference image. Every source stays in
`img/references/`, which is git-ignored, so none of it reaches the public repo.
Each portrait has its own alt text in all three languages, and an empty string
in `HOST_PORTRAITS` brings back the dashed placeholder box.

> The reference images are other artists' work (several are watermarked). Keep
> them in `img/references/` — that folder is git-ignored so they never end up in
> the public repo.

---

## The visual novel stage

The game screen follows the conventions of the genre it belongs to — *Root
Letter*, *Ace Attorney*, *Root Film*:

- **The portrait is the stage, and the text sits under it.** On wide screens the
  art keeps the illustration's own 4:3, so `cover` crops nothing and every
  detail of the picture survives. On a phone it switches to a fixed 45vh
  instead: there the height is what has to be defended rather than the ratio, so
  the host stays visible above the words on any handset.
- **The scene is never a box you scroll inside, and never covers the art** — one
  rule, every size, no exceptions. Both halves cost something the genre would
  have kept. The reference games float the box over the portrait and scroll the
  text inside it, and the drafts here did the same: first capped at 40% of the
  scene, then uncapped so the whole scene could be read at once — at which point
  a long beat swallowed **87%** of the picture and the stage was a text box with
  a sliver of hair above it. The author chose the illustration. Reading the
  scene in one piece *and* seeing the art whole both beat reaching the choices
  without scrolling, so the page scrolls to the buttons, on phone and desktop
  alike.
- **Landscape** drops the notebook below the stage so it stops stealing width,
  and holds the art to 45vh so the words still start above the fold.
- **The candle and her suspicion are a HUD**, on their own patch of paper in the
  **top left** of the art, so the text keeps its contrast whatever the picture
  does underneath. One rule at every size, and the side is not arbitrary: the
  host sits on the right of all three portraits, and on a real phone a
  right-hand box landed on her face. The bamboo on the left can take it.
  Two earlier attempts are worth remembering — the box was first dropped below
  the picture on phones (the Portuguese and Spanish labels wrap onto two lines,
  and it covered her), then pinned to the right corner with smaller type. Both
  times the fix was the wrong axis: the problem was *which corner*, and overlaid
  the box costs no vertical space, which is what a phone has least of.
- **The clue panel is the detective's notebook**, and carries the Log button.
- **The Log** replays every moment, gathered under one heading per candle mark.
  It uses a native `<dialog>`, which gives Esc to close, keeps focus inside
  while open, and returns focus to the button afterwards — no library.

The log keeps the words **as they were shown**, so anything read before a
language switch stays in the language it was read in. Rebuilding it in the new
language would mean storing keys rather than sentences, which costs more than
it's worth.

**Deliberately not copied:** *Root Letter*'s Max Mode (the meter you must stop
at the right instant) and *Danganronpa*'s moving-target debates. Both are
reflex mechanics, and this game has to be playable with a keyboard alone and
legible to a screen reader. The tension here comes from spending candle and
suspicion, not from timing.

## Accessibility and the non-negotiables

- **Same nav on all 3 pages:** Home · Game · How to Play (`aria-current` marks
  the active page with bold + underline, not colour alone).
- **Phone-playable:** every choice is a button at least 44px tall; no gestures.
- **Keyboard-playable:** choices are real `<button>`s; visible 3px focus ring.
- **Never colour alone:** suspicion is a line of escalating *text* ("She is
  pouring tea" → "She doesn't blink" → "She is watching your hands"). No bar,
  no red. Clues get a ✓ **and** the word "confirmed". The candle's marks are
  drawn as six small candles that change *shape*: a full candle with a flame,
  or a burnt stub with a curl of smoke. They also have a text count, and they
  are pure CSS on the two classes `game.js` sets — no images.

## Languages

The game runs in five languages: **English** (the standard version),
**Português**, **Español**, **Français** and **日本語**.

| File | What's in it |
|------|--------------|
| `js/text.js` | Every word the game says, once per language, in blocks with identical keys |
| `js/game.js` | The rules: the numbers, which hotspot hides which flaw, what a press costs. No sentences |
| `js/i18n.js` | Picks the language, fills every `data-t` element on the three pages, and tells the game to redraw |

**Which language a player gets:** `?lang=` in the address, then the last choice
saved in their browser, then their browser's own language, then English. A
language only counts if `text.js` actually has a block for it.

**The switcher** sits in the header of all three pages (EN · PT · ES · FR · JP — the Japanese link reads JP, but its code stays `ja`,
the language code that `lang`, `hreflang` and screen readers expect; JP is the
country), marks the
current one with bold and underline rather than colour alone, and works as plain
links if JavaScript is off. `<html lang>` follows it, so screen readers use the
right pronunciation, and the address keeps `?lang=`, so a link can be shared in
one language.

**Switching mid-game keeps your progress** — the candle, the clues and her
suspicion stay as they were. The scene restarts the current mark in the new
language.

**The name never translates.** "The Kitsune's Tea House" is the brand: it stays
in English in the header, the page titles and the home page heading, in every
language, matching the repo, the favicon and the live URL. Everything
around it translates, including the ordinary words "tea house" inside a
sentence ("uma casa de chá", "una casa de té", "une maison de thé", "茶屋").

**Where the words come from:** the Portuguese is the author's own, since the
notes for every line were written in Portuguese first; the English is the
approved version of those notes. Spanish, French and Japanese are translations
from both, each waiting for review by a native speaker before it can be called
finished.

- **French** — the traveller and the host say *vous* to each other, and her
  courtesy is part of the mask. French typography is kept: a narrow no-break
  space before `: ; ? !` and inside « », so punctuation never wraps alone.
- **Japanese** — she speaks an *okami*'s keigo, the refined politeness of a
  tea-house proprietress, and the traveller answers in plain polite speech. Her
  label is 女将, she calls the traveller 旅のお方, the ledger is a 宿帳 (an inn's
  guest register), a candle mark is a 刻み, and quotes are 「」. Japanese gets
  more line spacing and strict line breaking (`html:lang(ja) body` in the CSS),
  and the site's two fonts are Japanese typefaces, so every glyph matches.
- The author approved a sample of both — the arrival, the shadow flaw, her
  question and the good mask ending — before the rest was translated.

Adding another language means one more block with the same keys, its code in
`LANGUAGES` in `js/i18n.js`, and a link in each page's menu. `game.js` doesn't
change, and there's still no build step.

## Scope guard

- Plain HTML / CSS / JS. No React, no Vite, no build step — GitHub Pages works
  as-is and every line can be explained in the walkthrough.
- The Figma Make project ("Design System – Assets") stays separate. It is where
  art comes from, not where the game lives.

## Open decisions

- [x] Palette and fonts approved (2026-09-14) — see "Art direction".
- [x] Host illustration — four portraits and two road scenes are in `img/`, and
      the game swaps between them: two during play, one for each version of
      Ending 4, and one for each version of the road (see "The portraits").
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
      - **Every line of in-game text is now rewritten from your own notes**
        (the words live in `js/text.js`): the endings, the mark beats
        (including the nudge, the doors and the ledger offer), her question's
        three answers, the two "she'll remember" lines, her composure lines,
        the flaw dialogue, the hotspot descriptions, the suspicion lines, and
        the two lines as she returns at mark 3.
- [ ] **Review the Spanish.** The Portuguese is yours; the Spanish in
      `js/text.js` is a draft. The weakest part is the button wording
      ("gratis — quedan 2 observaciones").
- [x] The game's name stays in English in every language — see "The name never
      translates" under "Languages".
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
