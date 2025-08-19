# Tethered Buddies - Desktop App Guide

## Building Desktop Executable (.exe, .dmg, .AppImage)

### Quick Build
Run this command to build the desktop app:
```bash
node build-desktop.js
```

### Manual Build Steps
1. **Build the web app first:**
   ```bash
   npm run build
   ```

2. **Build desktop executable:**
   ```bash
   npx electron-builder --config electron-builder.json
   ```

3. **Find your executable in:**
   - `build-electron/` folder
   - Windows: `.exe` installer
   - Mac: `.dmg` installer  
   - Linux: `.AppImage` file

### Development Mode
Test the desktop app during development:
```bash
npm run electron-dev
```

### File Outputs
- **Windows**: `Tethered Buddies Setup.exe` (installer)
- **Mac**: `Tethered Buddies.dmg` (disk image)
- **Linux**: `Tethered Buddies.AppImage` (portable app)

### Distribution
The built executables are self-contained and can be shared with others. No additional installation required beyond running the installer/app.

## Web Deployment
For web deployment (.replit.app domain), use the Deploy button in Replit to make your game accessible online.

### Features
- ✅ Offline play (desktop version)
- ✅ Full screen gaming experience
- ✅ No browser required
- ✅ Native desktop integration
- ✅ Auto-updates support (can be configured)