import mySqliteDb from "../database/database.js"

export default class NotesDataAccess {
    constructor() {
        this.db = mySqliteDb
    }

    async getNotes() {
        return new Promise((resolve, reject) => {
            this.db.all(`        
            SELECT notes.*, users.username
            FROM notes
            INNER JOIN users 
            ON notes.userId = users.id; 
            `, 
            (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    async addNote({id,text,userId,positionX,positionY,img}) {
        return new Promise((resolve, reject) => {
            this.db.run(`
            INSERT INTO notes (id, text, userId, positionX, positionY, img) 
            VALUES (?,?,?,?,?,?)
            `, 
            [
                id.toString(),
                text, 
                userId,
                positionX, 
                positionY,
                img
            ],
            (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({ id, text, userId, positionX, positionY, img })
                }
            })
        })
    }

    async deleteNote(noteId) {
        return new Promise((resolve, reject) => {
            this.db.run(`
            DELETE FROM notes 
            WHERE id = ?
            `, 
            [ noteId ],
            (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({ noteId })
                }
            })
        })
    }

    async updateNote(noteId, noteData) {
        const fieldsToUpdate = Object.keys(noteData).map((key) => {
            return `${key} = ?`
        })

        const values = Object.values(noteData)
        values.push(noteId)

        return new Promise((resolve, reject) => {
            this.db.run(`
            UPDATE notes 
            SET ${fieldsToUpdate.toString()}
            WHERE id = ?
            `, 
            values,
            (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({ noteId })
                }
            })
        })
    }
}