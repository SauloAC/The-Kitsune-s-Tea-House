# The Kitsune's Tea House

A short mystery where you shelter from the fog in a roadside tea house and have
until the candle burns down to prove your gracious host is a kitsune — then pick
the door that leads home.

**Live game:** [sauloac.github.io/The-Kitsune-s-Tea-House](https://sauloac.github.io/The-Kitsune-s-Tea-House/)
· five languages · installable · plays with the network off · 4.8 MB in total ·
no framework, no build step, no dependencies.

## How to play

- The candle has six marks. Examining something burns one.
- Bringing up something odd is free. Pressing her about it makes her more suspicious.
- A clue is **confirmed** once you've both seen it and pressed her about it.
- At the last mark, choose a door. More clues make the right one easier to spot.

Touch: tap a choice. Keyboard: <kbd>Tab</kbd> to move, <kbd>Enter</kbd> to choose.

## Languages

Playable in **English** (standard), **Português**, **Español**, **Français** and
**日本語**. Use the EN · PT · ES · FR · JP switcher in the header, or open a link
in one language directly:

- [English](https://sauloac.github.io/The-Kitsune-s-Tea-House/?lang=en)
- [Português](https://sauloac.github.io/The-Kitsune-s-Tea-House/?lang=pt)
- [Español](https://sauloac.github.io/The-Kitsune-s-Tea-House/?lang=es) — translation, awaiting native review
- [Français](https://sauloac.github.io/The-Kitsune-s-Tea-House/?lang=fr) — translation, awaiting native review
- [日本語](https://sauloac.github.io/The-Kitsune-s-Tea-House/?lang=ja) — translation, played through by two native speakers in October 2026, who reported nothing wrong

Your choice is remembered, and switching mid-game keeps the candle, the clues
and her suspicion. Every word lives in `js/text.js`, one block per language with
the same keys, so a new language needs no change to the game's code (see "How
the files fit together").

## Decided by measuring, not by taste

Every design argument in this project was settled the same way: build it, then
measure it in the running game — on a 375 × 812 phone and a 1440 × 900 laptop,
in all five languages. These are the six that changed the game most. Each one
has the number before and the number after, because that is the only part of a
design claim anyone can check.

### The choice nobody could see

On a phone the first choice button began at **996px** on an 812px screen: every
turn opened with a scroll to find out what could be done. The cheapest fix
would have been to crop the illustration. Measuring said otherwise — the
picture was being blown up to fill a fixed 45vh slice and **a third of its
width was being thrown away**. Giving it back its own 4:3 ratio made it 120px
shorter *and* showed the whole frame.

| | Before | After |
|---|---|---|
| First choice begins at | 996px, 184 below the fold | **764px, 48 above it** |
| Scroll to reach it | 253px | **21px** |
| Of the illustration visible | 67% | **100%** |
| On a 1440 × 900 laptop | cut in half by the bottom edge | whole |

### The colour that passed by 0.09

Every pair in the palette was measured against the surface it actually sits on.
Nine passed. One passed by a margin that would not survive the next tweak —
`--tea`, the caption colour, at **4.59:1** against the 4.5 required. Darkening
it to `#7a5233` makes it **5.61:1** and looks the same. Writing the privacy page
then caught a worse one: its footer link inherited the lacquer link colour,
which on the night background is **2.14:1** — the exact pair the palette already
marked *paper only*. Footer links now take the footer's own mist, **7.2:1**.

### The defect that wasn't there

The same sweep reported the cover title at **1.01:1**, which would have been the
worst number in the project. It was wrong: no CSS calculation can see an
illustration behind text. Reading the artwork's own pixels gave **13.21:1** —
sumi ink on a cream cartouche. The lesson is in the method, not the colour:
measure where the thing happens, and check the measurement before acting on it.

### 27 MB of music, and two bugs in the fades

Six tracks arrived at 256 kbps stereo — **27 MB**. Each is now a 75-second loop
at 64 kbps mono, cut past the intro with the four seconds after the loop mixed
back over its opening so the repeat has no seam, and levelled to the same
measured mean with at least 1.4 dB of headroom: **3.4 MB**, nothing clipping.
Testing the crossfades found two faults that no amount of listening on a desk
would have found:

- the fades ran on `requestAnimationFrame`, **which stops while the page is out
  of sight** — a fade caught by that never finished, leaving music stuck at
  silence or a track that never stopped;
- two choices in quick succession left the old loop playing under the new one,
  because `play()` settles a moment after it is called and its callback faded
  the track back up when the scene had already moved on.

### The bug that only appears with the server off

The game installs and plays offline. The first version cached only the pages and
the code, and kept the pictures as the night reached them — which is cheap on
data and useless for a game you installed to play on a plane. Stopping the dev
server and actually playing found two more:

- `caches.match` **does not ignore the query string**, and the language switcher
  writes `?lang=` into the address. Offline, `game.html?lang=pt` — what every
  shared link looks like — missed the copy of `game.html` and fell through to
  the home page.
- the worker was caching its own script, which the browser never reads from
  there; it only made `sw.js` look unchanged when read back, and it fooled one
  of my own checks.

### The opening, in three temperatures

The game used to begin at the door, which asked the player to feel something
about a road they had never walked. Two screens come first now, and the pictures
warm up one step at a time. Counting pixels notably redder than they are blue,
read off the canvas as the game paints it:

| Screen | Warm pixels |
|---|---|
| The fog | **0** of 2451 |
| The lantern at a distance | **71** of 2451 |
| Her room, at the door | **2003** of 2451 |

That is why the first screen has no moon and nothing on the horizon: so the
lantern on the second is the first warm thing in the game.

## How the files fit together

```
js/text.js ──TEXT──▶ js/i18n.js ──words() / t()──▶ js/game.js
(the words)          (which language)              (rules + state)
                          │                             │
                          ▼                             ▼
                 fills data-t in the HTML      show() draws the scene
```

One rule holds the project together: **each file knows one thing, and none of
them knows another's job.** It is checkable, not a slogan —

- sentences of the game inside `js/game.js`: **none** (the only one that greps
  is inside a comment);
- names of `.mp3` files inside `js/game.js`: **none** — it says which moment the
  night is in, and `js/audio.js` decides what that sounds like;
- game rules inside `js/text.js`: **none** — three one-line helpers mark who is
  speaking, and nothing else.

The detail:

- **All four pages share `css/style.css`**: the design tokens at the top, then
  one numbered section per part of the site.
- **The scripts load with `defer`, in order.** Every page loads `text.js`, then
  `i18n.js`, then `pwa.js`; the game page adds `game.js` last. `defer` runs them
  after the HTML is read, in the order they're written — `i18n.js` needs `TEXT`
  from `text.js`, and `game.js` needs `words()` and `t()` from `i18n.js`.
- **They share one global scope**, so there's no `import`, no `export` and no
  build step.
- **`js/text.js` holds the words** — every line in five languages, with the same
  keys in each. At 137 KB it is by far the biggest file; the rules in
  `game.js` are 21 KB. A game that is mostly words should have a file that is
  mostly words.
- **`js/i18n.js` picks the language** (the `?lang=` in the address, then the
  last choice saved in the browser, then the browser's own language, then
  English). It fills every `data-t`, `data-t-html` and `data-t-label`, sets
  `<html lang>` and the page title, and tells `game.js` when the language
  changes.
- **`js/game.js` holds the rules and the state.** All game data lives in one
  `state` object. Each choice changes `state`, then `show()` redraws the scene,
  fetching every sentence through `words()` and `t()` at that moment. `ask()` is
  the clearest example: `state.clues.push(id)` is a rule, `topic.press` is a
  line of text.
- **`js/audio.js` owns the sound.** `game.js` gained one line — the moment the
  night is in — and nothing else; which loop that means, when it crossfades and
  how the control in the header behaves are all decided in the audio file.
- **`sw.js` owns the offline copy** and knows nothing about the game: only which
  files to keep and when.
- **Why it pays off:** switching language in the middle of a game keeps the
  candle, the clues and her suspicion. Only the words are redrawn. Adding music
  touched one line of the rules. Adding a fifth language touched none of them.
- **Adding a language:** a new block in `TEXT` with the same keys, its code in
  `LANGUAGES` in `js/i18n.js`, and a link in each page's menu. `game.js`
  doesn't change.

## Project structure

```
index.html      Home / Start
game.html       The game screen
how-to.html     How to Play
privacy.html    Privacy policy, in the five languages
css/style.css   Shared styles and design tokens
js/text.js      Every word the game says, in five languages
js/i18n.js      Picks the language and fills the pages
js/game.js      The rules: game state and logic, no sentences
js/audio.js     The music: which loop plays, and the control in the header
js/pwa.js       Asks the browser for the service worker
sw.js           The service worker: the offline copy
manifest.json   Name, icons and colours for an installed copy
img/            Game art and the app icons
audio/          The six music loops
DESIGN.md       Design page: pitch, loop, wireframes, art direction, decisions
```

`DESIGN.md` is the long version of this README: every decision above, the ones
that were reversed, and why.

## Install it, and play with no network

The game is a Progressive Web App: open it once and your phone can keep it on
the home screen, where it opens full screen and plays with the network off.
There is nothing to download from a store and nothing to sign.

- **Android / Chrome:** the browser offers *Install app*, or use the menu's
  *Add to Home screen*.
- **iPhone / Safari:** Share, then *Add to Home Screen*.

What is kept for offline play: the four pages, the stylesheet, the scripts and
**every illustration** up front — 1.1 MB, the whole night — then the six music
loops quietly afterwards, unless your browser says the connection is metered.
The typefaces are kept as they are used. A new version replaces the lot the
next time you open it online.

## Music

Six loops, one for each moment: the house, the table, her suspicion, and the
three ways the night can end — you walk out, you set her free, or the house
keeps you. The music **starts as soon as you touch the page**; the button in
the header turns it off, and the slider beside it sets the volume. Both are
remembered on your device.

All six come from [Pixabay](https://pixabay.com/service/license-summary/),
whose licence allows use without attribution — commercial use included, with
only the resale of the audio on its own ruled out. Credited anyway:

| Moment | Track | By |
|---|---|---|
| The house | [Moonlight on Still Water](https://pixabay.com/music/world-moonlight-on-still-water-full-version-1-369404/) | kaazoom |
| The table | [Dark Tension Atmosphere](https://pixabay.com/music/ambient-dark-tension-atmosphere-516336/) | Universfield |
| She is suspicious | [Dark Ambient](https://pixabay.com/music/suspense-dark-ambient-509934/) | The_Mountain |
| You left | [The Rising Sun](https://pixabay.com/music/china-the-rising-sun-full-version-japanese-style-music-470323/) | kaazoom |
| You set her free | [In Peaceful Gardens](https://pixabay.com/music/world-in-peaceful-gardens-japanese-style-cinematic-music-435966/) | kaazoom |
| The house kept you | [Dark Drone Ambient](https://pixabay.com/music/mystery-dark-drone-ambient-312347/) | Liecio |

## Credits and licences

- **Music:** the six loops above, from Pixabay, cut and levelled with FFmpeg.
  The full-length originals are not in this repository.
- **Illustrations:** generated with Gemini from prompts written for each scene,
  then cropped and resized for the game (see "The portraits" in `DESIGN.md`).
  Reference images stay out of the repository.
- **Typefaces:** [Shippori Mincho](https://fonts.google.com/specimen/Shippori+Mincho)
  and [Zen Kaku Gothic New](https://fonts.google.com/specimen/Zen+Kaku+Gothic+New),
  both under the SIL Open Font License, loaded from Google Fonts.
- **Code:** written for this project, no framework and no dependencies.

## Privacy

The game has no account, no server of its own and no analytics. Three things are
kept by your browser and never leave the device: the language you chose, whether
the music is on and at what volume, and which loop was playing. The one
third-party request in the whole game is Google Fonts, which is disclosed.

[The full policy](privacy.html) is on the site, in all five languages — the page
a store listing can point at.

## My 3 best prompts

1. **"Here are my notes in Portuguese — Feeling / One image / A line."**
   For every ending, every candle mark and every clue, I wrote three short
   notes in Portuguese instead of asking for text. The AI translated and shaped
   them, then showed me each one for approval before it went into the game.
   That's why every line a player reads is mine, and why the Portuguese version
   isn't a translation — it's the original.

2. **"I got this structure from Gemini. What do you think about it?"**
   I pasted a whole dialogue tree from another AI and asked for a critique
   instead of an implementation. It found that Gemini's version had dropped my
   two-resource design: pressing the host cost nothing, so the best move was
   always to click everything and then pick the longest answer.

3. **"Make examining free during mark 3."**
   A rules-first prompt, not a text one. Working out what that meant exposed
   two design holes: with only three hotspots the candle never forced a choice,
   and one of my five endings could never happen at all.

## One thing the AI got wrong, and how I fixed it

One of my five endings was impossible to reach.

The plan said that if you accuse the host with fewer than three clues, she
unmasks and keeps you. But the AI had built the rules so that pressing her only
ever happened after you'd seen a flaw, and every press confirmed a clue.
Suspicion and clues always rose together, so by the time she stopped pretending
you always had all three — and the bad version never ran.

I fixed it by making the ledger a trap. It's the most frightening thing in the
room, but it isn't proof of what she is: pressing her about it costs suspicion
and confirms nothing. Now a player with two clues who accuses her about the
ledger loses a game they were winning. You can see it in `ask()` in
`js/game.js` — the ledger is the one topic that never gets added to `clues`.

## What is still unfinished

Stated here because a portfolio that only lists wins is not evidence of
judgement:

- **Spanish and French have never been read by a native speaker.** The Japanese
  has been played by two; the other two are translations, and the README says so
  rather than hoping nobody checks.
- **Nobody outside the project has played it yet.** The design is measured, not
  playtested: every number above is about the screen, not about whether the
  mystery is fair.
- **The HUD takes 36% of the illustration** on a phone, down from 46%, and that
  is as far as shortening the label could take it. Going further means changing
  what the player reads to judge her, which is a story decision, not a layout
  one.

## Tools used

- Claude — concept, game design and code
- Claude Code — building, measuring and deploying the game from the project folder
- Gemini — a first draft of the dialogue tree, the host illustrations, and the home page cover
- Figma Make — early art experiments (separate project)
- FFmpeg — cutting the six music loops and levelling them
