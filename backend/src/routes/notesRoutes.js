import express from "express"
import {getAllNotes, createNote, updateNote, deleteNote, getNoteById} from "../controllers/notesController.js"

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router


// [1] simple setup of API
// import express from "express"

// const router = express.Router();

// router.get("/", (req,res) => {
//     res.status(200).send("Note fetched succesfully!");
// });

// router.post("/", (req, res) => {
//     res.status(201).send({message: "Note created successfully!"})
// });

// router.put("/:id", (req, res) => {
//     res.status(200).json({message: "Note updated successfully!"})
// });

// router.delete("/:id", (req, res) => {
//     res.status(200).json({message: "Note deleted successfully!"})
// });

// export default router
