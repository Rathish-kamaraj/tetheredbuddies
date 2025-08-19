# GitHub Setup Guide for Tethered Buddies

## 🚀 Publishing Your Game to GitHub

### Step 1: Create GitHub Repository

1. **Go to GitHub.com** and sign in
2. **Click "New repository"** (+ icon in top right)
3. **Repository name**: `tethered-buddies` (or your preferred name)
4. **Description**: "A 2D cooperative puzzle platformer with rope physics"
5. **Make it Public** so others can see and play
6. **Don't initialize** with README (we already have files)
7. **Click "Create repository"**

### Step 2: Connect Your Local Code to GitHub

In your Replit terminal, run these commands:

```bash
# Initialize git (if not already done)
git init

# Add all files to git
git add .

# Create first commit
git commit -m "Initial commit: Tethered Buddies game with 5 levels"

# Connect to your GitHub repository
git remote add origin https://github.com/YOUR-USERNAME/tethered-buddies.git

# Push to GitHub
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 3: Enable GitHub Pages (Free Web Hosting)

1. **Go to your repository** on GitHub
2. **Click "Settings"** tab
3. **Scroll to "Pages"** in the left sidebar
4. **Source**: Select "GitHub Actions"
5. **The deploy.yml workflow will automatically**:
   - Build your game when you push changes
   - Deploy to GitHub Pages
   - Give you a URL like: `https://your-username.github.io/tethered-buddies/`

### Step 4: Automatic Desktop Builds

The repository includes workflows that will:
- **Build desktop apps** for Windows, Mac, and Linux when you create releases
- **Deploy web version** automatically when you push to main branch

## 🎯 What You Get

### Web Version
- **Free hosting** at `your-username.github.io/tethered-buddies`
- **Automatic updates** when you push changes
- **Professional URL** to share with others

### Desktop Builds
- **Automatic executable creation** for all platforms
- **Release management** through GitHub releases
- **Download links** for users

### Community Features
- **Issue tracking** for bug reports and feature requests
- **Pull requests** for community contributions  
- **Wiki** for documentation
- **Discussions** for community interaction

## 📝 Making Updates

After initial setup, updating is simple:

```bash
# Make your changes to the game
# Add changed files
git add .

# Commit with descriptive message
git commit -m "Add new level with moving platforms"

# Push to GitHub
git push
```

This automatically triggers:
- Web deployment to GitHub Pages
- Build checks to ensure code works

## 🎮 Sharing Your Game

Once published, you can share:
- **Web version**: `https://your-username.github.io/tethered-buddies`
- **GitHub repository**: `https://github.com/your-username/tethered-buddies`
- **Desktop downloads**: From GitHub releases section

## 📊 GitHub Features for Game Development

### Issues
Use for:
- Bug reports from players
- Feature requests
- Development planning
- Community feedback

### Projects
Create project boards for:
- Level design roadmap
- Bug tracking
- Feature development
- Release planning

### Discussions
Enable for:
- Community feedback
- Game strategy discussions
- Development questions
- Player showcase

### Wiki
Document:
- Game mechanics
- Level walkthroughs  
- Development notes
- Contribution guides

## 🔧 Advanced Setup

### Custom Domain (Optional)
1. Buy a domain name
2. Add CNAME file to repository
3. Configure in repository settings
4. Get custom URL like `tetheredbuddies.com`

### Analytics
Add Google Analytics or GitHub insights to track:
- Player engagement
- Popular levels
- Geographic reach
- Performance metrics

## 🤝 Encouraging Contributions

Your repository is set up to welcome contributors:
- Clear README with setup instructions
- CONTRIBUTING.md with development guidelines
- Issue templates for bug reports
- Pull request templates
- Code of conduct (recommended to add)

## 📈 Growing Your Project

### Marketing Your Game
- Share in gamedev communities
- Post on social media with screenshots
- Submit to indie game showcases
- Create development blogs
- Make video playthroughs

### Building Community
- Respond to issues and feedback
- Accept quality pull requests
- Create level design contests
- Share development updates
- Engage with players

Your game is now ready for the world to discover and enjoy!