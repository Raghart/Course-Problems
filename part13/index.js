import express from 'express';
import { PORT } from './util/config.js';
import 'express-async-errors';
import './models/index.js';
import { connectToDatabase } from './util/db.js';
import blogsRouter from './controllers/blogs.js';
import loginRouter from './controllers/login.js';
import userRouter from './controllers/users.js';
import authorsRouter from './controllers/authors.js';
import listsRouter from './controllers/readinglists.js';
import logoutRouter from './controllers/logout.js';
import { runMigrations } from './util/migrations.js';

const app = express()
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists", listsRouter);

app.use((error, req, res, next) => {
    console.error(error.message);
    if (error.name === "SequelizeValidationError") {
        const messages = error.errors.map(err => err.message)
        return res.status(400).json({ error: messages });
    };

    if (error.name === 'ValidationError') {
        return res.status(error.statusCode).json({ error: error.message });
    };

    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: 'Datos invalidos' });
    }

    res.status(500).json({ error: 'Error interno del servidor' });
});

const start = async () => {
    await connectToDatabase()
    await runMigrations();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
};

start();