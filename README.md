<div align="center">
  <h1>FrançAce 🇫🇷🍁</h1>
  <p><strong>Ace your French. Unlock Canada.</strong></p>
  <p>A comprehensive, interactive, and beautifully designed TEF/TCF exam preparation application built with React and Next.js.</p>

  [![Deployment Status](https://img.shields.io/badge/Deployment-Live-success?style=for-the-badge&logo=github)](https://shreyas1214.github.io/francace/)
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
</div>

<br />

## 🌟 Overview

**FrançAce** is a fully functional web application engineered specifically for individuals preparing for the **TEF Canada** and **TCF Canada** immigration proficiency exams. 

It replicates the official testing formats and provides comprehensive, interactive learning pathways to master all four sections of the exam (Compréhension Orale, Compréhension Écrite, Expression Orale, and Expression Écrite) to help test-takers achieve their target **NCLC/CLB levels** required for Canadian immigration (IRCC).

## ✨ Key Features & Modules

FrançAce is split into **9 comprehensive learning modules**:

- 🎓 **Dashboard**: Tracks your streak, time studied, completed lessons, and dynamically estimates your CLB level based on performance.
- 🔤 **Alphabet & Phonics**: An interactive A-Z grid focusing on standard sounds and accented characters. Built-in Text-To-Speech (TTS).
- 📚 **Vocabulary Builder**: Categorized flashcards (A1 to C2) covering daily life, work, society, and advanced debate vocabulary. Features a 3D flip animation.
- 📝 **Grammar Lessons**: Structured lessons explaining fundamental rules (gender traps, false friends, prepositions) combined with interactive quizzes.
- 🗣️ **AI Conversation Partner**: A fully interactive, branched-dialogue AI simulation! Practice real-life scenarios (e.g., ordering food, arguing with a landlord) and receive scoring based on politeness, vocabulary, and structure.
- 🎧 **Listening (Compréhension Orale)**: Audio clips parsed through native Web Speech API with adjustable speeds. Listen and answer multiple-choice questions.
- 📖 **Reading (Compréhension Écrite)**: Passages mimicking TEF/TCF reading materials. Click on any word to hear its pronunciation.
- ✍️ **Writing (Expression Écrite)**: A digital scratchpad equipped with writing prompts, word counters, pre-built phrase banks, and model answers. Includes a checklist for tone and structure.
- 🎯 **Full Mock Exam**: A strict, timed simulation of the actual exams (TEF or TCF). Locks answers under pressure and produces a final estimated CLB score upon completion.

## 🛠️ Architecture & Tech Stack

FrançAce was recently rebuilt from the ground up to achieve modern performance standards:

*   **Framework:** Next.js 15 (App Router).
*   **Library:** React 19 (Hooks, Context API).
*   **Design System:** Highly customized Vanilla CSS implementing premium **Glassmorphism**, smooth transitions, dark mode palettes, and dynamic flex/grid layouts.
*   **State Management:** Global `AppContext` with automatic `localStorage` synchronization for progress persistence directly in the browser.
*   **Audio Engine:** Custom `useTTS` React Hook wrapping the browser's native `SpeechSynthesis` API to ensure high-fidelity Canadian French pronunciation without relying on expensive backend dependencies.
*   **Hosting:** Fully static exports compiled for **GitHub Pages**.

## 🚀 Getting Started Locally

You can run FrançAce locally to experiment with the code and expand the test bank!

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shreyas1214/francace.git
   ```
2. **Navigate into the development directory:**
   *Note: Because this operates using a Next.js `out/` branch deployment model, development code sits in the `francace-next` structure.*
   ```bash
   cd francace-next
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. **Open your browser:** Navigate to `http://localhost:3000`

## 📦 Deployment pipeline

This application uses a Next.js Static HTML Export (`next export`) pointing to the base path `/francace`. 

To deploy a new version to GitHub pages:
1. Run `npm run build` from the `francace-next/` directory.
2. Copy the contents of the generated `out/` folder directly to the root of your `francace` repository folder.
3. Ensure a `.nojekyll` file exists at the root.
4. Add, commit, and push to the `main` branch. GitHub Pages will instantly serve your new version.

## 🤝 Contributing
Want to add more practice tests or vocabulary?
The data layer is decoupled from the UI. To add your own custom questions, simply modify the native JS objects located in the `/data` folder (`exercises.js`, `vocabulary.js`, `conversations.js`).

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.
