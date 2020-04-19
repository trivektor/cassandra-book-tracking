import express from 'express';

import routes from './routes/index.mjs';

const PORT = 5000;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
