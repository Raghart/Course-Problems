import { Router } from "express";
import { readinglists } from "../models/readinglists.js";
import { tokenExtractor } from "../util/tokenExtractor.js";
import { Users } from "../models/user.js";

const listsRouter = Router();

listsRouter.post('/', async (req, res) => {
    const { blogId, userId } = req.body

    if (!blogId || !userId) {
        return res.status(400).json({ error: "Both blogId and userId are required!" });
    }
    try{
        const readList = await readinglists.create({ blogId, userId });
        res.status(201).json(readList);
    } catch (error) {
        console.error("Error creating list:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

listsRouter.put('/:id', tokenExtractor, async (req, res) => {
    try{
        const { read } = req.body;

        if (typeof read !== 'boolean') {
            return res.status(400).json({ error: "The 'read' field must be a boolean!" });
        };

        const readingListEntry = await readinglists.findByPk(req.params.id);

        if (!readingListEntry) {
            return res.status(400).json({ error: "The 'read' field must be a boolean!" });
        }

        const user = await Users.findByPk(req.decodedToken.id);

        if (!user) {
            return res.status(400).json({ error: "User not found in Token" });
        }

        if (readingListEntry.userId !== user.id) {
            return res.status(400).json({ error: "Only the user who post the book can mark it as 'Read'!" });
        }

        readingListEntry.read = read;
        await readingListEntry.save();
        res.json(readingListEntry);
    } catch (error) {
        res.status(400).json({ error: "Error trying to mark the entry as read" })
    }
})

export default listsRouter;