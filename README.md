# 🚀 PROMPTLIBRARY - Enterprise Prompt Engineering Website

<div align="center">

![Security Grade](https://img.shields.io/badge/Security-A+-success?style=for-the-badge)
![Performance](https://img.shields.io/badge/Performance-100%25-success?style=for-the-badge)
![Mobile Optimized](https://img.shields.io/badge/Mobile-Optimized-blue?style=for-the-badge)

**A professional portfolio and prompt engineering library showcasing security-first design and enterprise-grade implementation**

[Live Demo](https://basiliso-rosario.com) · [Security Report](#security-posture) · [Documentation](#documentation)

</div>

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Security Posture](#security-posture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [UX Optimizations](#ux-optimizations)
- [Development Notes](#development-notes)
- [Deployment](#deployment)
- [Testing](#testing)
- [License](#license)

---

## 🎯 Overview

This project is a **security-hardened personal portfolio and prompt engineering library** designed to demonstrate:

- ✨ Enterprise-grade security implementation (A+ ratings across all platforms)
- 📱 Mobile-first responsive design with desktop-like UX
- 🎨 Professional UI/UX with minimal dependencies
- 📚 Comprehensive prompt engineering library with real-world examples
- 🔒 Privacy-conscious architecture (no tracking, no analytics, no cookies)

The website showcases professional work, provides educational resources related to prompt engineering, and demonstrates security best practices for modern web applications.

---

## ✨ Features

### Core Functionality

- **Personal Portfolio** - Professional profile with bio, quote, and call-to-action
- **Prompt Engineering Library** - Comprehensive collection of enterprise prompts organized by:
  - Methodology frameworks (CRISP, CRISPE, COSTAR, ReAct)
  - Role-based best practices (Executive Assistant, IT Engineer, IT Manager, IT Site Support)
  - Skill levels (Entry, Intermediate, Advanced)
- **Security Showcase** - Live security test results and implementation details
- **Site Use Policy** - Comprehensive legal framework and security disclosures

### Design & UX

- **Accordion Navigation** - Organized desktop navigation with expandable Security section
- **Mobile-Optimized** - 40% reduction in scrolling on mobile devices
- **Tablet Support** - Dedicated breakpoint with 2-column layouts (769px - 1024px)
- **Copy-to-Clipboard** - One-click copy functionality for all prompt templates
- **Dark Theme Sidebar** - Professional gradient sidebar with red accent theme
- **Responsive Grid Layouts** - Adapts from 6-column desktop to single-column mobile

### Security Features

- **Content Security Policy (CSP)** - Strict policy with explicit resource allowlists
- **HTTP Strict Transport Security (HSTS)** - 1-year enforcement with subdomains
- **Security Headers** - X-Frame-Options, X-Content-Type-Options, Permissions-Policy
- **TLS 1.3 Encryption** - Modern cipher suites with automated certificate renewal
- **No Third-Party Scripts** - Zero external dependencies, all resources self-hosted
- **No Data Collection** - No cookies, no analytics, no user tracking

---

## 🔒 Security Posture

### Test Results

| Platform | Grade | Focus Area |
|----------|-------|------------|
| **Mozilla Observatory** | A+ | Security Headers |
| **SecurityHeaders.com** | A+ | Header Implementation |
| **SSL Labs** | A+ | TLS Configuration |
| **GTmetrix** | A | Performance & Structure |

### Security Philosophy

1. **Least Privilege** - Only minimum required browser capabilities permitted
2. **Defense in Depth** - Multiple overlapping security controls
3. **Predictability** - Explicit configuration over defaults

### Implementation Highlights

- **CSP Default-src: 'none'** - Explicit allowlists for each resource type
- **HSTS Max-Age: 31536000** - 1 year enforcement
- **X-Frame-Options: DENY** - Clickjacking protection
- **Permissions-Policy** - Restrictive browser API controls
- **Referrer-Policy: strict-origin-when-cross-origin** - Privacy protection

> See [Security Posture & Test Results](Security/security.html) for full details and live test screenshots.

---

## 🛠️ Technology Stack

### Frontend

- **HTML5** - Semantic markup with accessibility considerations
- **CSS3** - Modern responsive design with flexbox/grid layouts
- **Vanilla JavaScript** - No frameworks, pure DOM manipulation
- **SVG Icons** - Scalable, self-hosted vector graphics
- **SVG Fonts** - Scalable, self-hosted vector fonts

### Hosting & Infrastructure

- **Static HTML** - No server-side processing required
- **Self-Hosted Assets** - All fonts, icons, and resources served from origin
- **HTTPS Only** - TLS 1.3 with automated certificate renewal

### Development Tools

- Modern text editor (VS Code recommended)
- Git for version control
- Browser DevTools for testing

---

## 📁 Project Structure

```
PROMPTLIBRARY/
├── index.html                  # Home/Profile page
├── library.html                # Prompt engineering library
├── styles.css                  # Master stylesheet (1449 lines)
├── app.js                      # JavaScript functionality
├── .htaccess                   # Security headers configuration
├── me2.png                     # Profile image
│
├── Security/
│   ├── security.html           # Combined security posture & test results
│   ├── site-use-policy.html    # Legal framework and disclosures
│   ├── mozilla-observatory.png # Test screenshot
│   ├── securityheaders.png     # Test screenshot
│   ├── ssl-labs.png            # Test screenshot
│   └── gtmetrix.png            # Test screenshot
│
├── Icons/SVG/
│   ├── arrow-left.svg
│   ├── arrow-right.svg
│   ├── chevron-right.svg       # Accordion indicator
│   ├── linkedin.svg
│   ├── email.svg
│   ├── home.svg
│   ├── bullseye.svg
│   └── [other role/feature icons]
│
├── Fonts/                      # Self-hosted fonts (if any)
│
└── docs/                       # Project documentation
    ├── DEPLOYMENT-CHECKLIST.md
    ├── UX-IMPROVEMENTS.md
    ├── FIXES-SUMMARY.md
    └── PROJECT-NOTES.md
```

---

## 🎨 UX Optimizations

### Mobile Experience (40% Less Scrolling)

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| **Prompt Text Size** | 0.9rem | 0.9rem | 0.85rem |
| **Line Height** | 1.7 | 1.7 | 1.6 |
| **Content Padding** | 40px | 30px | 15px |
| **Framework Grid Columns** | 5-6 | 2 | 1 |
| **Section Spacing** | 30px | - | 25px |

### Responsive Breakpoints

- **Desktop**: 1025px+ (Full layout, 5-6 column grids)
- **Tablet**: 769px - 1024px (2-column grids, moderate compression)
- **Mobile**: ≤768px (Single column, aggressive spacing optimization)
- **Small Mobile**: ≤480px (Same as mobile with additional considerations)

### Key Improvements

- ✅ 40% reduction in vertical scrolling on mobile
- ✅ Desktop-like flow across all devices
- ✅ Tablet-specific optimizations (often overlooked)
- ✅ Maintained readability and accessibility
- ✅ Professional polish with tighter content density

> See [UX-IMPROVEMENTS.md](UX-IMPROVEMENTS.md) for detailed metrics and implementation.

---

## 📝 Development Notes

### Recent Updates

1. **Accordion Navigation** - Added expandable Security section in sidebar
2. **Security Page Consolidation** - Merged Test Results into Posture page
3. **Site Use Policy** - Created comprehensive 12-section legal framework
4. **Mobile UX Overhaul** - 40% scrolling reduction with responsive optimizations
5. **Tablet Breakpoint** - Added dedicated 769px-1024px breakpoint

### Known Issues

- None currently tracked

### Planned Enhancements

- [ ] Collapsible/expandable example blocks
- [ ] "Read More" functionality for long prompts
- [ ] Sticky headers on scroll
- [ ] Print-friendly stylesheet
- [ ] Smooth scroll behavior

---

## 🚀 Deployment

### Prerequisites

- Web server with HTTPS support
- Apache with mod_headers enabled (for .htaccess)
- Git for version control

### Deployment Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/Leafmebe/PROMPTLIBRARY.git
   cd PROMPTLIBRARY
   ```

2. **Upload to Server**
   - Upload all files maintaining directory structure
   - Ensure .htaccess is processed
   - Verify Icons/SVG/ directory uploads completely

3. **Verify Security Headers**
   - Test at [SecurityHeaders.com](https://securityheaders.com)
   - Test at [Mozilla Observatory](https://observatory.mozilla.org)

4. **Clear Cache**
   - Browser: Ctrl + Shift + Delete
   - Hard refresh: Ctrl + Shift + R

> See [DEPLOYMENT-CHECKLIST.md](DEPLOYMENT-CHECKLIST.md) for detailed instructions.

---

## 🧪 Testing

### Desktop Tests

- [ ] Sidebar has dark gradient background
- [ ] Framework grids display in 5-6 columns
- [ ] Navigation items hover correctly
- [ ] All SVG icons load without errors
- [ ] Copy buttons work for prompt examples

### Mobile Tests (< 768px)

- [ ] Hamburger menu appears and functions
- [ ] Navigation menu slides down with backdrop
- [ ] Framework grids collapse to single column
- [ ] Scrolling is reduced vs previous version
- [ ] All tap targets are >44px (accessibility)

### Security Tests

- [ ] CSP violations: 0
- [ ] Mixed content warnings: 0
- [ ] HTTP requests: 0 (all HTTPS)
- [ ] Third-party scripts: 0

### Browser Compatibility

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile Safari (iOS)
- ✅ Chrome Mobile (Android)

---

## 📚 Documentation

- [DEPLOYMENT-CHECKLIST.md](DEPLOYMENT-CHECKLIST.md) - Server upload and testing
- [UX-IMPROVEMENTS.md](UX-IMPROVEMENTS.md) - Mobile optimization details
- [FIXES-SUMMARY.md](FIXES-SUMMARY.md) - Bug fixes and solutions

---

## 📄 License

This project is a personal portfolio and educational resource. The code is provided for reference and learning purposes.

**Content Usage:**
- ✅ View and learn from code structure
- ✅ Reference security implementations
- ✅ Adapt prompt engineering examples
- ❌ Do not reproduce the entire site
- ❌ Do not use profile content or personal information

---

## 🤝 Contact

**Basiliso Rosario**
- LinkedIn: [linkedin.com/in/basiliso-rosario](https://www.linkedin.com/in/basiliso-rosario/)
- Email: bas.rosario@gmail.com
- Website: [basiliso-rosario.com](https://basiliso-rosario.com)

---

## 🙏 Acknowledgments

- Icons: Self-designed SVG icons
- Fonts: System fonts for performance
- Security Testing: Mozilla Observatory, SecurityHeaders.com, SSL Labs, GTmetrix
- Prompt Engineering: Real-world enterprise examples from professional experience

---

<div align="center">

**Built with security, performance, and user experience in mind** 🚀

[⬆ Back to Top](#-promptlibrary---enterprise-prompt-engineering-website)

</div>
