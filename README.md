# TTS-pro

Text-to-Speech Pro
A simple, interactive web application that converts user-input words into speech with customizable gap time, accent, pitch, and speed. Built with HTML, Tailwind CSS, and JavaScript, it features a responsive design, particle background, and intuitive controls for a great user experience across mobile, tablet, and desktop.
Features

Input Words: Enter words (one per line) in a textarea, supporting 100–1000+ words.
Customizable Settings:
Gap time between words (1–60 seconds).
Accent selection (US, UK, Australian, Indian English).
Voice pitch (0.5–2) and speed (0.5–2) adjustments.


Controls: Play, pause, save words to local storage, and a placeholder download audio button.
Interactive UI:
Particle background animation.
Glowing, animated buttons with hover effects.
Progress bar and current word display.
Responsive design with Tailwind CSS.


Performance: Lightweight, using the Web Speech API for fast speech synthesis.

Installation

Clone or download this repository.
Place index.html, style.css, and script.js in the same directory.
Open index.html in a modern browser (Chrome, Edge, Firefox, Safari).

Hosting
Deploy for free on platforms like GitHub Pages, Netlify, or Vercel:

GitHub Pages:
Create a GitHub repository.
Upload index.html, style.css, and script.js.
Enable GitHub Pages in the repository settings (use the main branch).
Access the app at https://github.com/yash-raj202134/TTS-pro.


Netlify/Vercel:
Drag and drop the files or connect the repository.
Deploy using the platform’s free tier.



Usage

Enter words (one per line) in the textarea.
Adjust gap time, accent, pitch, and speed.
Click "Play" to start speech, "Pause" to stop, or "Save" to store words locally.
Monitor progress via the progress bar and current word display.
Note: Audio download is a placeholder due to Web Speech API limitations.

Limitations

The Web Speech API does not support direct audio export in browsers. For audio downloads, consider a desktop solution (e.g., Python with gTTS).
Requires a modern browser with Web Speech API support.

License
TTS Pro 2025 All Rights Reserved.
Credits
Built with ❤️, powered by the Web Speech API and Tailwind CSS.
