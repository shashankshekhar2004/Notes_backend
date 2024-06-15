const Notes = require('../models/noteModel');

const noteCtrl = {
    getNotes: async (req, res) => {
        try {
            const notes = await Notes.find({ user_id: req.user.id });
            res.json(notes);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    createNote: async (req, res) => {
        try {
            const { title, content, date } = req.body;
            const newNote = new Notes({
                title,
                content,
                date,
                user_id: req.user.id,
                name: req.user.name
            });
            await newNote.save(); // saves to MongoDB
            res.json({ msg: "Created a NOTE" });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    deleteNote: async(req, res) =>{
        try {
            await Notes.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateNote: async (req, res) => {
        try {
            const { title, content, date } = req.body;
            await Notes.findByIdAndUpdate({ _id: req.params.id }, {
                title,
                content,
                date
            });
            res.json({ msg: "Updated a note" });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getNote: async (req, res) => {
        try {
            const note = await Notes.findById(req.params.id);
            res.json(note);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
};

module.exports = noteCtrl;
