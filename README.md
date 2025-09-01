# The Not Very Useful Gaming Database

A retro-styled web application for searching information about monsters, animals, and items from The Legend of Zelda: Breath of the Wild. Built with vanilla JavaScript and featuring an 8-bit inspired design.

## Features

- **Search functionality**: Look up creatures and items by name or ID
- **Random discovery**: Click "Random" to explore unexpected entries
- **Retro design**: 8-bit styled interface with Press Start 2P font
- **Responsive layout**: Works on desktop and mobile devices
- **Dark mode support**: Automatically adapts to system preferences

## How to Use

1. Enter a monster name, animal, item, or numeric ID in the search field
2. Click "Search" or press Enter to fetch information
3. Use "Random" to discover random entries from the database
4. Click "Clear" to reset the interface

The results display:

- Category (Monster, Animal, or Item)
- Name
- Locations where found
- Loot/drops available
- Description

## Technical Details

- **API**: Uses the [BotW Compendium API](https://botw-compendium.herokuapp.com)
- **Styling**: CSS with custom 8-bit button effects and retro color scheme
- **JavaScript**: Vanilla ES6+ with async/await for API calls
- **Font**: Google Fonts - Press Start 2P

## Project Structure

```
├── index.html          # Main HTML structure
├── script/
│   └── script.js       # Application logic and API calls
├── styles/
│   ├── global.css      # CSS variables and reset
│   ├── style.css       # Main styling and components
│   └── typography.css  # Font definitions
├── README.md
├── LICENSE.md
└── .gitignore
```

## Getting Started

1. Clone the repository
2. Open `index.html` in your web browser
3. Start searching for your favorite Zelda creatures and items!

No build process or dependencies required - just open and use.

## License

MIT License - see [LICENSE.md](LICENSE.md) for details.

---

_A learning project exploring API integration in web environments with a nostalgic gaming twist._
