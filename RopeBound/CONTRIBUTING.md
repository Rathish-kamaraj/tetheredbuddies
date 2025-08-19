# Contributing to Tethered Buddies

Thank you for your interest in contributing to Tethered Buddies! This document provides guidelines for contributing to the project.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/tethered-buddies.git
   cd tethered-buddies
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

## Development Workflow

### Making Changes

1. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the project structure:
   - Game logic: `client/src/components/`
   - Level designs: `client/src/data/levels.ts`
   - UI components: `client/src/components/ui/`
   - State management: `client/src/lib/stores/`

3. **Test your changes**:
   ```bash
   npm run dev
   # Test all 5 levels
   # Verify both single-player and cooperative gameplay
   ```

4. **Build the project** to ensure it compiles:
   ```bash
   npm run build
   ```

### Code Style Guidelines

- **TypeScript**: Use TypeScript for all new code
- **Components**: Use functional components with hooks
- **Styling**: Use Tailwind CSS classes
- **Physics**: Keep physics calculations in game logic, not rendering
- **Performance**: Avoid heavy computations in render loops

### Commit Guidelines

Use conventional commit format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Example:
```bash
git commit -m "feat: add new level with moving platforms"
```

## Types of Contributions

### 🎮 Game Features
- New levels with unique mechanics
- Additional game modes
- Power-ups or special abilities
- Visual effects and animations

### 🐛 Bug Fixes
- Physics glitches
- UI/UX improvements
- Performance optimizations
- Browser compatibility

### 📚 Documentation
- README improvements
- Code comments
- API documentation
- Setup guides

### 🎨 Assets
- New textures and models
- Sound effects and music
- UI graphics
- Game icons

## Level Design Guidelines

When creating new levels in `client/src/data/levels.ts`:

1. **Progressive Difficulty**: Each level should introduce new challenges
2. **Cooperation Focus**: Require both players to work together
3. **Clear Objectives**: Make the goal obvious
4. **Balanced Layout**: Test with different skill levels
5. **Visual Clarity**: Distinguish platforms, exits, and hazards

### Level Structure
```typescript
{
  id: number,           // Unique level identifier
  name: string,         // Short descriptive name
  description: string,  // What players need to do
  platforms: Platform[], // Collision geometry
  exitZones: ExitZone[], // Win condition areas
  player1Start: Vector3, // Starting position
  player2Start: Vector3, // Starting position
  ropeLength: number,   // Constraint distance
}
```

## Testing

### Manual Testing Checklist
- [ ] All 5 levels can be completed
- [ ] Both players can move and jump
- [ ] Rope physics work correctly
- [ ] Win conditions trigger properly
- [ ] UI navigation works
- [ ] Audio plays correctly
- [ ] Performance is smooth

### Browser Testing
Test in multiple browsers:
- Chrome/Chromium
- Firefox
- Safari (if possible)
- Edge

## Pull Request Process

1. **Update documentation** if needed
2. **Add screenshots** for visual changes
3. **Describe your changes** thoroughly
4. **Link related issues** if applicable
5. **Request review** from maintainers

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested locally
- [ ] All levels playable
- [ ] No console errors

## Screenshots
[Add screenshots if applicable]
```

## Getting Help

- **Issues**: Check existing GitHub issues first
- **Questions**: Open a discussion or issue
- **Ideas**: Share your ideas in issues or discussions

## Recognition

Contributors will be acknowledged in:
- README.md contributors section
- Release notes for significant contributions
- Special thanks for major features

Thank you for helping make Tethered Buddies better!