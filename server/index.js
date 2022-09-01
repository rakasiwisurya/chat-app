require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", userRoutes);

mongoose.connect(process.env.MONGO_uRL);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
