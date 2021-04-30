const express = require('express');
const mongoose = require('mongoose');

const app = express();

//Body Parser Middleware
app.use(express.json());

//DB config
const db = 'mongodb://localhost:27017/items';

//Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log('MongoDB connected ...'))
    .catch(err => console.log(err));

//Use routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on PORT ${port}`));