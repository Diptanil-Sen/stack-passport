<div align="center">

```
███████╗████████╗ █████╗  ██████╗██╗  ██╗    ██████╗  █████╗ ███████╗███████╗██████╗  ██████╗ ██████╗ ████████╗
██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝    ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝
███████╗   ██║   ███████║██║     █████╔╝     ██████╔╝███████║███████╗███████╗██████╔╝██║   ██║██████╔╝   ██║   
╚════██║   ██║   ██╔══██║██║     ██╔═██╗     ██╔═══╝ ██╔══██║╚════██║╚════██║██╔═══╝ ██║   ██║██╔══██╗   ██║   
███████║   ██║   ██║  ██║╚██████╗██║  ██╗    ██║     ██║  ██║███████║███████║██║     ╚██████╔╝██║  ██║   ██║   
╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝  
```

**Your developer identity card. Holographic. Shareable. Unforgettable.**

[![Live Demo](https://img.shields.io/badge/LIVE%20DEMO-stack--passport.vercel.app-00d4ff?style=for-the-badge&logo=vercel&logoColor=white)](https://stack-passport.vercel.app)
[![Built with React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![License MIT](https://img.shields.io/badge/License-MIT-fbbf24?style=for-the-badge)](LICENSE)
[![Passports Generated](https://img.shields.io/badge/Passports%20Generated-11%2C200%2B-10b981?style=for-the-badge)](https://stack-passport.vercel.app)

<br/>

> *"The most shareable developer identity card on the internet."*

<br/>

</div>

---

## ✦ What is Stack Passport?

Stack Passport is a **holographic developer identity card generator**. You fill in your tech stack, years of experience, and role — it generates a cinematic, spy-file aesthetic passport card that you can download as a PNG and share everywhere.

Think of it as your developer flex. Your LinkedIn profile picture for people who actually code.

---

## ⚡ Features

- **5 Card Themes** — Cyber Blue, Hacker Green, Blood Red, Midnight Purple, Golden Hour
- **8 Passport Types** — Full Stack, Frontend, Backend, DevOps, Mobile, ML, Security, Game Dev
- **Auto Level System** — RECRUIT → ENGINEER → SENIOR → PRINCIPAL → LEGEND based on your stack
- **Visa Stamp Grid** — Every technology gets its own stamp with icon and years of experience
- **MRZ Zone** — Machine-readable zone at the bottom, like a real passport
- **Holographic Effects** — Scan line, holo shimmer, 3D tilt on hover
- **Avatar Upload** — Upload your photo or use auto-generated initials
- **Download PNG** — High quality 2x export with watermark
- **Shareable Links** — Every passport gets a unique URL, shortened via TinyURL
- **Share Buttons** — Twitter, LinkedIn, WhatsApp, Instagram
- **Confetti** — Because you deserve it
- **Live Preview** — See your card update as you type
- **Fully Responsive** — Works on mobile, tablet, desktop

---

## 🛂 Preview

<div align="center">

| Cyber Blue | Hacker Green | Blood Red |
|:---:|:---:|:---:|
| ![Cyber Blue Theme](https://via.placeholder.com/220x140/0a0f1e/00d4ff?text=CYBER+BLUE) | ![Hacker Green Theme](https://via.placeholder.com/220x140/041a0d/00ff88?text=HACKER+GREEN) | ![Blood Red Theme](https://via.placeholder.com/220x140/1a040a/ff2244?text=BLOOD+RED) |

| Midnight Purple | Golden Hour |
|:---:|:---:|
| ![Midnight Purple Theme](https://via.placeholder.com/220x140/0d0420/bf00ff?text=MIDNIGHT+PURPLE) | ![Golden Hour Theme](https://via.placeholder.com/220x140/141000/fbbf24?text=GOLDEN+HOUR) |

</div>

> **Tip:** Replace the placeholder images above with actual screenshots of your passport cards.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/Diptanil-Sen/stack-passport.git

# Navigate into the project
cd stack-passport

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and start building your passport.

---

## 🗂 Project Structure

```
stack-passport/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── PassportCard.jsx     # Main card component
│   │   ├── StampGrid.jsx        # Visa stamp grid
│   │   ├── MRZZone.jsx          # Machine readable zone
│   │   ├── GlitchName.jsx       # Glitch text effect
│   │   └── ParticleField.jsx    # Background particles
│   ├── data/
│   │   └── defaultPassport.js   # Themes, levels, tech meta
│   ├── pages/
│   │   ├── Landing.jsx          # Landing page
│   │   ├── Generator.jsx        # Passport generator form
│   │   └── Passport.jsx         # Generated passport view
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vercel.json
└── vite.config.js
```

---

## 🎨 Themes

| Theme | Accent | Background |
|-------|--------|------------|
| `cyber` | `#00d4ff` | `#030712` |
| `hacker` | `#00ff88` | `#010f07` |
| `blood` | `#ff2244` | `#0f0306` |
| `purple` | `#bf00ff` | `#06010f` |
| `gold` | `#fbbf24` | `#0a0800` |

---

## 🏆 Level System

Levels are auto-calculated based on your tech count and years of experience:

| Level | Score | Color |
|-------|-------|-------|
| RECRUIT | < 12 | `#64748b` |
| ENGINEER | 12–24 | `#00ff88` |
| SENIOR | 25–39 | `#00d4ff` |
| PRINCIPAL | 40–59 | `#bf00ff` |
| LEGEND | 60+ | `#fbbf24` |

> **Score** = `(number of technologies × 2) + (years of experience × 3)`

---

## 🔗 How Sharing Works

Every generated passport is encoded directly into the URL as a compressed base64 string — **no backend, no database, no login required**. When someone opens the link, the passport is decoded and rendered client-side instantly.

When you click **Copy Link**, the URL is automatically shortened via [TinyURL](https://tinyurl.com) before being copied to your clipboard.

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 19 + Vite |
| Routing | React Router v6 |
| Export | html2canvas |
| Confetti | canvas-confetti |
| QR (removed) | react-qr-code |
| Fonts | Orbitron, Share Tech Mono, Rajdhani |
| Deployment | Vercel |

---

## 📦 Deployment

This project is deployed on Vercel with client-side routing handled via `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

To deploy your own instance:

1. Fork this repo
2. Go to [vercel.com](https://vercel.com) → Import project
3. Select your fork — leave all settings default
4. Click Deploy

---

## 🤝 Contributing

Contributions are welcome. If you have an idea for a new theme, passport type, or feature:

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-idea`
3. Commit your changes: `git commit -m "add: your idea"`
4. Push and open a PR

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 👤 Author

**Diptanil Sen**

- GitHub: [@Diptanil-Sen](https://github.com/Diptanil-Sen)
- Live: [stack-passport.vercel.app](https://stack-passport.vercel.app)

---

<div align="center">

**If this project made you smile, star it ⭐**

`crafted with obsession by diptanil sen`

</div>
