import { app } from "./app.js";
import dbConnect from "./src/db/dbConfig.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;

dbConnect()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port :${process.env.PORT}`);
    });
    app.on("Error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });
  })
  .catch((error) => {
    console.log("MongoDB coneection Failed", error);
  });
