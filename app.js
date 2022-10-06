const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})
