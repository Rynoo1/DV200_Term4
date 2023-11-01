const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Route Uses
const questionRoute = require('./routes/question');
const userRoute = require('./routes/users');
const likeRoute = require('./routes/likes');
const authRoute = require('./routes/auth');
// const answerRoute = require('./routes/answer');

require('dotenv/config')

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// app.use(cors({
//     origin: 'http://localhost:3000'
// }));

// TODO Allows you to access images in the public folder
//app.use(express.static(path.join(__dirname, 'images')));

//Middleware
app.use(express.static('images'));
app.use('/images', express.static('images'));
app.use(express.static('userImages'));
app.use('/userImages', express.static('userImages'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Must be below the express
app.use(questionRoute);
app.use(userRoute);
app.use(likeRoute);
app.use(authRoute);
// app.use(answerRoute);

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Serve the React app's 'index.html' for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'DV200T4', //Collection Name
}).then(() => console.log("Connected to OpenDev Database"))
    .catch((err) => {
        console.log("No Connection. Reason: " + err);
    });

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => { console.log(`Server has started at port: ${PORT}`) });