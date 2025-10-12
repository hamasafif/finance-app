
# 💰 Finance Manager (React + Node + MySQL)

A modern full-stack **Finance Management Web App** built using **React (Vite)**, **Node.js (Express)**, and **MySQL**.  
Supports **Dark Mode**, **Animated Dashboard**, and **Real-time Transaction Analytics**.

---

## 🚀 Features

- 📊 Dashboard with Animated Statistics
- 💸 Add, Edit, Delete Financial Transactions
- 🧾 Transaction History with Search & Filter
- 📈 Live Bar Chart Financial Report
- 🌗 Dark Mode (Neon Themed)
- 📱 Fully Responsive for Desktop & Mobile

---

## 🛠️ Tech Stack

| Frontend | Backend | Database |
|-----------|----------|-----------|
| React (Vite + TailwindCSS) | Node.js (Express) | MySQL |
| Recharts | dotenv | |
| Axios | CORS | |

---

## ⚙️ Installation (Ubuntu Server)

### 1️⃣ Install Dependencies

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install git nodejs npm mysql-server -y
```

### 2️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/finance-app.git
cd finance-app
```

### 3️⃣ Setup Database

```bash
sudo mysql -u root -p
```

Then execute:

```sql
CREATE DATABASE finance_app;
USE finance_app;

SOURCE ./backend/database.sql;
EXIT;
```

### 4️⃣ Configure Environment Variables

Create a `.env` file inside `backend/` and fill in the following:

```bash
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=finance_app
```

### 5️⃣ Install Packages

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 6️⃣ Run the App (Development Mode)

```bash
npm run dev
```

### 7️⃣ Access Application

- 🌐 Frontend: http://localhost:5173  
- ⚙️ Backend: http://localhost:5000

---

## 🧩 Folder Structure

```
finance-app/
│
├── frontend/         # React + Tailwind Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── index.html
│   └── package.json
│
├── backend/          # Node.js + Express + MySQL
│   ├── routes/
│   ├── server.js
│   ├── db.js
│   ├── database.sql
│   └── package.json
│
└── README.md
```

---

## 🧱 Build for Production

### Frontend Build

```bash
cd frontend
npm run build
```

### Run Backend (Forever with PM2)

```bash
npm install -g pm2
pm2 start backend/server.js --name finance-app
pm2 save
pm2 startup
```

---

## 📦 API Endpoints

| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/api/transactions` | GET | Get all transactions |
| `/api/transactions` | POST | Add a new transaction |
| `/api/transactions/:id` | DELETE | Delete transaction |
| `/api/transactions/:id` | PUT | Update transaction |

---

## 👨‍💻 Author

**Finance Manager** by [Your Name]  
🟢 Modern Fullstack Finance App for Small Business & Personal Use

---

© 2025 Finance Manager. All rights reserved.
