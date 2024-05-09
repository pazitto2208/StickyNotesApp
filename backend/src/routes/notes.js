import express from 'express'
import NotesControllers from '../controllers/notes.js'

const notesRouter = express.Router()
const notesControllers = new NotesControllers()

notesRouter.get('/', async (req, res) => {
    const { body, success, statusCode } = await notesControllers.getNotes()

    res.status(statusCode).send({ body, success, statusCode })
})

notesRouter.post('/', async (req, res) => {
    const { body, success, statusCode } = await notesControllers.addNote(req.body)

    res.status(statusCode).send({ body, success, statusCode })
})

notesRouter.delete('/:id', async (req, res) => {
    const { body, success, statusCode } = await notesControllers.deleteNote(req.params.id)

    res.status(statusCode).send({ body, success, statusCode })
})

notesRouter.put('/:id', async (req, res) => {
    const { body, success, statusCode } = await notesControllers.updateNote(req.params.id, req.body)

    res.status(statusCode).send({ body, success, statusCode })
})

export default notesRouter 