# Quran Website - Modernized UI & Architecture

## Overview
This is a modern, responsive website for reading the Holy Quran with Arabic text, English translation, and transliteration. The website has been completely redesigned with a professional UI and refactored to use a Single Page Application (SPA) architecture.

## Features

### Content
- Complete Holy Quran with all 114 Surahs
- Arabic text with proper rendering
- English translation (Ali Quli Qarai)
- English transliteration
- Search functionality across all surahs
- Islamic knowledge topics

### Modern UI/UX
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Modern Color Palette**: Islamic-themed greens, golds, and neutral tones
- **Card-Based Layout**: Clean, organized content presentation
- **Smooth Animations**: Elegant transitions and hover effects
- **Improved Typography**: Better readability and hierarchy
- **Accessibility**: Keyboard navigation and screen reader friendly

### Technical Improvements
- **Single Page Application**: No more 114+ separate HTML files
- **Hash-Based Routing**: Clean navigation without page reloads
- **Modular JavaScript**: Well-organized, maintainable code
- **Performance**: Faster loading and navigation
- **Backward Compatible**: Old links redirect to new SPA

## Project Structure

```
/
├── index.html              # Main SPA entry point
├── app.html                # Alternative entry point (same as index.html)
├── quran.html             # Redirects to index.html#quran
├── translator.html        # Redirects to index.html#translator
├── [1-114].html          # Individual surah redirects
├── css/
│   └── style.css          # Modern, responsive stylesheet
├── js/
│   ├── app.js             # SPA router and page controller
│   ├── surah.js           # Surah metadata
│   ├── arabicQuran.js     # Arabic Quran text
│   ├── englishQuran.js    # English translation
│   ├── transliterationQuran.js # English transliteration
│   └── scripts.js         # Legacy search functionality
└── img/
    ├── favicon.png
    ├── apple-touch-icon.png
    └── search.png
```

## Usage

### Running Locally
Simply open `index.html` in any modern web browser, or use a local server:

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

### Navigation
- **Home**: `index.html` or `index.html#home`
- **Surah List**: `index.html#quran`
- **Specific Surah**: `index.html#surah/1` (replace 1 with surah number)
- **Specific Ayat**: `index.html#surah/1/5` (surah 1, ayat 5)
- **Translator Info**: `index.html#translator`

### Backward Compatibility
All old URLs (e.g., `1.html`, `2.html`, etc.) automatically redirect to the new SPA structure.

## Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and CSS Variables
- **Vanilla JavaScript**: No frameworks, pure ES6+
- **Progressive Enhancement**: Works without JavaScript for basic content

## Browser Support
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Credits
- **Quran Text**: [Tanzil.net](http://tanzil.net) (Creative Commons Attribution 3.0)
- **English Translation**: Ali Quli Qarai
- **Original Project**: druvx13

## License
The Quran text is distributed under Creative Commons Attribution 3.0 License.
See [Tanzil.net Terms of Use](http://tanzil.net/docs/terms_of_use) for details.

## Development

### CSS Architecture
The CSS uses:
- CSS Custom Properties (variables) for theming
- Mobile-first responsive design
- BEM-like naming convention for clarity
- Organized by component type

### JavaScript Architecture
The JavaScript follows:
- Module pattern for encapsulation
- Single responsibility principle
- Event-driven architecture
- Clean separation of concerns (Router, PageController, AppController)

## Future Enhancements
- Progressive Web App (PWA) support
- Offline functionality
- Audio recitation
- Bookmark functionality
- Dark mode
- Multiple translation options
- Tafsir (commentary) integration

---

For issues or contributions, please visit the GitHub repository.
