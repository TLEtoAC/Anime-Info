import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import pg from "pg";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "anime",
  password: "Sagar@123",
  port: 5432,
});
db.connect();
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/",async(req,res)=>{
    const animename=req.body["query"];
    const response=await axios.get(`https://api.jikan.moe/v4/anime?q=${animename}`);
    res.render("index.ejs",{results:response.data.data});
})

app.get("/anime/:id", async (req, res) => {
    const id = req.params.id;
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
    res.render("index.ejs", { anime: response.data.data });
});

app.post("/watchlist", async(req, res) => {
    const animeid = req.body["id"];
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeid}`);
    let anime = response.data.data;
    const simplified = {
      mal_id: anime.mal_id,
      title: anime.title,
      image_url: anime.images.jpg.image_url,
      episodes: anime.episodes,
      rating: anime.score,
        url: anime.url,
    };
await db.query(
      `INSERT INTO watchlist 
          (mal_id, title, image_url, episodes, rating, url) 
         VALUES ($1, $2, $3, $4, $5, $6)`, [simplified.mal_id,simplified.title,simplified.image_url,simplified.episodes,simplified.rating,simplified.url]);
    const result = await db.query("SELECT * FROM watchlist");
    console.log(result.rows);
    res.render("watchlist.ejs", {
       watchlist: result.rows
    })
});
app.get('/watchlist', async (req, res) => {
    const result = await db.query("SELECT * FROM watchlist");
    console.log(result.rows);
    res.render("watchlist.ejs", {
      watchlist: result.rows,
    });
});
app.post("/delete-anime", async (req, res) => {
  const animeid = req.body["id"];
  await db.query("DELETE FROM watchlist WHERE mal_id = $1", [animeid]);
  res.redirect("/watchlist");
});


app.listen(3000, (err) => {
    if (err) {
        console.error(err);
    }
    console.log("Server is running on port 3000");
    console.log("http://localhost:3000");
});