import { useState } from "react"
import { useMessage } from "../contexts/useMessage"
import authServices from "./auth"

export default function notesServices () {
    const [notesList, setNotesList] = useState([])
    const [notesLoading, setNotesLoading] = useState(false)
    const { showMessage } = useMessage()
    const [refetchNotes, setRefetchNotes] = useState(true)
    const { logout } = authServices()

    const url = `http://localhost:3000/notes`

    const getNotes = () => {
        setNotesLoading(true)

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `${localStorage.getItem('auth')}`
            }
        })
        .then((resp) => resp.json())
        .then((result) => {
            if (result.success && result.body.notes.length >= 0) {
                setNotesList(result.body.notes)
            } 
            else if(result.body.invalidToken) {
                logout()
            }
            else {
                throw new Error
            }
        })
        .catch(() => {
            useMessage({ text: 'Error to retrieve notes', success: false })
        })
        .finally(() => {
            setRefetchNotes(false)
            setNotesLoading(false)
        })
    }

    const addNote = (noteData) => {
        setNotesLoading(true)
        fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `${localStorage.getItem('auth')}`
            },
            body: JSON.stringify(noteData)
        })
        .then((resp) => resp.json())
        .then((result) => {
            if(!result.success) {
                showMessage({success: result.success, text: result.body.message})
            }
            else if(result.body.invalidToken) {
                logout()
            }
        })
        .catch(() => {
            showMessage({ text: `Failed to update note`, success: false })
        })
        .finally(() => {
            setRefetchNotes(true)
            setNotesLoading(false)
        })
    }

    const updateNote = ({ id, ...noteData }) => {
        setNotesLoading(true)
        fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `${localStorage.getItem('auth')}`
            },
            body: JSON.stringify(noteData)
        })
        .then((resp) => resp.json())
        .then((result) => {
            showMessage({success: result.success, text: result.body.message})
            if(result.body.invalidToken) {
                logout()
            }
        })
        .catch(() => {
            showMessage({ text: `Failed to update note`, success: false })
        })
        .finally(() => {
            setRefetchNotes(true)
            setNotesLoading(false)
        })
    }

    const deleteNote = (noteId) => {
        setNotesLoading(true)
        fetch(`${url}/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `${localStorage.getItem('auth')}`
            },
        })
        .then((resp) => resp.json())
        .then((result) => {
            showMessage({success: result.success, text: result.body.message})
            if(result.body.invalidToken) {
                logout()
            }
        })
        .catch(() => {
            showMessage({ text: `Failed to delete note`, success: false })
        })
        .finally(() => {
            setRefetchNotes(true)
            setNotesLoading(false)
        })
    }

    const uploadImg = (e) => {
        if (e.dataTransfer.files.length > 0) {

            let noteData = {
                positionX: e.clientX,
                positionY: e.clientY,
                userId: (JSON.parse(localStorage.getItem('auth'))).user.id,
                text: '',
            }
    
            const droppedFile = e.dataTransfer.files
            const fileType = (droppedFile[0].type).split('/')[0]
    
            if(fileType === 'image') {
                const reader = new FileReader()
        
                reader.onload = (event) => {
                    const base64Img = event.target.result
                    noteData.img = base64Img
    
                    addNote(noteData)
                }    
                reader.readAsDataURL(droppedFile[0])
            } else {
                showMessage({ success: false, text: 'File type not allowed' })
            }
        }
    }

    return { 
        refetchNotes, 
        updateNote, 
        notesList, 
        notesLoading, 
        getNotes,
        deleteNote,
        addNote,
        uploadImg
    }
}