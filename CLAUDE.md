# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive talent assessment web application for Dutch youth. It uses vanilla JavaScript with no framework dependencies. The app helps users identify their talents through a 12-question quiz with character avatars. Each question is introduced by a unique character, creating a more engaging experience.

## Common Development Tasks

### Running the Application
```bash
# Python server
python -m http.server 8000

# Node.js server  
npx http-server

# Then navigate to http://localhost:8000/start.html
```

### Testing Flow
1. Start from `start.html` (landing page)
2. Progress through `talent_lab_scan.html` (quiz)
3. End at `results.html` (results display with URL parameters)

## Code Architecture

### Key Files and Their Roles
- **start.html**: Entry point with branding, links to main quiz
- **talent_lab_scan.html**: HTML structure for quiz, character image container
- **js/app-integrated.js**: Main quiz logic, scoring, progress saving, character management
- **js/results-integrated.js**: Results display logic with input validation
- **results.html**: Displays results from URL parameters
- **styles.css**: All styling including talent-specific color schemes

### Data Flow
1. Questions answered in `talent_lab_scan.html` using `app-integrated.js`
2. Auto-advance after selection (800ms delay)
3. Progress saved to localStorage automatically
4. Scores calculated client-side
5. Results passed via URL parameters to `results.html`
6. No server-side processing or database required

### Talent Scoring System
- Each answer awards 1-3 points to talent categories
- Four categories: creatief, digitaal, onderzoekend, sociaal
- Maximum 36 points per category
- Results shown as percentages

## Important Considerations

### Language
- All content is in Dutch - maintain Dutch language for user-facing text
- Language optimized for 16-year-olds (simple, clear, no complex words)
- Avoid words like "conflict" → use "ruzie", "complexe" → use "moeilijke"

### Character Integration
- 12 character images in IMG/characters/ folder
- Named pattern: "01- emma.png", "02-malik.png" etc.
- Characters display above intro text on each question

### Features
- Auto-advance after option selection (800ms delay)
- Progress saving to localStorage
- Resume capability for incomplete quizzes

### Responsive Design
- Mobile-first approach with breakpoints at 768px
- Character images scale: 90% width, max 700px

### Browser Compatibility
Uses modern JavaScript (ES6+). Test in Chrome, Firefox, Safari, Edge.