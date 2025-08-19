# Tethered Buddies

A 2D cooperative puzzle platformer where two characters connected by a rope must work together to navigate through 5 challenging levels.

## 🎮 Game Features

- **Cooperative Gameplay**: Two players share one keyboard
- **Physics-Based Mechanics**: Realistic rope physics and character movement
- **5 Unique Levels**: Progressive difficulty with different challenges
- **Level System**: 
  - Level 1: Getting Started - Learn the basics
  - Level 2: The Gap - Swing across large gaps
  - Level 3: Tower Climb - Pull each other up platforms
  - Level 4: Pendulum Puzzle - Long rope swinging mechanics
  - Level 5: Maze of Cooperation - Navigate tight spaces together

## 🎯 Controls

- **Player 1 (Red)**: WASD keys (W to jump)
- **Player 2 (Blue)**: Arrow keys (↑ to jump)
- **Restart**: Press R anytime
- **Goal**: Both players must reach the green exit zones

## 🚀 Quick Start

### Play Online
Visit the live game: [Coming Soon - Deploy to get link]

### Run Locally
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5000
```

## 🛠 Technology Stack

- **Frontend**: React, Three.js, React Three Fiber
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Build**: Vite, esbuild

## 📦 Deployment Options

### Web Deployment
Deploy to Replit or any hosting platform:
```bash
npm run build
npm start
```

### Desktop App
Build standalone executables for Windows, Mac, and Linux:
```bash
node build-desktop.js
```

Outputs:
- Windows: `.exe` installer
- Mac: `.dmg` disk image
- Linux: `.AppImage` portable app

## 🔧 Development

### Project Structure
```
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # Game components (Player, Rope, Level)
│   │   ├── data/          # Level definitions
│   │   ├── lib/stores/    # State management (Zustand)
│   │   └── hooks/         # Custom React hooks
├── server/                # Express backend
├── shared/                # Shared types and schemas
└── electron.js           # Desktop app configuration
```

### Key Components
- `Game.tsx` - Main game loop and physics
- `Player.tsx` - Character rendering and controls
- `Rope.tsx` - Dynamic rope visualization
- `Level.tsx` - Platform and environment rendering
- `levels.ts` - Level data and configurations

## 🎨 Game Mechanics

### Rope Physics
- Dynamic length constraints
- Realistic swing mechanics
- Momentum transfer between players
- Visual catenary curve rendering

### Collision System
- AABB collision detection
- Platform-specific interactions
- Precise exit zone detection
- Ground and platform physics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎪 Screenshots

[Add screenshots of gameplay here]

## 🐛 Known Issues

- Texture loading may show fallback colors on slow connections
- Audio requires user interaction to start (browser policy)

## 🗺 Roadmap

- [ ] More levels with unique mechanics
- [ ] Online multiplayer support
- [ ] Level editor
- [ ] Mobile touch controls
- [ ] Achievements system

---

Made with ❤️ using React and Three.js