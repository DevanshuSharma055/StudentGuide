import { app } from "./app.js";
import dotenv from "dotenv";
import dbConnection from "./DB/db.index.js";

dotenv.config({
  path: "././.env",
});

const port = process.env.PORT || 5050;

dbConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`server starte at ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error at server", error);
  });
