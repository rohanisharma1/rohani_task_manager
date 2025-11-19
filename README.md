# Task Manager -- MERN Application

A full‑stack Task Manager built using React, Node.js, Express, MongoDB,
and Prisma.\
This app allows users to manage tasks with authentication, CRUD
operations, and drag‑and‑drop reordering.

------------------------------------------------------------------------

## ✨ Features

-   🔐 **User Authentication** (Signup, Login, Logout)
-   📝 **Create, Read, Update, Delete Tasks**
-   🔄 **Drag & Drop Task Reordering**
-   🎨 **React + Tailwind UI**
-   ⚡ **Express REST APIs**
-   🛢️ **MongoDB + Prisma ORM**
-   🔑 **JWT Protected Routes**

------------------------------------------------------------------------

## 📁 Project Structure

    task_manager/
    │── backend/
    │   ├── controllers/
    │   ├── routes/
    │   ├── middlewares/
    │   ├── models/
    │   ├── index.js
    │   ├── .env
    │── frontend/
    │   ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.jsx
    │   ├── main.jsx

------------------------------------------------------------------------

## 🚀 Local Setup Instructions

### 1️⃣ Clone Repository

    git clone https://github.com/yourusername/task_manager.git
    cd task_manager

------------------------------------------------------------------------

## 🖥️ Backend Setup (`/backend`)

    cd backend
    npm install

### Create `.env` file

    PORT=5000
    MONGO_URI=your_mongodb_connection
    JWT_SECRET=your_secret_key

### Run Backend

    npm start

------------------------------------------------------------------------

## 💻 Frontend Setup (`/frontend`)

    cd frontend
    npm install
    npm run dev

------------------------------------------------------------------------

## 📌 API Documentation

### **Auth Routes**

  Method   Endpoint      Description
  -------- ------------- -------------------
  POST     `/signup`     User Signup
  POST     `/register`   User Registration
  POST     `/login`      User Login
  POST     `/logout`     Logout User

------------------------------------------------------------------------

### **Task Routes** *(Protected -- Requires JWT)*

  Method   Endpoint           Description
  -------- ------------------ -------------------
  GET      `/tasks`           Get all tasks
  POST     `/tasks`           Create a new task
  PUT      `/tasks/reorder`   Reorder tasks
  PUT      `/tasks/:id`       Update task
  DELETE   `/tasks/:id`       Delete task

------------------------------------------------------------------------

## ▶️ How to Run Application

### Start Backend

    npm start

### Start Frontend

    npm run dev

------------------------------------------------------------------------

## 📽️ Demo Video

https://raw.githubusercontent.com/rohanisharma1/rohani_task_manager/refs/heads/main/assets/asests

------------------------------------------------------------------------

## 🎉 Thank You

Feel free to fork, improve, and contribute!
