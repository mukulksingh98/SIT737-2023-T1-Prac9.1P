const express = require("express");
const app = express();
const connectDb = require("./mongo/connectDB");
connectDb();

//Init MiddleWare
app.use(express.json({ extended: false }));

const cors = require("cors");

app.use(cors({ origin: true }));
app.use("/db", require("./routes/api/mongo.js"));
app.use("/", require("./routes/api/getToken.js"));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
