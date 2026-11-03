# HYDRPG

A browser RPG inspired by Hyderabad and Secunderabad. Built with plain HTML, CSS, and JavaScript; no install, build step, or game server is needed.

## Play

**Play online:** https://vinuthan01.github.io/hydrpg/

Open `index.html` locally in a modern browser, or use the public link above after GitHub Pages finishes publishing.

## Controls

| Input | Action |
|---|---|
| W A S D / arrow keys | Walk (hold Shift to run) |
| Space / F | Talk, read, open, or swim while facing water |
| E | Open the bag |
| C / J / M / G | Character / Journal / Map / Guide |
| Q | Drink chai to heal |
| N | Toggle music |
| Esc | Open the menu |
| 1-6 | Battle actions |

On phones and tablets, use the on-screen joystick and buttons. Landscape orientation gives the game more room.

## Saves and online features

Player profiles and saves are stored only in the current browser's local storage. They do not sync between devices. The password is hashed, but this static game does not provide server-grade account security. `js/net.js` is currently a multiplayer networking stub; online multiplayer, shared accounts, and leaderboards are not enabled.

## Project status

The game is playable as a solo adventure. Medchal is currently marked as “coming soon” in-game and is not built yet.

## Credits and licenses

The included Caveat, Pacifico, Rozha One, and Teko fonts are under SIL Open Font License 1.1; their license texts are in `licenses/`. Music and sound effects are generated in the browser with Web Audio.

Game code is licensed under the MIT License. See [`LICENSE`](LICENSE). Developer: **vinuthan01**.

## GitHub Pages

This repository is configured to publish from the `main` branch root. For a fork, open **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/(root)`, and save.
