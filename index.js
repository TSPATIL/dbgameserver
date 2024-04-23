const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const connectToMongoDB = require("./config/db");

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

connectToMongoDB(process.env.MONGO_DB_ATLAS_URI);

app.get("/", (req, res) => {
  res.send("This is an educational game based learning website");
});

const port = process.env.PORT;


app.use("/api/auth", require("./routes/authentication"));
app.use("/api/contact", require("./routes/contact"));

app.listen(port, () => {
  console.log("App is listening at http://127.0.0.1:" + port);
});
