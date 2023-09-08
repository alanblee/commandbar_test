import server from "./api/server.js";
import connectDB from "./mongodb/connect.js";

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    server.listen(PORT, () => {
      console.log(`\n=== Server listening on port ${PORT} ===\n`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
