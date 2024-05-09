import { useEffect, useState } from "react"
import styles from './stickyNote.module.css'
import { TextField } from "@mui/material"
import { LuTrash, LuMove } from 'react-icons/lu'
import PaintButton from "../paintButton/paintButton"

export default function StickyNote({ noteData, onClickOutside, onDeleteNote }) {
    const [updatedNoteData, setUpdatedNoteData] = useState()

    const handleDragEnd = ({ clientX, clientY }) => {
        setUpdatedNoteData({
            ...updatedNoteData,
            id: noteData.id,
            positionX: clientX,
            positionY: clientY,
        })
    }
    
    const handleTextChange = (e) => {
        if(e.target.value !== noteData.text) {
            setUpdatedNoteData({
                ...updatedNoteData,
                id: noteData.id,
                text: e.target.value,
            })
        }
    }

    const handleColorChange = (newColor) => {
        if(newColor !== noteData.color) {
            setUpdatedNoteData({
                ...updatedNoteData,
                id: noteData.id,
                color: newColor,
            })
        }
    }

    useEffect(() => {
        onClickOutside(updatedNoteData)
    }, [updatedNoteData])

    return (
        <div
        draggable
        onDragEnd={handleDragEnd}
        className={styles.stickyNoteContainer}
        style={{ 
            left: noteData.positionX, 
            top: noteData.positionY,
        }}
        >
            <div
            className={styles.stickyNoteHeader}
            >
                <LuMove 
                className={styles.moveBtn}
                />
                <p className={styles.username}>User: {noteData.username}</p>
                <div>            
                    <PaintButton 
                    onColorChange={handleColorChange}
                    />
                    <LuTrash 
                    className={styles.deleteBtn}
                    onClick={() => { onDeleteNote(noteData.id) } }
                    />
                </div>
            </div>
            <div
            style={{ backgroundColor: noteData.color }}
            className={styles.stickyNote}
            >
                {noteData.img && 
                    <img src={noteData.img} alt="Note image" />
                }
                <TextField
                size="small"
                required
                name='text'
                multiline
                onBlur={handleTextChange}
                defaultValue={noteData.text}
                />
            </div>
        </div>
    )
}