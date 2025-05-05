import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/healthcheck', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`ServerTS Server running on port ${PORT}`);
});