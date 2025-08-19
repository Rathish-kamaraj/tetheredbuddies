#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🎮 Building Tethered Buddies Desktop App...\n');

// Step 1: Build the web app
console.log('1. Building web application...');
const buildWeb = spawn('npm', ['run', 'build'], { stdio: 'inherit' });

buildWeb.on('close', (code) => {
  if (code !== 0) {
    console.error('❌ Web build failed');
    process.exit(1);
  }
  
  console.log('✅ Web build complete\n');
  
  // Step 2: Update package.json for electron
  console.log('2. Configuring for desktop build...');
  
  const packagePath = path.join(__dirname, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  // Add electron main entry and scripts if not present
  pkg.main = 'electron.js';
  pkg.homepage = './';
  
  if (!pkg.scripts['electron']) {
    pkg.scripts['electron'] = 'electron .';
    pkg.scripts['electron-dev'] = 'concurrently "npm run dev" "wait-on http://localhost:5000 && electron ."';
    pkg.scripts['build-desktop'] = 'npm run build && electron-builder';
    pkg.scripts['dist'] = 'npm run build && electron-builder --publish=never';
  }
  
  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
  console.log('✅ Package.json configured for desktop\n');
  
  // Step 3: Build desktop executable
  console.log('3. Building desktop executable...');
  const buildDesktop = spawn('npx', ['electron-builder', '--config', 'electron-builder.json'], { 
    stdio: 'inherit' 
  });
  
  buildDesktop.on('close', (code) => {
    if (code !== 0) {
      console.error('❌ Desktop build failed');
      process.exit(1);
    }
    
    console.log('\n🎉 Desktop build complete!');
    console.log('📁 Check the "build-electron" folder for your executable');
    console.log('🖥️  Windows: .exe file');
    console.log('🍎  Mac: .dmg file');
    console.log('🐧  Linux: .AppImage file');
  });
});