import express from 'express';
import { AppDataSource } from "./config/data-source";
import router from "./routes";
import { setupSwagger } from './config/swagger';
import { testConnection } from "./config/test-connection";
import { errorHandler } from './core/middlewares/error-handler';


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

testConnection();
AppDataSource.initialize()
  .then(() => {
    const app = express();
    setupSwagger(app); 
    app.use(express.json());
    app.use("/api", router);
    app.listen(3001, () => {
      console.log("Server running on http://localhost:3001");
    });
    app.use(errorHandler);
  })
  .catch(console.error);


  