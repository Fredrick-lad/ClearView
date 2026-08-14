# ClearView — Personal Finance Management Platform

> A full-stack, envelope-based budgeting app that helps students and young professionals take control of their money — one envelope at a time.

ClearView lets users record income, split it into smart spending **envelopes**, track every expense, and watch their semester budget in real time. Built as a modern full-stack application with a React + TypeScript frontend, an Express + TypeScript API, and a MySQL database, it demonstrates end-to-end product development: onboarding, state management, REST APIs, authentication, notifications, email delivery, and responsive UI.

---

##  Live Demo

 **Frontend:** https://clear-view-one.vercel.app/
 **Backend API:** https://clearview-backend-k466.onrender.com/

```text
email:    demo@gmail.com
password: demo
```

> Tip: while logged in, open Settings → toggle **Email Reports** on to try the email notification feature.

---

## ✨ Features

### Budgeting
- **Envelope system** — set monthly limits per category (Food, Transport, Academics…)
- **70/30 rule** — 70% of income auto-allocated into envelopes, 30% kept as an unallocated safety buffer
- **Budget alerts** — automatic notifications (and optional emails) when an envelope reaches 90% of its limit
- **Envelope editor** — rename, change limits, swap icons, or delete envelopes (funds are freed back)

### Tracking & Insights
- **Dashboard** — at-a-glance overview of total income, budgeted, spent, and unallocated funds
- **Expenses** — log, edit, and remove expenses against envelopes in real time
- **Income** — record allowance, scholarship, part-time jobs, or M-Pesa remittances
- **Reports** — visual breakdowns with bar charts and pie charts, plus a spending leaderboard

### Notifications & Email
- **In-app notifications** — activity feed (expenses, income, envelopes, edits, alerts) with a **bell icon that shows an unread badge and changes state** when there are new notifications
- **Email notifications** — same events delivered to your inbox via the **Resend API**, gated by the *Email Reports* toggle
- **Password reset** — "Forgot password?" flow emails a secure one-time reset link (JWT, 1-hour expiry)

### Onboarding & UX
- **3-step onboarding wizard** — set a savings goal, add income, and get auto-created envelopes
- **Dark / light mode** (system-aware) plus appearance and formatting preferences
- **Responsive** — desktop sidebar, mobile bottom navigation, and a floating action button (FAB)
- **Help Center & Contact Support** pages (public and in-app)

---

##  Tech Stack

### Frontend — `clearview_frontend/`
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type-safe development |
| Vite | Build tool & dev server |
| Bootstrap 5 + custom SCSS | Styling, themes, layout |
| React Router v7 | Routing & protected routes |
| Recharts | Budget/expense visualizations |
| Lucide React | Icon system |

### Backend — `backend/`
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API |
| TypeScript (tsx) | Type-safe server code |
| MySQL (mysql2) | Relational database |
| bcrypt | Password hashing |
| jsonwebtoken | Auth + reset tokens (httpOnly cookies) |
| Resend | Email delivery (HTTPS API — no SMTP ports needed) |

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MySQL (local or cloud-hosted, e.g. Clever Cloud)

---

##  System Architecture

```
        ┌──────────────────────┐
        │  React + TypeScript   │   Vercel
        │  (Vite / Bootstrap)   │
        └──────────┬───────────┘
                   │  HTTPS + credentials
                   ▼
        ┌──────────────────────┐
        │   Express REST API    │   Render
        │  (JWT httpOnly auth)  │
        └──────────┬───────────┘
                   │
        ┌──────────┴───────────┐
        │      MySQL DB         │
        │ Users · Envelopes ·   │
        │ Expenses · Income ·   │
        │ BudgetPeriods ·       │
        │ IncomeAllocation      │
        └──────────────────────┘

        ┌──────────────────────┐
        │   Resend (HTTPS API)  │   email notifications + password reset
        └──────────────────────┘
```

**Auth flow:** the server issues a JWT stored in an httpOnly cookie; protected routes are guarded by a `TokenAuthenticator` middleware.

---

##  Project Structure

```
ClearView/
├── backend/
│   ├── src/
│   │   ├── middleware/          # JWT auth middleware
│   │   ├── routes/endpoints.ts  # All REST API endpoints
│   │   ├── util/                # JWT tokens, mailer (Resend)
│   │   ├── database.ts          # MySQL connection pool
│   │   └── server.ts            # Express app entry point
│   ├── .env                     # DB + Resend + JWT config (git-ignored)
│   └── package.json
│
├── clearview_frontend/
│   ├── src/
│   │   ├── components/          # Layout (Sidebar/Topbar/MobileNav), charts, UI
│   │   ├── screens/             # Dashboard, Envelopes, Expenses, Income,
│   │   │                        # Reports, Notifications, Settings, Profile…
│   │   ├── modals/              # Add/Edit/Delete modals
│   │   ├── hooks/context/       # Auth + global (screen/notification) contexts
│   │   ├── onboarding/          # Auth pages + 3-step onboarding wizard
│   │   ├── routes/              # React Router configuration
│   │   ├── utils/               # API client, email helpers, formatters
│   │   └── types/               # Shared TypeScript types
│   ├── index.html
│   └── package.json
│
├── screenshots/                 # Presentation screenshots
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js ≥ 20
- MySQL server running locally
- (Optional) a [Resend](https://resend.com) API key (free tier ~100 emails/day)

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file (see [Environment Variables](#environment-variables)):

```bash
cp .env.example .env   # if provided, or create from the table below
```

Start the API:

```bash
npm run dev        # development (tsx watch)
npm run build      # type-check + compile to dist/
npm start          # production
```

The server runs at `http://localhost:4000`.

### 2. Frontend

```bash
cd clearview_frontend
npm install
```

Point the app at your local API in `src/utils/api.ts`:

```ts
// const API_BASE_URL = "https://clearview-backend-k466.onrender.com"
const API_BASE_URL = "http://localhost:4000" // local development
```

Run the dev server:

```bash
npm run dev
```

Open **http://localhost:5173**.

---

## 🔐 Environment Variables

### Backend (`.env`)
```env
# Database
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=Clearview
DB_PORT=3306

# CORS
ALLOWED_ORIGINS=http://localhost:5173

# Auth
JWT_SECRET=your-long-random-secret
FRONTEND_URL=http://localhost:5173

# Email (Resend) — email notifications + password reset
# Get a key at https://resend.com/api-keys (free tier ~100 emails/day)
RESEND_API_KEY=re_your-resend-api-key
EMAIL_FROM=ClearView <onboarding@resend.dev>
```

> Resend free tier uses `onboarding@resend.dev` as the sender until you verify your own domain. Create your API key at [resend.com/api-keys](https://resend.com/api-keys).

### Frontend
Update `clearview_frontend/src/utils/api.ts` with your backend URL.

---

##  Database Schema

Core tables used by the API:

| Table | Purpose | Key columns |
|---|---|---|
| `Users` | Accounts | `id`, `firstName`, `lastName`, `email`, `password_hash` |
| `Envelopes` | Spending categories | `id`, `user_id`, `name`, `monthly_limit`, `current_spend`, `icon_name` |
| `Expenses` | Transaction log | `id`, `user_id`, `envelope_id`, `period_id`, `amount`, `description`, `expense_date` |
| `Income` | Income sources | `id`, `user_id`, `period_id`, `source`, `total_amount` |
| `BudgetPeriods` | Semesters/periods | `id`, `user_id`, `label`, `start_date`, `end_date` |
| `IncomeAllocation` | Allocation record | `income_id`, `envelope_id`, `allocated_amount` |

---

##  API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | — | Health check |
| `POST` | `/register` | — | Create account |
| `POST` | `/login` | — | Log in (sets httpOnly JWT cookie) |
| `POST` | `/checkemail` | — | Check email availability |
| `POST` | `/forgot-password` | — | Send password reset email |
| `POST` | `/reset-password` | — | Set new password from reset token |
| `GET` | `/me` | ✅ | Fetch user, envelopes, income, expenses, periods |
| `GET` | `/getenvelopes` | ✅ | List envelopes |
| `POST` | `/addenvelope` | ✅ | Create envelope |
| `PUT` | `/editenvelope/:id` | ✅ | Update envelope |
| `DELETE` | `/deleteenvelope/:id` | ✅ | Delete envelope |
| `POST` | `/addperiod` | ✅ | Create budget period |
| `POST` | `/addincome` | ✅ | Add income source |
| `POST` | `/addexpense` | ✅ | Add expense (updates envelope spend) |
| `PUT` | `/editexpense/:id` | ✅ | Edit expense (recalculates spend) |
| `POST` | `/send-notification-email` | ✅ | Send a notification email |
| `PUT` | `/update-profile` | ✅ | Update profile |
| `PUT` | `/change-password` | ✅ | Change password |
| `DELETE` | `/delete-account` | ✅ | Delete account + related data |
| `POST` | `/logout` | ✅ | Clear session |

---

##  Email Service

ClearView delivers email through the **Resend API** (HTTPS, no SMTP ports required — works on Render's free tier):

- **Notification emails** — when an event creates an in-app notification (new expense, income, envelope, edit, or budget alert ≥ 90%), an email is sent to the account address *if* the **Email Reports** toggle is enabled (Settings / Profile).
- **Budget alert deduplication** — each alert threshold is emailed only once (tracked locally).
- **Password reset** — `/forgot-password` emails a link to `/reset-password?token=…`. The token is a JWT valid for **1 hour**; `/reset-password` verifies it and updates the password.

Configure it with two environment variables (see above):

```env
RESEND_API_KEY=re_...      # from https://resend.com/api-keys
EMAIL_FROM=ClearView <onboarding@resend.dev>
```

> The free Resend tier (~100 emails/day) uses `onboarding@resend.dev` as the sender until you verify your own domain in the Resend dashboard. If `RESEND_API_KEY` is not set, emails are skipped and the content is logged to the server console instead of failing.

---

##  Skills Demonstrated

- Full-stack application development (React + Node/Express + MySQL)
- REST API design & integration
- Secure authentication with hashed passwords and JWT httpOnly cookies
- State management with React Context
- Responsive, themeable UI (dark/light, mobile navigation)
- Third-party service integration (Resend email API)
- Environment-based configuration & deployment (Vercel + Render)

---

## 🚧 Future Improvements

- Advanced financial analytics & forecasting
- Recurring transactions
- Multi-currency & exchange-rate support
- Automated test suite (unit + integration)
- Budget sharing / groups
- Native mobile app (React Native)

---

##  Developer

**Fredrick Mwangangi**

Business Information Technology Student · Kabarak University

Interested in: Backend Engineering · Database Systems · Full-Stack Development · Software Architecture

---

## 📄 License

This project is for educational and portfolio purposes.
