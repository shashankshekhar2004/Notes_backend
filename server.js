require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const noteRouter = require('./routes/noteRouter');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/api/notes', noteRouter);

app.get('/', (req, res) => {
    res.json("Hello everyone, this is my notes app");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const URI = process.env.MONGO_URL;
mongoose.connect(URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB", err);
    });
