import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route to save a new Book
router.post("/", async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'All fields are required'
            });
        }

        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        });

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: error.message
        });
    }
});

// Route to get all Books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: error.message
        });
    }
});

// Route to get a single Book
router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: error.message
        });
    }
});

// Route to update a Book
router.put("/:id", async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'All fields are required'
            });
        }

        let { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).send({
                message: 'Book not found'
            });
        }

        return res.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: error.message
        });
    }
});

// Route to delete a Book
router.delete("/:id", async (req, res) => {
    try {
        let { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({
                message: 'Book not found'
            });
        }

        return res.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: error.message
        });
    }
});

export default router;
