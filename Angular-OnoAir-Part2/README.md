# ✈️ OnoAir - Airline Information System

Modern flight browsing and information system built with Angular and Firebase. This project demonstrates real-time data integration, responsive design, and modern frontend architecture.

## 🌐 Live Demo

**🚀 Try it now:** https://onoair-3a09d.web.app

Experience the live application deployed on Firebase Hosting with real-time flight data.
READ-ONLY-ATM , everything works , it fetch from database , but doesn't upload to it since it requires authentication.
---

## ✨ Features

- **📅 Flight Calendar View** - Browse flights by month with intuitive date selection
- **🔍 Real-time Search** - Search and filter flights dynamically
- **💾 Firebase Integration** - Live data synchronization with Firestore
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **🎨 Modern UI** - Clean, professional interface with custom styling
- **⚡ Fast Performance** - Optimized Angular build with lazy loading

---

## 🛠️ Technologies

### Frontend
- **Angular 19** - Modern component-based framework
- **TypeScript** - Type-safe JavaScript development
- **RxJS** - Reactive programming for async operations
- **Moment.js** - Date/time manipulation and formatting

### Backend & Hosting
- **Firebase Firestore** - Real-time NoSQL database
- **Firebase Hosting** - Fast, secure web hosting
- **Firebase Security Rules** - Data access control

### Styling
- **Custom CSS** - Handcrafted responsive styles
- **Flexbox & Grid** - Modern layout techniques

---

## 🚀 Getting Started

### Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18+) - [Download](https://nodejs.org/)
- **npm** (v9+) - Comes with Node.js
- **Git** - For cloning the repository

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/AdeemDabour/FrontendCourseExercises.git
```

2. **Navigate to the project**
```bash
   cd FrontendCourseExercises/Angular-OnoAir-Part2
```

3. **Install dependencies**
```bash
   npm install
```

4. **Run development server**
```bash
   npx ng serve
```

5. **Open in browser**
```
   Navigate to http://localhost:4200
```

The application will automatically reload when you make changes to source files.

---

## 📦 Building for Production

**Build the project:**
```bash
npx ng build
```

**Output location:**
```
dist/angular-onoair/browser/
```

The production build is optimized for performance with:
- Ahead-of-Time (AOT) compilation
- Tree-shaking for smaller bundle size
- Minification and uglification
- Source maps for debugging

---

## 🔥 Firebase Configuration

### Firestore Database
The app uses Firebase Firestore for real-time data storage:
- **Collections:** flights, bookings, users (if applicable)
- **Real-time sync:** Changes update instantly across all clients
- **Security Rules:** Public read access for demo, auth required for writes

### Environment Setup
Firebase configuration is located in:
```
src/environments/environment.ts
```

The configuration includes:
- API Key
- Auth Domain
- Project ID
- Storage Bucket
- Messaging Sender ID
- App ID

**Note:** These are client-side configs and safe to commit (security is handled by Firebase Rules).

---

## 🎨 Key Features Explained

### 1. Calendar View
- Monthly flight schedule visualization
- Interactive date selection
- Moment.js for date calculations

### 2. Real-time Data
- Firebase Firestore integration
- Automatic UI updates on data changes
- Optimistic UI updates

### 3. Responsive Design
- Mobile-first approach
- Flexbox and CSS Grid layouts
- Touch-friendly interface

---

## 🧪 Development

### Code Scaffolding

Generate new components:
```bash
npx ng generate component component-name
```

Generate services:
```bash
npx ng generate service service-name
```

View all available schematics:
```bash
npx ng generate --help
```

### Available Scripts
```bash
npm start          # Run development server
npm run build      # Build for production
npm test           # Run unit tests
npm run lint       # Lint TypeScript files
```

---

## 🚀 Deployment

This project is deployed on **Firebase Hosting**.

### Deploy Steps:

1. **Build the project**
```bash
   npx ng build
```

2. **Deploy to Firebase**
```bash
   npx firebase-tools deploy --only hosting
```

3. **Access live site**
```
   https://onoair-3a09d.web.app
```

---

## 📚 What I Learned

Building this project helped me develop skills in:

- **Angular Framework** - Component architecture, services, routing
- **TypeScript** - Strong typing, interfaces, generics
- **Firebase Integration** - Real-time database, authentication, hosting
- **Reactive Programming** - RxJS observables and operators
- **Responsive Design** - Mobile-first CSS, flexbox, media queries
- **Version Control** - Git workflow, branching, deployment
- **Build Tools** - Angular CLI, webpack, optimization

---

## 🐛 Known Issues

- Bundle size warning due to moment.js (1.5MB) - functional but could be optimized
- Older browsers may require polyfills (IE11 not supported)

---

## 🔮 Future Improvements

- [ ] Replace moment.js with date-fns (smaller bundle size)
- [ ] Add user authentication for booking features
- [ ] Implement flight booking functionality
- [ ] Add unit tests with Jasmine/Karma
- [ ] Integrate payment gateway
- [ ] Add email notifications
- [ ] Progressive Web App (PWA) features

---

## 📧 Contact

**Adeem Dabour**
- 💼 LinkedIn: [www.linkedin.com/in/adeem-dabour]
- 🐙 GitHub: [@AdeemDabour](https://github.com/AdeemDabour)

---

## 📄 License

This project was created as part of a frontend development course at Ono Academic College.

---

## 🙏 Acknowledgments

- **Ono Academic College** - Frontend Development Course
- **Angular Team** - Amazing framework and documentation
- **Firebase** - Reliable backend infrastructure
- **Community** - Stack Overflow, Angular forums, GitHub

---

**⭐ If you find this project interesting, please give it a star on GitHub!**

---

*Last Updated: January 2025*
