const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB database connection established successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

const toolRoutes = require('./routes/tool.routes');

app.use('/api/tools', toolRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
