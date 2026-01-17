# 💰 Expense Tracker App<img width="1920" height="1080" alt="screens" src="https://github.com/user-attachments/assets/5dd37cb6-4e40-4b75-a694-714566d95941" />


A full-stack **Expense Tracker Mobile Application** built using **React Native** for the frontend and **Node.js + Express** for the backend.  
This project helps users track their daily expenses, manage spending categories, and maintain financial discipline.

---

## 📱 Project Overview

The Expense Tracker app allows users to:
- Add and manage daily expenses
- Categorize expenses (Food, Travel, Rent, etc.)
- View expense history
- Store data securely using a backend API

This project is designed as a **real-world MERN-style application** with a mobile frontend.

---

## 🚀 Features

### ✅ Frontend (React Native)
- Add new expenses
- Expense category selection
- Expense list view
- Clean and simple UI
- Android & iOS support

### ✅ Backend (Node.js + Express)
- REST APIs for expenses
- User-ready authentication structure
- MongoDB database support
- Secure API architecture

---

## 🛠️ Tech Stack

### Frontend
- React Native
- JavaScript
- Axios
- React Navigation

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication Ready)

---

## 📂 Folder Structure

expense-tracker
├── expense/ # React Native Frontend
│ ├── App.js
│ ├── package.json
│ ├── .gitignore
│ └── src/
│
├── expense-tracker-backend/ # Backend API
│ ├── src/
│ ├── package.json
│ └── .env.example
│
└── README.md


---

## ⚙️ Installation & Setup

### 🔹 Frontend Setup (React Native)

```bash
cd expense
npm install
npx react-native run-android
```
### 🔹 Frontend Setup (React Native)

```bash
cd expense-tracker-backend
npm install
node server.mjs
```
or
```bash
nodemon
```
Create a .env file in expense-tracker-backend:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
