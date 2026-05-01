# Vysio Landing Page

A premium, Awwwards-level landing page for Vysio - an AI-powered system that converts images into production-ready UI code.

## 🎨 Design Features

- **Webild-Inspired Design**: Soft sky/cloud aesthetic with glassmorphism elements
- **Smooth Scrolling**: Lenis integration for buttery-smooth scroll experience
- **Scroll Animations**: Framer Motion powered fade-in and slide-up effects
- **Parallax Background**: Sky image with subtle parallax effect
- **Mouse Glow Effect**: Interactive cursor-following glow (desktop only)
- **Glassmorphism**: Consistent glass-effect UI throughout
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vysio-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🏗️ Project Structure

```
vysio-landing/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles + glassmorphism utilities
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Floating glass navbar
│   │   └── Footer.tsx      # Gradient footer
│   ├── sections/
│   │   ├── Hero.tsx        # Hero with sky background
│   │   ├── HowItWorks.tsx  # 4-step process
│   │   ├── MultiAgent.tsx  # Agent cards
│   │   ├── OutputPreview.tsx # Split layout preview
│   │   ├── Export.tsx      # Export CTA
│   │   └── FutureFeatures.tsx # Roadmap section
│   ├── ui/
│   │   ├── GlassCard.tsx   # Reusable glass card
│   │   ├── Button.tsx      # Primary/secondary buttons
│   │   ├── Input.tsx       # Glass input field
│   │   └── Badge.tsx       # Small pill badges
│   └── effects/
│       ├── MouseGlow.tsx   # Mouse-follow glow effect
│       ├── ParallaxImage.tsx # Parallax background
│       └── ScrollReveal.tsx # Scroll animation wrapper
├── lib/
│   ├── lenis.ts            # Lenis smooth scroll setup
│   └── utils.ts            # Utility functions
├── public/
│   └── assets/
│       └── sky.jpeg        # Hero background image
└── ...config files
```

## 🎯 Key Sections

### 1. Hero Section
- Full-screen hero with parallax sky background
- Large heading with gradient text
- Glass input field with icon
- Floating preview card

### 2. How It Works
- 4-step process cards
- Animated on scroll
- Icons and descriptions

### 3. Multi-Agent System
- 4 specialized agent cards
- Gradient icons
- Hover effects

### 4. Output Preview
- Split layout (input/output)
- HTML/CSS toggle
- Code syntax display

### 5. Export Section
- Download CTA
- Feature highlights
- Glass card design

### 6. Future Features
- 6 upcoming features
- Email waitlist form
- Grid layout

### 7. Footer
- Gradient background
- Links and social icons
- Responsive layout

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to customize the color palette:
```typescript
colors: {
  sky: { ... },
  // Add your colors
}
```

### Animations
Modify animation timings in `tailwind.config.ts`:
```typescript
animation: {
  'float': 'float 6s ease-in-out infinite',
}
```

### Glassmorphism
Adjust glass effects in `app/globals.css`:
```css
.glass {
  @apply bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl;
}
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Other Platforms
```bash
npm run build
npm start
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ⚡ Performance

- Next.js Image optimization
- Lazy loading for sections
- CSS containment for animations
- Debounced scroll/mouse events
- Optimized bundle size

## 🎭 Animations

All animations use Framer Motion with:
- Fade-in + slide-up on scroll
- Staggered children animations
- Smooth transitions (0.6s duration)
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📄 License

MIT License - feel free to use this for your projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, Tailwind CSS, and Framer Motion