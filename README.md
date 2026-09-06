# Tushar Malhotra — AI Engineer Portfolio

A **fully interactive 3D personal portfolio** for Tushar Malhotra, an AI Engineer specializing in Generative AI, Agentic AI, and Multi-Agent Systems.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — fast build tool
- **Three.js** + **React Three Fiber** — 3D WebGL rendering
- **@react-three/drei** — useful helpers for R3F
- **Framer Motion** — animations and transitions
- **Tailwind CSS** — styling
- **Lucide React** — icon library

## Project Structure

```
src/
├── components/
│   ├── three/           # Three.js scene components
│   │   ├── NeuralNetwork.tsx
│   │   ├── AICore.tsx
│   │   ├── AgentViz.tsx
│   │   ├── Scenes.tsx
│   │   └── utils.ts
│   ├── ui/              # UI components
│   │   └── Cursor.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Navbar.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Education.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── LoadingScreen.tsx
├── data/
│   └── index.ts         # Structured content data
├── hooks/
│   └── index.ts         # Custom hooks
├── context/
│   └── ThemeContext.tsx
├── pages/
│   └── Home.tsx
├── styles/
│   └── globals.css
├── App.tsx
└── main.tsx
```

## Features

### Core Experience
- Full-screen 3D hero with interactive neural core
- Mouse-reactive 3D animations
- AI loading screen with initialization sequence
- Smooth scroll navigation
- Custom glowing cursor (desktop)

### Sections
- **Hero** — Name and tagline with animated 3D core
- **About** — Profile with AI architecture flow visualization
- **Skills** — Interactive skill categories with orbiting tech tags
- **Experience** — Timeline with animated agent pipeline
- **Projects** — Interactive 3D cards with modals
- **Education** — Timeline with key metrics
- **Contact** — Form with validation and contact links

### Accessibility
- Respects `prefers-reduced-motion`
- Semantic HTML
- Keyboard navigation
- ARIA labels
- Focus states

### Performance
- Optimized WebGL (adaptive particle count)
- Lazy loading 3D components
- Code splitting (Vite)
- Mobile fallbacks (CSS-only where needed)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at `http://localhost:3000` |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## Links

- **GitHub**: [github.com/sharrymalhotra](https://github.com/sharrymalhotra)
- **LinkedIn**: [linkedin.com/in/tushar-malhotra](https://www.linkedin.com/in/tushar-malhotra-293211257/)
- **Email**: tusharmalhotra2007@gmail.com

## License

All rights reserved. This portfolio is personal work by Tushar Malhotra.
