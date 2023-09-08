import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import {Server} from "http";

const port = config.port || 5000;
let server: Server;
//uncaught exception handle
process.on("uncaughtException", (err) => {
  console.log("uncaught exception", err);
  process.exit(1);
});
//database connection
const db = async () => {
  try {
    await mongoose.connect(config.database_url as string);

    console.log("🚀 Database connected successfully");
    server = app.listen(port, () => {
      console.log(` App listening on port ${port}`);
    });
  } catch (err) {
    console.log("Failed to connect database", err);
  }
  //unhandled rejection handle
  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.log("unhandled rejection", error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};
db();
//signal terminal
process.on("SIGTERM", () => {
  console.log("SIGTERM is recieved");
  if (server) {
    server.close();
  }
});
