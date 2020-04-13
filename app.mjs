import express from 'express';

import routes from './routes/index.mjs';

const PORT = 4000;

const app = express();

app.use(routes);
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
