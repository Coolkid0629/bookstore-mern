import express from 'express';
import mongoose from 'mongoose';
import {
    Book
} from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT;
const mongoDBURL = process.env.MONGODB_URL;

// Middleware to handle CORS policy
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }))

// Middleware to parse JSON
app.use(express.json());

// Middleware to use the routers
app.use("/books", booksRoute);

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Hello World');
});

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    }).catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });
