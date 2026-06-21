# National Trading Academy — Trading/Course Marketing Website

A mobile-first React marketing site for a trading academy with lead capture via Firebase Firestore, email notifications via Cloud Functions, and a protected admin dashboard.

## Tech Stack

- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS v4
- **Routing:** React Router v7
- **Icons:** lucide-react
- **Carousel:** Embla Carousel
- **Backend:** Firebase (Firestore, Auth, Cloud Functions)

## Project Structure

```
trading-academy/
├── src/
│   ├── components/       # Navbar, Footer, CTAButton, ContactForm, etc.
│   ├── config/content.ts # All editable content (courses, testimonials, partners…)
│   ├── context/          # Firebase Auth provider
│   ├── lib/              # Firebase init & lead CRUD
│   ├── pages/            # Home, Contact, Admin Leads
│   └── sections/         # Home page sections
├── functions/            # Cloud Function: email on new lead
├── firestore.rules       # Security rules for leads collection
├── firebase.json         # Firebase project config
└── env.example           # Environment variable template
```

## Quick Start (Local Dev)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp env.example .env.local
```

Fill in your Firebase web app credentials from [Firebase Console](https://console.firebase.google.com/) → Project Settings → Your apps.

### 3. Run the dev server

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

> Note: The root `index.html` is the Vite dev entry and loads `src/main.tsx` directly. Do not serve the project root as a static website without first building it.

### 4. Build for production

```bash
npm run build
npm run preview
```

## Firebase Setup

### Create a Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Authentication** → Sign-in method → **Email/Password**.
3. Create an admin user under Authentication → Users.
4. Enable **Cloud Firestore** in production mode (rules will be deployed from this repo).
5. Register a **Web app** and copy the config values into `.env.local`.

### Deploy Firestore rules

```bash
firebase login
firebase use --add   # select your project
firebase deploy --only firestore:rules
```

### Cloud Functions (lead email notifications)

```bash
cd functions
npm install
cd ..
```

Set SMTP credentials via Firebase Functions config:

```bash
firebase functions:config:set \
  smtp.host="smtp.gmail.com" \
  smtp.port="587" \
  smtp.user="your-email@gmail.com" \
  smtp.pass="your-app-password" \
  notification.email="leads@yourcompany.com"
```

Deploy functions:

```bash
firebase deploy --only functions
```

The `onLeadCreated` function triggers when a document is created in the `leads` collection and sends an email via Nodemailer.

### Deploy frontend to Firebase Hosting

```bash
npm run build
firebase deploy --only Hosting
```

### Deploy frontend to GitHub Pages

1. Install dependencies if not already installed:

```bash
npm install
```

2. Deploy the production build:

```bash
npm run deploy:gh-pages
```

This publishes `dist/` to the `gh-pages` branch.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, carousel, course highlights, testimonials |
| `/contact` | Contact form with validation & Firestore lead capture |
| `/admin/leads` | Admin login + leads table (newest first, mark as contacted) |

## Editing Content

All marketing copy, courses, partners, testimonials, and stats live in:

```
src/config/content.ts
```

Update arrays and strings there — no component changes needed for most content edits.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID |
| `VITE_FIREBASE_APP_ID` | App ID |
| `VITE_WHATSAPP_number` | WhatsApp number for float button (no + prefix) |

## Design Tokens

- **Accent:** `#EC1E50`
- **Navy:** `#1F1B4D`
- **Font:** Poppins (Google Fonts)
- **Breakpoint:** `lg:` (1024px) for desktop layout

## License

Private — for National Trading Academy use.
