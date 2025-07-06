# 🌸 Anime Info Explorer

A beautiful and responsive web application that lets users **search anime titles**, **view detailed info**, and **save favorites to a personal watchlist** using data from the **Jikan API** (MyAnimeList).

---

## 🎯 Features

- 🔍 Search anime by name  
- 📋 Display list of matching results  
- 📖 View detailed info (image, synopsis, episodes, rating, etc.)  
- ❤️ Add anime to your PostgreSQL-powered Watchlist  
- 🗑️ Remove anime from your Watchlist  
- 🎨 Stylish glassmorphism UI with responsive design

---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express.js  
- **Frontend**: EJS, CSS  
- **Database**: PostgreSQL  
- **API**: [Jikan API](https://jikan.moe/) for anime data  
- **UI**: Pure CSS with modern glassmorphism and gradients

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/anime-info-app.git
cd anime-info-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create PostgreSQL database

```sql
CREATE DATABASE anime;

CREATE TABLE watchlist (
  mal_id INT PRIMARY KEY,
  title TEXT,
  image_url TEXT,
  episodes INT,
  rating FLOAT,
  url TEXT
);
```

### 4. Update DB credentials in `index.js`

```js
const db = new pg.Client({
  user: "your_pg_user",
  host: "localhost",
  database: "anime",
  password: "your_pg_password",
  port: 5432,
});
```

### 5. Start the app

```bash
node index.js
```

Visit 👉 [http://localhost:3000](http://localhost:3000)

---

## 📂 Folder Structure

```
├── public/              # Static files (style.css)
├── views/               # EJS templates
│   ├── index.ejs        # Home + Anime Info view
│   ├── result.ejs       # (Unused/alt view)
│   └── watchlist.ejs    # Wishlist view (generated dynamically)
├── index.js             # Express server & routes
├── package.json
```

---

## 📄 License

This project is open-source and intended for educational/demo use.
