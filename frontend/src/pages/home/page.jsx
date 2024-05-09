import { useEffect } from "react"
import notesServices from '../../services/notes'
import Loading from '../loading/page'
import StickyNote from '../../components/stickyNote/stickyNote'
import UserButton from "../../components/userButton/userButton"
import styles from './page.module.css'

export default function Home() {
	const { getNotes, notesLoading, notesList, refetchNotes, updateNote, deleteNote, addNote, uploadImg } = notesServices()

	useEffect(() => {
        if(refetchNotes) {
            getNotes()
        }
    }, [refetchNotes])

	const handleNoteDataChange = (noteData) => {
		if(noteData) {
			updateNote(noteData)
		}
	}

	const handleDeleteNote = (noteId) => {
		if(noteId) {
			deleteNote(noteId)
		} else {
			setNewStickyNoteData(null)
		}
	}

	const handleScreenDblClick = ({ clientX, clientY }) => {
		addNote({
			userId: (JSON.parse(localStorage.getItem('auth'))).user.id,
			positionX: clientX,
			positionY: clientY,
			text: ''
		})
	}

	const handleDropImg = (e) => {
		e.preventDefault()

		uploadImg(e)
	}


    return (
		<>
			{notesLoading && <Loading />}
			<div 
			className={styles.homePageContainer}
			onDoubleClick={handleScreenDblClick}
			onDrop={handleDropImg}
			onDragOver={(e) => { e.preventDefault() }}
			>
				<UserButton />
				{notesList.length > 0 && notesList.map((note) => (
					<StickyNote
					key={note.id}
					noteData={note}
					onClickOutside={handleNoteDataChange}
					onDeleteNote={handleDeleteNote}
					/>
				))}
			</div>
		</>
    )
}