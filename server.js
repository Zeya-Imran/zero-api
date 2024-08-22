import app from "./src/app.js";
import connectDb from "./src/config/db.js";

const createServer = async () => {
  const port = process.env.PORT || 8080;

  await connectDb();

  app.listen(port, () => {
    console.log(`Server Listening on the port ${port}`);
  });
};

createServer();
