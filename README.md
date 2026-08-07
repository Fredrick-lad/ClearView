# ClearView - Personal Finance Management Platform


ClearView is a full-stack personal finance management platform designed to help users track expenses, manage budgets, and gain better control over their financial activities.

The application provides a modern user interface connected to a backend API and database system, demonstrating full-stack development practices including frontend development, backend engineering, API design, and database management.

## 🚀 Live Demo

🔗 https://clear-view-one.vercel.app/
```bash
username: demo@gmail.com
password:demo
```

## 📌 Project Overview

Managing personal finances can be challenging, especially for students and young professionals. ClearView provides a simple platform where users can record expenses, organize transactions, and monitor their financial progress.

The project focuses on:

- User-friendly financial tracking
- Efficient data management
- Scalable backend architecture
- Responsive user experience

---

# ✨ Features

## User Features

- User account management
- Expense tracking
- Budget monitoring
- Financial overview dashboard
- Transaction management

## System Features

- REST API architecture
- Database-driven application
- Frontend and backend separation
- Responsive user interface
- Structured project organization

---

# 🏗️ System Architecture

```
             Client Application
                    |
                    |
              React Frontend
                    |
                    |
              REST API Layer
                    |
                    |
          Node.js / Express Backend
                    |
                    |
                MySQL Database
```

---

# 🛠️ Technologies Used

## Frontend

- React.js
- TypeScript
- CSS / Bootstrap
- Vercel Deployment

## Backend

- Node.js
- Express.js
- REST API
- JavaScript

## Database

- MySQL
- Relational Database Design

## Development Tools

- Git
- GitHub
- Vercel

---

# 📂 Project Structure

```
ClearView/

│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── clearview_frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
│
└── README.md
```

---

# ⚙️ Local deveoplment guide

## Clone Repository

```bash
git clone https://github.com/Fredrick-lad/ClearView.git
```

Move into project:

```bash
cd ClearView
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=
```

Start backend server:

```bash
npm start
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd clearview_frontend
```
Navigate to util folder and uncomment the local development code line  and comment the onrender link line
```bash
// const API_BASE_URL = "https://clearview-backend-k466.onrender.com"
const API_BASE_URL = "http://localhost:4000" // for local development
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

# 🗄️ Database Design

ClearView uses a relational database structure designed for efficient data management.

Main entities include:

- Users
- Expenses
- Transactions
- Categories
- Budgets

The database design focuses on:

- Data consistency
- Reduced redundancy
- Efficient queries

---

# 👨‍💻 Developer

**Fredrick Mwangangi**

Business Information Technology Student  
Kabarak University

Interested in:

- Backend Engineering
- Database Systems
- Full-Stack Development
- Software Architecture

---

# 📚 Skills Demonstrated

This project demonstrates:

✅ Backend API Development  
✅ Database Design  
✅ RESTful Services  
✅ Frontend Development  
✅ System Architecture  
✅ Git Version Control  

---

# Future Improvements

- Add advanced financial analytics
- Implement role-based access control
- Add automated  testing
- Improve reporting features
- Add mobile application support

---

# License

This project is for educational and portfolio purposes.
