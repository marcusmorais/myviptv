import express from 'express';
import { AppDataSource } from "./config/data-source";
import router from "./routes";

/*
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/healthcheck', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`ServerTS Server running on port ${PORT}`);
});
*/

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use("/api", router);
    
    app.listen(3001, () => {
      console.log("Server running on http://localhost:3001");
    });
  })
  .catch(console.error);