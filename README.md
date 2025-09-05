# Talent Lab Scan

An interactive talent assessment application for Dutch youth, developed in collaboration with Provincie Flevoland and Bibliotheek FlevoMeer.

## Purpose

The Talent Lab Scan helps young people discover their natural talents and strengths through an engaging 12-question assessment. Users receive personalized results identifying their primary talent profile and matching percentages for all four talent categories.

## Features

- **Interactive Assessment**: 12 carefully crafted questions with unique character avatars
- **Four Talent Profiles**:
  - Creatieve verhalenvertellers (Creative Storytellers)
  - Digitale ontwerpers (Digital Designers)
  - Onderzoekende denkers (Research Thinkers)
  - Sociale verbinders (Social Connectors)
- **Character Integration**: Each question features a unique character (Emma, Malik, Sophie, etc.)
- **Auto-advance Navigation**: Questions automatically progress after selection
- **Visual Feedback**: Progress tracking and dynamic result visualization
- **Responsive Design**: Fully responsive for desktop, tablet and mobile devices
- **Multi-page Flow**: Seamless navigation from start to results
- **Progress Saving**: Automatically saves progress in localStorage
- **Accessible Language**: Optimized for 16-year-olds with clear, simple Dutch

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

## Project Structure

```
talent-scan/
├── start.html              # Landing page with branding
├── talent_lab_scan.html    # Main quiz application
├── results.html            # Results display page
├── styles.css              # Main styling file
├── js/                     # JavaScript modules
│   ├── app-integrated.js   # Main quiz logic
│   └── results-integrated.js # Results page logic
├── IMG/                    # Images and logos
│   ├── Provincie-Flevoland.png
│   ├── Flevomeer-logo.png
│   ├── group.png
│   ├── background.jpg
│   ├── [Talent group images]
│   └── characters/        # Character avatars
│       ├── 01- emma.png
│       ├── 02-malik.png
│       └── [...12 characters total]
└── VID/                    # Character videos (optional)
    └── vraag-[01-12].mp4
```

## Usage

1. Start at the landing page (`start.html`)
2. Click "START" to begin the assessment
3. Read each character's introduction
4. Select the answer that best represents you
5. Complete all 12 questions
6. View your personalized talent profile results
7. Option to retake the assessment

## Technical Details

- **Technology**: Pure HTML5, CSS3, JavaScript (ES6+)
- **No Dependencies**: Runs without any external libraries
- **Scoring Algorithm**: Weighted scoring system (1-3 points per answer)
- **Data Flow**: Client-side processing with URL parameter passing
- **State Management**: LocalStorage for progress persistence
- **Security**: Input sanitization and XSS protection
- **Performance**: Optimized images, modular JavaScript, efficient CSS

## Customization

### Modifying Questions
Edit the `questions` array in `talent_lab_scan.html`:
```javascript
{
    text: "Your question text",
    options: [
        { text: "Option 1", scores: {creatief: 3, sociaal: 1} },
        // Add more options
    ]
}
```

### Updating Talent Descriptions
Modify the `talentInfo` object in both `talent_lab_scan.html` and `results.html`

### Styling
Customize appearance in `styles.css` - color schemes are defined for each talent type

## Character Videos

The application includes 12 character introduction videos (Emma, Malik, Sophie, Zara, Jasper, Luna, Noah, Aisha, Lars, Mila, David, Fatima) that guide users through the assessment with personalized scenarios.

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