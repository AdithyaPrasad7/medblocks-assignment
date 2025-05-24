# 🏥 Patient Registration App

A frontend-only patient registration system built using **React**, **PgLite**, and **Material-UI**, designed for modern browsers with **multi-tab synchronization** and **persistent local SQL storage**.

---

## 📦 Tech Stack

- ⚡ **Vite** – Lightning-fast build tool
- ⚛️ **React** – UI library for building interactive interfaces
- 🎨 **Material-UI (MUI)** – Component library for clean and responsive design
- 📝 **Formik** – Seamless form state management
- 🧠 **PgLite** – In-browser SQLite-compatible database
- 📢 **BroadcastChannel API** – Enables real-time data sync across browser tabs

---

## ✨ Features

- Register new patients using Formik-based forms
- View patient records stored locally in the browser using PgLite
- Query data using raw SQL (powered by PgLite)
- Multi-tab data synchronization via `BroadcastChannel`
- Patient data persists across browser refreshes
- Download the data to CSV
- Add initial dummy data
- Fast and lightweight frontend-only implementation
- Client-side routing handled via react-router-dom

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/patient-registration-app.git
cd patient-registration-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

---

## Note

Initial security key is `123`.

Can be changed in `.env`

---

## 🌐 Live Demo

The app is deployed and publicly accessible on Netlify:

👉 [Open Live App](https://683083546cd7cee6258dea3d--soft-croquembouche-medblocks.netlify.app/)

Security key is `123`

---
