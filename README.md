# Talent Lab Scan

An interactive talent assessment application for Dutch youth, developed in collaboration with Provincie Flevoland and Bibliotheek FlevoMeer.

## 🎯 Purpose

The Talent Lab Scan helps young people discover their natural talents and strengths through an engaging 12-question assessment. Users receive personalized results identifying their primary talent profile and discover activities, workshops, and resources available at FlevoMeer libraries.

## ✨ Features

- **Interactive Assessment**: 12 engaging questions with smooth transitions
- **Four Talent Profiles**:
  - 🎨 Creatieve verhalenvertellers (Creative Storytellers)
  - 💻 Digitale ontwerpers (Digital Designers)
  - 🔍 Onderzoekende denkers (Research Thinkers)
  - 🤝 Sociale verbinders (Social Connectors)
- **Personalized Activity Pages**: Each talent gets a custom page with:
  - Workshops and courses (LEER)
  - Questions to ask librarians (VRAAG)
  - Community events (ONTMOET)
  - Book recommendations with covers (LEES)
  - Hands-on activities at BiblioLab (DOE)
- **Firebase Integration**: Real-time statistics dashboard
- **Smooth Animations**: Fade transitions between questions
- **Responsive Design**: Optimized for desktop, tablet and mobile
- **Progress Saving**: Automatically saves progress in localStorage
- **Visual Identity**: Talent-specific colors and imagery

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server or local development server

### Installation

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/talent-scan.git
cd talent-scan
```

2. Open with a local web server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Or use Live Server extension in VS Code
```

3. Navigate to `http://localhost:8000/start.html`

## 📁 Project Structure

```
talent-scan/
├── start.html              # Landing page with branding
├── talent_lab_scan.html    # Main quiz application
├── dashboard.html          # Statistics dashboard
├── creatief.html           # Creative talent activities page
├── digitaal.html           # Digital talent activities page  
├── onderzoekend.html       # Research talent activities page
├── sociaal.html            # Social talent activities page
├── styles.css              # Main styling with talent themes
├── js/                     # JavaScript modules
│   ├── app-integrated.js   # Quiz logic & Firebase saving
│   ├── dashboard.js        # Statistics visualization
│   └── firebase-config.js  # Firebase configuration
├── IMG/                    # Images and assets
│   ├── Provincie-Flevoland.png
│   ├── Flevomeer-logo.png
│   ├── group.png
│   ├── [Talent group images]
│   ├── books/              # Book cover images
│   │   ├── creatief/       # 4 book covers per talent
│   │   ├── digitaal/
│   │   ├── onderzoekend/
│   │   └── sociaal/
│   └── characters/         # Character avatars (10 total)
└── .gitignore              # Excludes dev/debug files
```

## 🚀 Usage

1. Start at the landing page (`start.html`)
2. Click "START" to begin the assessment
3. Read each situation and question
4. Select the answer that best represents you
5. Complete all 12 questions
6. View your personalized talent profile
7. Click "ONTDEK WAT ER TE DOEN IS" to explore activities
8. Browse workshops, books, and activities for your talent
9. Visit the dashboard to see aggregated statistics

## 🛠 Technical Details

- **Technology**: HTML5, CSS3, JavaScript (ES6+), Firebase
- **Database**: Firebase Firestore for statistics
- **Scoring Algorithm**: Weighted scoring system (0-3 points per answer)
- **State Management**: LocalStorage for progress, Firebase for statistics
- **Responsive Breakpoints**: 
  - Desktop: >1024px (4-column book grid)
  - Tablet: 768-1024px (3-column book grid)
  - Mobile: <768px (2-column book grid)
  - Small phones: <375px (1-column book grid)
- **Performance**: Optimized images, lazy loading potential, efficient CSS

## Customization

### Modifying Questions
Edit the `questions` array in `js/app-integrated.js`:
```javascript
{
    situation: "Situation description",
    context: "Additional context",  
    question: "The actual question",
    options: [
        { text: "Option 1", scores: {creatief: 3, sociaal: 1} },
        // Add more options
    ]
}
```

### Talent Colors
- Creatief: `#7b1fa2` (Purple)
- Digitaal: `#00695c` (Teal)
- Onderzoekend: `#0288d1` (Blue)
- Sociaal: `#d81b60` (Pink)

## 📊 Dashboard

Access `/dashboard.html` to view:
- Total number of completed scans
- Distribution across talent types
- Visual bar chart of results
- Real-time updates via Firebase

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is developed for educational purposes by Provincie Flevoland, Bibliotheek FlevoMeer and NBD Biblion.

## Credits

- **Development**: TechLeesLab
- **Partners**: Provincie Flevoland, Bibliotheek FlevoMeer, NBD Biblion
- **Target Audience**: Dutch youth and educational institutions

## Contact

For questions or support, please contact the development team through the repository issues.

---

*Helping young people discover their talents through interactive technology*