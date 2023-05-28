import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import heroesRoutes from "./routes/heroesRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/heroes", heroesRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `${`MongoDB Connected.`.green} Server has been started on port ${
          PORT.underline.blue
        }`
      )
    );
  })
  .catch((error) => console.log(`${error}`));
