# The Kitsune's Tea House

A short mystery where you shelter from the fog in a roadside tea house and have
until the candle burns down to prove your gracious host is a kitsune — then pick
the door that leads home.

**Live game:** [sauloac.github.io/The-Kitsune-s-Tea-House](https://sauloac.github.io/The-Kitsune-s-Tea-House/)

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
- [日本語](https://sauloac.github.io/The-Kitsune-s-Tea-House/?lang=ja) — translation, awaiting native review

Your choice is remembered, and switching mid-game keeps the candle, the clues
and her suspicion. Every word lives in `js/text.js`, one block per language with
the same keys, so a new language needs no change to the game's code (see "How
the files fit together").

## Project structure

```
index.html      Home / Start
game.html       The game screen
how-to.html     How to Play
css/style.css   Shared styles and design tokens
js/text.js      Every word the game says, in English, Portuguese and Spanish
js/game.js      The rules: game state and logic, no sentences
js/i18n.js      Picks the language and fills the pages
img/            Game art
js/audio.js     The music: which loop plays, and the control in the header
audio/          The five music loops
DESIGN.md       Design page: pitch, loop, wireframes, art direction
```

## How the files fit together

```
js/text.js ──TEXT──▶ js/i18n.js ──words() / t()──▶ js/game.js
(the words)          (which language)              (rules + state)
                          │                             │
                          ▼                             ▼
                 fills data-t in the HTML      show() draws the scene
```

- **All three pages share `css/style.css`**: the design tokens at the top, then
  one numbered section per part of the site.
- **The scripts load with `defer`, in order.** Home and How to Play load
  `text.js` then `i18n.js`; the game page adds `game.js` last. `defer` runs them
  after the HTML is read, in the order they're written — `i18n.js` needs `TEXT`
  from `text.js`, and `game.js` needs `words()` and `t()` from `i18n.js`.
- **They share one global scope**, so there's no `import`, no `export` and no
  build step.
- **`js/text.js` holds the words** — every line in English, Portuguese and
  Spanish, with the same keys in each. At 48 KB it's the biggest file; the rules
  in `game.js` are 17 KB.
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
- **Why it pays off:** switching language in the middle of a game keeps the
  candle, the clues and her suspicion. Only the words are redrawn.
- **Adding a language:** a new block in `TEXT` with the same keys, its code in
  `LANGUAGES` in `js/i18n.js`, and a link in each page's menu. `game.js`
  doesn't change.

## Music

Six loops, one for each moment: the house, the table, her suspicion, and the
three ways the night can end — you walk out, you set her free, or the house
keeps you. The music **starts as soon as you touch the page**; the button in
the header turns it off, and the slider beside it sets the volume. Both are
remembered on your device.

All five come from [Pixabay](https://pixabay.com/service/license-summary/),
whose licence allows use without attribution. Credited anyway:

| Moment | Track | By |
|---|---|---|
| The house | [Moonlight on Still Water](https://pixabay.com/music/world-moonlight-on-still-water-full-version-1-369404/) | kaazoom |
| The table | [Dark Tension Atmosphere](https://pixabay.com/music/ambient-dark-tension-atmosphere-516336/) | Universfield |
| She is suspicious | [Dark Ambient](https://pixabay.com/music/suspense-dark-ambient-509934/) | The_Mountain |
| You left | [The Rising Sun](https://pixabay.com/music/china-the-rising-sun-full-version-japanese-style-music-470323/) | kaazoom |
| You set her free | [In Peaceful Gardens](https://pixabay.com/music/world-in-peaceful-gardens-japanese-style-cinematic-music-435966/) | kaazoom |
| The house kept you | [Dark Drone Ambient](https://pixabay.com/music/mystery-dark-drone-ambient-312347/) | Liecio |

## Tools used

- Claude — concept, game design and code
- Claude Code — building and deploying the game from the project folder
- Gemini — a first draft of the dialogue tree, the host illustrations, and the home page cover
- Figma Make — early art experiments (separate project)
- FFmpeg — cutting the five music loops and levelling them

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
