import "dotenv/config";
import express from "express";

// Constants
const SERVER_PORT = process.env.SERVER_PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send({ response: "Hello World!" });
});

app.all("*", (req, res) => {
    res.status(400).send('Bad Request');
});

app.listen(SERVER_PORT, () => {
  console.log("Server started on port:", SERVER_PORT);
});
