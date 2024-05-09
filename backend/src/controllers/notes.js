import { ok, serverError } from "../helpers/httpResponses.js"
import NotesDataAccess from "../dataAccess/notes.js"
import { v4 as uuidv4 } from 'uuid'

export default class NotesControllers {
    constructor() {
        this.dataAccess = new NotesDataAccess()
    }

    async getNotes() {
        try {
            const notes = await this.dataAccess.getNotes()

            return ok({ notes, message: 'Notes retrieved successfully' })
        } catch (error) {
            return serverError({ error, message: 'Failed to retrieve notes' })
        }
    }

    async addNote({ text, userId, positionX, positionY, img }) {
        try {
            const id = uuidv4()
            const note = await this.dataAccess.addNote({ 
                id,
                text,
                userId,
                positionX,
                positionY, 
                img
            })

            return ok({ note, message: 'Note inserted correctly' })
        } catch (error) {
            return serverError({ error, message: 'Failed to insert note' })
        }
    }

    async deleteNote(noteId) {
        try {
            const result = await this.dataAccess.deleteNote(noteId)

            return ok({ result, message: 'Note deleted correctly' })
        } catch (error) {
            return serverError({ error, message: 'Failed to delete note' })
        }
    }

    async updateNote(noteId,noteData) {
        try {
            const result = await this.dataAccess.updateNote(noteId,noteData)

            return ok({ result, message: 'Note updated correctly' })
        } catch (error) {
            return serverError({ error, message: 'Failed to update note' })
        }
    }
    
}