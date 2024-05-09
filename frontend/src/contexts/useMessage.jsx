import { createContext, useContext, useState } from 'react'
import Message from '../components/message/message'

const MessageContext = createContext()

export const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState(null)

    const showMessage = ({ text, success }) => {
        setMessage({ text, success })
    }

    const handleHideMessage = () => {
        setMessage(null)
    }

    return (
        <MessageContext.Provider value={{ showMessage, handleHideMessage }}>
            {message !== null && (
                <Message
                onHideMessage={handleHideMessage}
                text={message.text}
                success={message.success}
                />
            )}
            {children}
        </MessageContext.Provider>
    )
}

export const useMessage = () => {
    const context = useContext(MessageContext)
    if (!context) {
        throw new Error('useMessage must be used within a MessageProvider')
    }
    return context
}