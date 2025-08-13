import { io } from "./app.js";
import dbConnect from "./src/db/dbConfig.js";
import dotenv from "dotenv";
import { server } from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

dbConnect()
  .then(() => {
    server.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port :${process.env.PORT}`);
    });
    server.on("Error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });

    // setTimeout(() => {
    //   console.log("⏱️ Emitting test notification");
    //   io.emit("notification", {
    //     sender: { username: "System" },
    //     message: "Scheduled test message from server",
    //   });
    // }, 5000);
  })
  .catch((error) => {
    console.log("MongoDB coneection Failed", error);
  });
