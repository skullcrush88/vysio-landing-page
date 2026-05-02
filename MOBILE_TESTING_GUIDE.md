# 📱 Mobile Testing Guide

## How to Launch on Phone Emulator

### Option 1: Browser DevTools (Easiest)

1. **Start the development server:**
   ```bash
   cd vysio-landing-page
   npm run dev
   ```

2. **Open in browser:**
   - Navigate to `http://localhost:3000`

3. **Open DevTools:**
   - **Chrome/Edge:** Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
   - **Firefox:** Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
   - **Safari:** Enable Developer menu in Preferences, then `Cmd+Option+I`

4. **Toggle Device Toolbar:**
   - **Chrome/Edge:** Click the device icon or press `Cmd+Shift+M` (Mac) / `Ctrl+Shift+M` (Windows)
   - **Firefox:** Click the responsive design mode icon or press `Cmd+Option+M` (Mac) / `Ctrl+Shift+M` (Windows)

5. **Select a device:**
   - iPhone 14 Pro Max (430 x 932)
   - iPhone 12/13 Pro (390 x 844)
   - iPhone SE (375 x 667)
   - Samsung Galaxy S20 (360 x 800)
   - Pixel 5 (393 x 851)

### Option 2: Test on Real Device (Same Network)

1. **Find your local IP address:**
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. **Start dev server with network access:**
   ```bash
   npm run dev -- --host
   ```

3. **Access from phone:**
   - Open browser on your phone
   - Navigate to `http://YOUR_IP_ADDRESS:3000`
   - Example: `http://192.168.1.100:3000`

### Option 3: iOS Simulator (Mac Only)

1. **Install Xcode** from App Store

2. **Open Simulator:**
   ```bash
   open -a Simulator
   ```

3. **Select device:**
   - Hardware → Device → iOS → iPhone 14 Pro

4. **Open Safari in simulator:**
   - Navigate to `http://localhost:3000`

### Option 4: Android Emulator

1. **Install Android Studio**

2. **Create Virtual Device:**
   - Tools → Device Manager → Create Device
   - Select Pixel 5 or similar

3. **Start emulator and open Chrome:**
   - Navigate to `http://10.0.2.2:3000` (special localhost for Android emulator)

---

## 🎯 Mobile Features to Test

### 1. MultiAgent Connection Lines
**Location:** Scroll to "Multi-Agent Intelligence" section

**Expected Behavior:**
- ✅ **Mobile (< 768px):** Items stack vertically with horizontal separator lines
- ✅ **Desktop (≥ 768px):** Items display horizontally with vertical separator bars
- ✅ Text size reduces on mobile (text-xs → text-sm)
- ✅ Padding adjusts (px-4 py-3 → px-8 py-4)

**Test Breakpoints:**
- 320px (iPhone SE)
- 375px (iPhone 12 Mini)
- 390px (iPhone 13 Pro)
- 768px (Tablet - should switch to desktop layout)

---

### 2. Hero Input Placeholder Animation
**Location:** Top of page, main input field

**Expected Behavior:**
- ✅ **Mobile (< 768px):** Text scrolls right-to-left in a marquee animation
- ✅ **Desktop (≥ 768px):** Static placeholder text
- ✅ Animation is smooth and continuous (10s loop)
- ✅ Text doesn't overflow or get cut off

**Test:**
1. Resize browser to < 768px width
2. Observe the placeholder text animating
3. Resize to > 768px
4. Placeholder should become static

---

### 3. Mobile Hamburger Menu
**Location:** Bottom-left corner (only visible on mobile)

**Expected Behavior:**
- ✅ **Hamburger button appears only on mobile (< 768px)**
- ✅ Button is fixed at bottom-left corner
- ✅ Circular white background with menu icon
- ✅ Clicking opens vertical sidebar from left
- ✅ Dark backdrop overlay appears
- ✅ Sidebar has pill shape with navigation icons
- ✅ Close button (X) at top of sidebar
- ✅ Hovering over icons shows labels to the right
- ✅ Clicking navigation items closes menu and scrolls to section
- ✅ Clicking backdrop closes menu

**Navigation Items:**
1. 🏠 HOME → #hero
2. 👤 ABOUT → #features
3. 📁 AGENTS → #agents
4. 💬 WORKS → #how-it-works
5. 🌐 PRICING → #pricing

**Test:**
1. Resize to mobile width (< 768px)
2. Click hamburger button (bottom-left)
3. Verify sidebar slides in smoothly
4. Hover over each icon to see labels
5. Click an icon to navigate
6. Verify menu closes after navigation
7. Open menu again and click backdrop to close

---

## 🔍 Responsive Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Mobile | < 768px | Hamburger menu, vertical layouts, marquee text |
| Tablet | 768px - 1023px | Desktop navbar, horizontal layouts |
| Desktop | ≥ 1024px | Full desktop experience |

---

## ✅ Testing Checklist

### Visual Tests
- [ ] All text is readable on small screens
- [ ] No horizontal scrolling on any screen size
- [ ] Images scale properly
- [ ] Buttons are touch-friendly (min 44x44px)
- [ ] Spacing looks balanced on mobile
- [ ] Glass effects render correctly

### Interaction Tests
- [ ] Hamburger menu opens/closes smoothly
- [ ] Navigation links work correctly
- [ ] Hover states work (on devices that support hover)
- [ ] Touch interactions feel responsive
- [ ] Animations don't cause lag
- [ ] Scrolling is smooth

### Cross-Browser Tests
- [ ] Chrome/Edge (mobile view)
- [ ] Firefox (mobile view)
- [ ] Safari (iOS)
- [ ] Chrome (Android)

### Device Tests
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13 Pro (390px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] Samsung Galaxy S20 (360px)
- [ ] Pixel 5 (393px)
- [ ] iPad Mini (768px)

---

## 🐛 Common Issues & Solutions

### Issue: Marquee animation not working
**Solution:** Clear browser cache and hard reload (`Cmd+Shift+R` or `Ctrl+Shift+R`)

### Issue: Hamburger menu not appearing
**Solution:** Ensure screen width is < 768px. Check browser console for errors.

### Issue: Sidebar labels not showing on hover
**Solution:** This is expected on touch devices. Labels appear on hover for desktop testing.

### Issue: Animations are laggy
**Solution:** 
- Close other browser tabs
- Disable browser extensions
- Test on actual device instead of emulator

### Issue: Can't access from phone on same network
**Solution:**
- Ensure phone and computer are on same WiFi
- Check firewall settings
- Try `npm run dev -- --host 0.0.0.0`

---

## 📊 Performance Tips

1. **Test on real devices** when possible - emulators don't always reflect real performance
2. **Check network throttling** in DevTools (Fast 3G, Slow 3G)
3. **Monitor frame rate** - animations should be 60fps
4. **Test touch interactions** - ensure no accidental clicks

---

## 🎨 Design Consistency

All mobile components maintain the design system:
- **Colors:** Black (#0a0a0a), White, Slate grays
- **Glassmorphism:** Consistent blur and transparency
- **Rounded corners:** Full rounded (rounded-full) for buttons/pills
- **Shadows:** Subtle, consistent elevation
- **Typography:** Instrument Sans for headings, Inter for body
- **Animations:** Smooth, purposeful, not distracting

---

## 📝 Notes

- The 768px breakpoint matches Tailwind's `md:` breakpoint
- All animations use CSS for better performance
- Touch targets meet accessibility guidelines (44x44px minimum)
- The mobile menu design matches the reference image provided
- Marquee animation is 10 seconds for comfortable reading speed

---

**Made with Bob** 🤖