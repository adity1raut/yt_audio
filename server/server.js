const express = require('express');
const cors = require('cors');
const downloadRoutes = require('./route/downloadRoutes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 5000 || process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/', downloadRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});