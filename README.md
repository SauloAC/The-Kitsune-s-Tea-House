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

Playable in **English** (standard), **Português** and **Español**. Use the
EN · PT · ES switcher in the header, or open a link in one language directly:

- [English](https://sauloac.github.io/The-Kitsune-s-Tea-House/?lang=en)
- [Português](https://sauloac.github.io/The-Kitsune-s-Tea-House/?lang=pt)
- [Español](https://sauloac.github.io/The-Kitsune-s-Tea-House/?lang=es)

Your choice is remembered, and switching mid-game keeps the candle, the clues
and her suspicion. Every word lives in `js/text.js`, one block per language with
the same keys, so a new language is a new block and no code changes.

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
DESIGN.md       Design page: pitch, loop, wireframes, art direction
```

## Tools used

- Claude — concept, game design and code
- Claude Code — building and deploying the game from the project folder
- Gemini — a first draft of the dialogue tree, the host illustrations, and the home page cover
- Figma Make — early art experiments (separate project)

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
