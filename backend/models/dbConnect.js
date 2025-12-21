const mongoose = require('mongoose');

const DB = process.env.DB_URL;
console.log('DB--', DB);
mongoose
    .connect(DB)
    .then(() => {
        console.log('MONGO DB CONNECTED');
    })
    .catch((err) => {
        console.log('DB CONNECTION FAILED');
        console.log('ERR: ', err);
    });