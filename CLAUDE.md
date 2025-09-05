# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive talent assessment web application for Dutch youth. It uses vanilla JavaScript with no framework dependencies. The app helps users identify their talents through a 12-question quiz with video introductions.

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
- **talent_lab_scan.html**: Contains all quiz logic, questions array, scoring algorithm
- **results.html**: Displays results from URL parameters, independent result rendering
- **styles.css**: All styling including talent-specific color schemes

### Data Flow
1. Questions answered in `talent_lab_scan.html` 
2. Scores calculated client-side
3. Results passed via URL parameters to `results.html`
4. No server-side processing or database required

### Talent Scoring System
- Each answer awards 1-3 points to talent categories
- Four categories: creatief, digitaal, onderzoekend, sociaal
- Maximum 36 points per category
- Results shown as percentages

## Important Considerations

### Language
All content is in Dutch - maintain Dutch language for user-facing text.

### Video Integration
Videos in VID/ folder are referenced but optional. App works without them.

### Responsive Design
Mobile-first approach with breakpoints at 768px.

### Browser Compatibility
Uses modern JavaScript (ES6+). Test in Chrome, Firefox, Safari, Edge.