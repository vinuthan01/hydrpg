# HYDRPG

**[PLAY HYDRPG ONLINE](https://vinuthan01.github.io/hydrpg/)**

A browser RPG inspired by Hyderabad, Secunderabad and Hitech City. Built with plain HTML, CSS, and JavaScript; no install, build step, or game server is needed. It works on desktop and phones.

## Play

Open the link above, or open `index.html` locally in a modern browser. On a phone, tap **Play full screen** on the login page for a more immersive view.

## Features

**World**
- Three cities to play: Hyderabad, Secunderabad and Hitech City. After you beat Bade Bhai in Hyderabad, you choose which of the other two to take on first. Ameerpet is coming soon.
- A tunnel connects Hitech City and Secunderabad without going through Hyderabad.
- A full day and night cycle (about 30 minutes of day and 30 minutes of night) with morning, afternoon, evening, sunset and night looks. Streetlights come on at night, some shops close, and Scrapers and Tech-Mads only appear at night.
- Monsoon rain with puddles, thunder and better fishing.
- Many kinds of trees, flowers, animated interiors, and multi-floor towers with lifts.
- Traffic with autos, cabs, cars, bikes and scooties. Autos and cabs give rides to any explored spot. Vehicles and trains can hurt you.
- You can walk through townspeople and animals; they step aside.

**Fights**
- Turn-based fights where each weapon has POW, SHARP and HEAVY moves. Each enemy has a weakness and a resistance.
- Enemy difficulty follows your level and the order in which you take the cities.
- Boss stars appear in your stats when you defeat a boss.
- Bosses: Bade Bhai, Tiger Anna and RIG Ritesh.

**Items and style**
- Weapons with simple funny names, food and fish with their own icons, and many wearables: hats, capes, pants, tops, shoes and face items.
- Four fishing rods, each different, and fish that can heal, poison, slow or blind you.
- Vehicles to buy: cycle, scooty, bike, auto, tractor and car.
- Shops show a preview icon and a try-on of clothes before you buy.

**Pets**
- Pet cats and dogs, give them a fish and they follow you, and you can let them go again.

**Play and progress**
- Side quests, secrets and a story twist, plus achievements.
- A casino-style arcade: bet money on cricket, football or bowling, win more if you play well and lose the bet if you lose.
- A hint system, an optional mission arrow, and autosave.
- Round minimap: click it to open the full map.
- Menu has text size, minimap and mission arrow switches, and a backup and restore code for your save.

## Controls

| Key | Action |
| --- | --- |
| W A S D or arrows | Walk |
| Shift | Run |
| Space or F | Talk, open, fish, pet |
| E | Bag (hover to read, double-click to use, drag to reorder) |
| C | Player stats and achievements |
| J | Journal |
| M | Map |
| H | Buy a hint |
| T | Turn the mission arrow on or off |
| V | Ride or get off a vehicle |
| G | Guide |
| Esc | Menu |

On a phone: joystick, **A** to talk, **Run**, **Hint**, **Ride** and **Full** buttons. Every screen can be moved by its top bar and resized from its corners.

## Saves and updates

Saves live in each player's own browser (`localStorage`), not in this repo. Updating the repo does **not** erase them as long as the game stays at the same web address and the save keys in `js/core.js` are not renamed. New updates only add missing fields. Players lose data only if they clear browser data, switch browser or device, or the repo name or domain changes. Use **Menu > Backup / Restore** to copy a backup code.

## Credits

Developer: **vinuthan01**

Fonts are bundled under their original open licenses (see the `licenses` folder). This project is released under the MIT License.

