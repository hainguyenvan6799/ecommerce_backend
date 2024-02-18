const Note = require("../models/Note");

const testController = {
  getAllNotes: async (req, res) => {
    Note.find({}).then((notes) => res.json(notes));
  },
  getNote: async (req, res, next) => {
    const { id } = req.params;
    Note.findById(id)
      .then((note) => {
        if (note) {
          res.json(note);
        } else {
          //null
          res.status(404).end();
        }
      })
      .catch((error) => next(error));
  },

  createANewNote: async (req, res, next) => {
    const { content, important } = req.body;
    const note = new Note({
      content,
      important,
      date: new Date(),
    });

    note
      .save()
      .then((savedNote) => {
        res.json(savedNote);
      })
      .catch((error) => next(error));
  },
  deleteNote: async (req, res, next) => {
    const { id } = req.params;
    Note.findByIdAndRemove(id)
      .then(() => {
        res.status(204).end();
      })
      .catch((error) => next(error));
  },

  updateNote: async (req, res, next) => {
    const { content, important } = req.body;

    const note = {
      content,
      important,
    };

    Note.findByIdAndUpdate(id, note, { new: true })
      .then((updatedNote) => {
        res.json(updatedNote);
      })
      .catch((error) => next(error));
  },
};

module.exports = testController;
