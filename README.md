# Slime Clicker

A fun idle/clicker game built with **Vue 3** and **Vite**. Click slimes to earn Plorts, upgrade your click power, and purchase auto-clickers to generate income passively.

## Features

- **Click-to-Earn**: Click the slime button to earn Plorts (in-game currency).
- **Upgrades**: Boost your click power by spending Plorts (costs increase exponentially).
- **Auto-Clickers**: Purchase levels of auto-clicker to generate Plorts automatically every second.
- **Visual Feedback**: Animated flying slimes appear when you click, and modals confirm purchases and upgrades.
- **Persistent Progress**: Game state is saved to `localStorage`, so your progress persists across sessions.

## Technology Stack

- **Frontend Framework**: Vue 3
- **Build Tool**: Vite
- **Language**: JavaScript (ES Modules)
- **Styling**: Scoped CSS with custom fonts (Schoolbell)

## Development

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`

### Project Setup

```sh
npm install
```

### Run Development Server

```sh
npm run dev
```

The app will start on `http://localhost:5173` (or a different port if 5173 is in use).

### Build for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)

### Recommended Browser Extensions

- **Chromium-based browsers** (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- **Firefox**:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## Project Structure

```
src/
├── App.vue                 # Main game component
├── main.js                 # Vue app entry point
├── components/
│   ├── Hotbar.vue         # Top navigation with Shop button
│   ├── ShopMini.vue       # Shop interface for upgrades & auto-clickers
│   ├── Modal.vue          # Game modal for notifications
│   └── FlyingSlime.vue    # Animated slime particles
└── assets/
    ├── img.png            # Main slime button image
    ├── Pear.png           # UI asset
    ├── Bobfull.png        # UI asset
    └── dervishslime.png   # UI asset
```

## Gameplay

1. Click the large slime button in the center to earn Plorts.
2. Open the **Shop** (top-right Hotbar button) to:
   - Upgrade click power (multiplies Plorts per click)
   - Purchase auto-clickers (passive income per second)
3. Watch your Plorts grow, with flying slimes animating each click.
4. Your progress is automatically saved in browser localStorage.

## License

This project is part of the Clicker game series.
