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

- Claude — concept and game design
- Claude Code — project scaffolding
- Figma Make — art assets (separate project)

## My 3 best prompts

1. _TODO_
2. _TODO_
3. _TODO_

## One thing the AI got wrong, and how I fixed it

_TODO_
