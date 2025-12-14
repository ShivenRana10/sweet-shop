# 🍬 Sweet Shop Management System

A full-stack **Sweet Shop Management System** built using **Node.js, Express, MongoDB, JWT authentication, Jest (TDD)** and a **React frontend**.

This project demonstrates real-world backend engineering practices including authentication, role-based access control, inventory management, database integration, automated testing, and a working frontend UI.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User registration and login
* JWT-based authentication
* Role-based access control (Admin vs User)

### 🍭 Sweet Management

* Add new sweets (Admin only)
* View all sweets (Public)
* Purchase sweets (Authenticated users)
* Restock sweets (Admin only)
* Prevent purchase when out of stock

### 🧪 Testing (TDD)

* Test-Driven Development using **Jest** and **Supertest**
* In-memory MongoDB using **mongodb-memory-server** for fast, isolated tests
* All critical business logic covered by tests

### 🗄️ Database

* MongoDB with Mongoose
* Separate test and development databases

### 🎨 Frontend

* Simple React UI
* Login
* View sweets
* Purchase sweets
* Admin can add sweets

---

## 🛠️ Tech Stack

**Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (jsonwebtoken)
* bcryptjs
* dotenv
* cors

**Testing**

* Jest
* Supertest
* mongodb-memory-server

**Frontend**

* React (Create React App)

---

## 📂 Project Structure

```
sweet-shop/
├─ backend/
│  ├─ src/
│  │  ├─ routes/
│  │  ├─ middleware/
│  │  ├─ models/
│  │  ├─ config/
│  │  └─ app.js
│  ├─ tests/
│  ├─ index.js
│  ├─ package.json
│  └─ .env
├─ frontend/
│  └─ src/
└─ README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd sweet-shop
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```
MONGO_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=secret
```

Start backend server:

```bash
node index.js
```

Backend runs on:

```
http://localhost:3000
```

---

### 3️⃣ Run Backend Tests

```bash
npm test
```

✅ All tests should pass.

---

### 4️⃣ Frontend Setup

```bash
cd ../frontend
npm install
set PORT=3001 && npm start
```

Frontend runs on:

```
http://localhost:3001
```

---

## 🔑 API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Sweets

* `GET /api/sweets`
* `POST /api/sweets` (Admin)
* `POST /api/sweets/:id/purchase`
* `POST /api/sweets/:id/restock` (Admin)

---

## 🧪 Testing Strategy

* Tests are written **before** implementation (TDD)
* Uses **mongodb-memory-server** for database isolation
* Database is cleaned after each test
* Tests run sequentially using `jest --runInBand`

---

## 🤖 AI Usage Declaration

AI tools (such as ChatGPT) were used **only as an assistance tool** for:

* Understanding error messages and debugging issues
* Structuring backend logic and test cases
* Improving code organization and best practices

All code was:

* Reviewed and understood by me
* Manually written and tested
* Verified using automated tests

Final implementation decisions and integration were done independently.

---

## ✅ Project Status

* ✔ Backend complete
* ✔ MongoDB integrated
* ✔ Authentication & roles implemented
* ✔ Inventory management working
* ✔ Automated tests passing
* ✔ Frontend UI functional

---

## 📌 Conclusion

This project demonstrates a complete, production-style full-stack application using modern backend development practices and testing methodologies.

---

**Author:** Shiven Rana
