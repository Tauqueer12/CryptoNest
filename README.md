<br># 🪺 CryptoNest

**Your safe haven in the crypto world.**

A full-stack cryptocurrency trading simulator built with the MERN stack. Track real-time market data, build a virtual portfolio, execute buy/sell trades, and stay updated with the latest crypto news — all within a secure, production-hardened application.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://cryptonest-api.onrender.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=flat-square)](https://jwt.io/)

---

## 📸 Screenshots

### Sign In / Sign Up — 3D Ethereum Animation
Interactive 3D Ethereum model rendered with Three.js on the authentication pages.

![Sign In Page](https://user-images.githubusercontent.com/100773023/229189242-a6aa6caf-b265-4794-a1be-e5fa8df20531.png)

### Crypto News Feed
Live news articles fetched from the GNews API, displayed in a responsive card layout.

![News Feed](https://user-images.githubusercontent.com/100773023/229190967-41cf1a4f-31db-448f-a5b6-328a1a2ee1d3.png)

### Buy & Sell — Real-Time Market Data
Detailed coin pages with live pricing from CoinGecko, price change percentages across multiple timeframes, market stats, and interactive volume charts.

![Buy and Sell](https://user-images.githubusercontent.com/100773023/229191125-30c358c1-2cbc-42a4-8e98-f4b8c4b4609e.png)

### Fully Responsive
Dedicated mobile navigation with hamburger menu for seamless use on all device sizes.

![Responsive Design](https://user-images.githubusercontent.com/100773023/229193396-57f55f8b-1abc-456d-b140-b58011ebb896.png)

### Dashboard — Dark & Light Mode
Portfolio overview with balance tracking, investment analytics, profit/loss calculations, and a token allocation donut chart. Supports persistent dark/light theme toggling.

![Dashboard Dark Mode](https://user-images.githubusercontent.com/100773023/229189841-b50bed3b-d9fe-48d9-b540-1d44a3bb7539.png)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **JWT Authentication** | Secure token-based login/signup with bcrypt password hashing and 1-hour token expiry |
| **Protected Routes** | Frontend route guards redirect unauthenticated users to the login page |
| **Virtual Trading** | Buy and sell cryptocurrencies using a ₹10,00,000 virtual balance |
| **Real-Time Market Data** | Live coin prices, market caps, and volume data from the CoinGecko API |
| **Portfolio Dashboard** | Track balance, total investment, current value, and profit/loss percentage |
| **Crypto News** | Latest cryptocurrency news articles via the GNews API |
| **Dark Mode** | Persistent dark/light theme toggle stored in localStorage |
| **3D Authentication UI** | Interactive Ethereum model rendered with React Three Fiber |
| **Data Visualization** | Token allocation donut chart and exchange volume line chart (ApexCharts) |
| **Input Validation** | Zod schema validation on all authentication endpoints |
| **XSS Protection** | DOMPurify sanitization on all rendered HTML content |
| **SPA Navigation** | React Router `<Link>` components for instant, flicker-free page transitions |
| **Responsive Design** | Adaptive layout with dedicated mobile navbar |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                   │
│                                                         │
│  Landing Page ──► Login/Signup ──► Dashboard             │
│                                    ├── Market            │
│                                    ├── News Feed         │
│                                    ├── Buy Coin          │
│                                    └── Sell Coin         │
│                                                         │
│  Auth: JWT token stored in localStorage                 │
│  Navigation: React Router v6 (SPA)                      │
│  Charts: ApexCharts │ 3D: React Three Fiber             │
└───────────────┬─────────────────────────────────────────┘
                │  HTTP (REST API)
                │  Authorization: Bearer <JWT>
┌───────────────▼─────────────────────────────────────────┐
│                     BACKEND (Express.js)                 │
│                                                         │
│  POST /api/auth/login      ── Zod validation ── bcrypt  │
│  POST /api/auth/signup     ── Zod validation ── bcrypt  │
│  DELETE /api/auth/logout   ── Auth middleware            │
│  GET  /api/user/portfolio  ── Auth middleware            │
│  POST /api/user/stock/add  ── Auth middleware            │
│  POST /api/user/stock/remove ── Auth middleware          │
│                                                         │
│  Middleware: JWT verification, Zod validation            │
│  Error Handler: Centralized Express error middleware     │
└───────────────┬─────────────────────────────────────────┘
                │  Mongoose ODM
┌───────────────▼─────────────────────────────────────────┐
│                     DATABASE (MongoDB)                   │
│                                                         │
│  Users Collection:                                      │
│  { first_name, last_name, email, password (hashed),     │
│    credits, stocks: [{ stockId, quantity, total_amount }]│
│  }                                                      │
│                                                         │
│  Atomic operations: $inc, $push, $map, $filter          │
│  Race-condition guards on concurrent transactions       │
└─────────────────────────────────────────────────────────┘
```

---

## 🔒 Security

| Layer | Implementation |
|-------|---------------|
| **Password Storage** | bcrypt with 10 salt rounds — passwords are never stored in plain text |
| **Authentication** | JWT tokens signed with a 256-bit secret key, 1-hour expiry |
| **Route Protection** | `PrivateRoute` component on frontend; `auth` middleware on every protected backend route |
| **Input Validation** | Zod schemas validate all auth payloads before they reach business logic |
| **XSS Prevention** | `DOMPurify.sanitize()` on all externally sourced HTML (coin descriptions) |
| **CORS** | Enabled via the `cors` middleware |
| **Environment Variables** | All secrets (JWT key, MongoDB URI) stored in `.env` and excluded from version control |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| React Router v6 | Client-side routing (SPA) |
| React Three Fiber | 3D Ethereum model on auth pages |
| ApexCharts | Donut and line chart visualizations |
| Axios | HTTP client for API requests |
| AOS (Animate on Scroll) | Landing page scroll animations |
| Ant Design (Card) | News card components |
| Tailwind CSS | Utility styling (Landing page, auth pages) |
| DOMPurify | HTML sanitization |
| React Toastify | Toast notification system |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework & REST API |
| MongoDB | NoSQL database |
| Mongoose | ODM for MongoDB |
| JSON Web Tokens | Stateless authentication |
| bcrypt | Password hashing |
| Zod | Schema-based input validation |
| dotenv | Environment variable management |
| CORS | Cross-origin resource sharing |

### External APIs
| API | Purpose |
|-----|---------|
| [CoinGecko](https://www.coingecko.com/) | Real-time cryptocurrency market data (prices, volumes, market caps) |
| [GNews](https://gnews.io/) | Latest cryptocurrency news articles |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or a local MongoDB instance)
- CoinGecko API access (free tier)
- GNews API key (free tier)

### 1. Clone the Repository
```bash
git clone https://github.com/Tauqueer12/CryptoNest.git
cd CryptoNest
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
```

> 💡 Generate a strong secret key: `openssl rand -hex 32`

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
CryptoNest/
├── backend/
│   ├── app.js                    # Express server entry point
│   ├── middleware/
│   │   ├── auth.middle.js        # JWT authentication middleware
│   │   └── validate.middle.js    # Zod validation middleware
│   ├── models/
│   │   └── user.js               # Mongoose User schema
│   ├── routers/
│   │   ├── auth.router.js        # Login, Signup, Logout routes
│   │   └── userData.router.js    # Portfolio, Buy, Sell routes
│   └── schema/
│       └── auth.schema.js        # Zod validation schemas
│
├── frontend/
│   └── src/
│       ├── App.js                # Router config + PrivateRoute
│       ├── LandingPage/          # Public landing page
│       ├── SignIn/               # Login & Signup with 3D model
│       ├── Dashboard/            # Portfolio dashboard
│       ├── Market/               # Coin listings
│       ├── Messages/             # Crypto news feed
│       ├── Navbar/               # Sidebar + TopNavbar + Mobile nav
│       ├── chart/                # ApexCharts components
│       ├── routes/               # Coin buy & sell pages
│       └── aboutus/              # About section
│
└── README.md
```

---

## 👤 Author

**Md Tauqueer Perwaiz**

[![GitHub](https://img.shields.io/badge/GitHub-Tauqueer12-181717?style=flat-square&logo=github)](https://github.com/Tauqueer12)




