

# HaneulRacing Website

## Overview

The **HaneulRacing** website is a dynamic, responsive site that showcases the career, achievements, and community of a semi-professional Porsche Cup racing driver. It features sections highlighting racing accomplishments, a profile, a sim racing career, and an embedded Discord widget for community engagement.

The site combines vibrant visuals and intuitive navigation to provide visitors with an engaging experience.

## Features

- **Interactive Navigation Bar**: Includes animated links for quick access to sections like About, Achievements, Racing Profile, Sim Racing, and Contact.
- **Hero Section**: A visually striking introduction with dynamic background effects and smooth scrolling functionality.
- **Content Sections**:
  - **About**: Overview of the racing career.
  - **Achievements**: Key milestones and statistics.
  - **Racing Profile**: Details about the driver and the current racing season.
  - **Sim Racing**: Information on virtual racing endeavors.
  - **Contact**: Links to join the Discord community and other social media platforms.
- **Theme Toggle**: Switch between light and dark modes with saved preferences.
- **Language Toggle**: Toggle between English (EN) and Korean (KR).
- **Responsive Design**: Optimized for both desktop and mobile views.

## Technologies Used

- **HTML5**: Structure and content of the website.
- **CSS3**: Styling and animations, including custom gradients and hover effects.
- **JavaScript (Vanilla)**: Interactive features like draggable navigation, smooth scrolling, and dynamic updates (e.g., stat counters and theme toggling).
- **External Libraries**:
  - [Font Awesome](https://fontawesome.com): For icons.
  - [Google Fonts](https://fonts.google.com): For the Montserrat font.
- **Discord Embed**: An iframe widget for community engagement.

## How It Works

1. **Navigation**: 
   - The navigation bar is draggable and has hover effects for enhanced usability.
   - Smooth scrolling is enabled for all internal links.
2. **Hero Section**: 
   - Includes dynamic opacity changes based on scroll position for an immersive experience.
3. **Content Animations**:
   - Sections fade in on scroll using Intersection Observers.
   - Statistic counters animate to display values incrementally.
4. **Theme and Language Toggles**:
   - Theme preference (light/dark) and language setting (EN/KR) are saved using `localStorage`.

## Setup and Deployment

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/haneulracing.git
   ```
2. Host the `index.html` on any static web server or platform (e.g., GitHub Pages, Netlify, Vercel).

## Folder Structure

```
/
├── index.html    # Main HTML file
├── logo.png      # Favicon and site logo
├── README.md     # Documentation
```

## License

This project is open-source and available under the [MIT License](LICENSE).


