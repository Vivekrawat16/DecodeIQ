# 🚀 TalentIQ – Real-Time Coding Interview & Collaboration Platform

A full-stack platform for **pair programming**, **live video interviews**, and **collaborative coding** — built with **React, Tailwind, Node.js, Express, MongoDB, Clerk Auth, and Stream Video/Chat SDK**.

---

## 🌟 Features

### 🎥 **Real-Time Video & Chat**

* HD video calls powered by **Stream Video SDK**
* Secure, per-session token generation
* Real-time chat channel for collaboration

### 👨‍💻 **Collaborative Coding Environment**

* Live session workflow (create, join, end)
* Coding problem list + editor-ready layout
* Interviewer/participant-based controls

### 🔐 **Authentication & User Management**

* Clerk for easy, secure login
* Synced with MongoDB for user data
* Protected routes (Dashboard, Sessions)

### 🗂️ **Sessions & Rooms**

* Create interview sessions
* Auto-generate meeting IDs
* Host/participant roles
* End sessions and store history

### 🎨 **Modern UI**

* Responsive UI using **Tailwind + DaisyUI**
* Interactive landing page
* Dashboard + recent sessions
* Clean and intuitive session interface

### 🚀 **Deployment Ready**

* Frontend: **Vercel**
* Backend: **Railway**
* CORS-configured cross-service communication

---

## 🛠️ Tech Stack

### **Frontend**

* React (Vite)
* Tailwind CSS + DaisyUI
* React Router
* Clerk Auth
* Stream Video/Chat SDK

### **Backend**

* Node.js / Express
* MongoDB + Mongoose
* Clerk Webhooks
* Stream Node SDK
* Inngest (optional workflows)

---

## 📁 Folder Structure

```
TalentIQ/
│── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── server.js
│   └── package.json
│
│── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   ├── lib/
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

### **Frontend (.env)**

```
VITE_CLERK_PUBLISHABLE_KEY=your_key
VITE_API_URL=https://your-backend-url.com/api
VITE_STREAM_API_KEY=your_stream_api_key
```

### **Backend (.env)**

```
PORT=3000
MONGO_URI=your_mongodb_uri
CLERK_SECRET_KEY=your_clerk_secret
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_secret
CLIENT_URL=https://your-frontend-url.com
NODE_ENV=production
```

---

## ▶️ Run Locally

### **Backend**

```sh
cd backend
npm install
npm run dev
```

### **Frontend**

```sh
cd frontend
npm install
npm run dev
```

---

## 🔮 Future Enhancements

* Built-in collaborative code editor (Monaco/CodeMirror)
* AI-powered interviewer assistant
* Session recordings and playback
* Shared whiteboard / diagrams

---

## 🙌 Contributing

Pull requests are welcome!
If you're enhancing UI/UX or adding features, open an issue first to discuss direction.
