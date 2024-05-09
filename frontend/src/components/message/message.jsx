import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export default function Message({ text, success, onHideMessage }) {
    return (
        <Snackbar open={true} autoHideDuration={5000} onClose={onHideMessage} >
            <Alert
            onClose={onHideMessage}
            severity={success ? 'success' : 'error'}
            variant="filled"
            style={{ position: 'fixed', top: '2em', right: '1em', }}
            >
                {text}
            </Alert>
        </Snackbar>
    )
}