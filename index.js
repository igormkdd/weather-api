import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import authRoute from "./routes/auth.js";
import sensorRoute from "./routes/sensors.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/user", authRoute);
app.use("/api/sensors", sensorRoute);

app.get("/api", (req, res) => res.send("Weather REST API"));

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to DB");
    }
);

// Run the app
app.listen(process.env.PORT, () =>
    console.log(`Server is running on port: ${process.env.PORT}`)
);
