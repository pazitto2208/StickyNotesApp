import { Navigate, Outlet } from "react-router-dom" 
import { MessageProvider } from "./contexts/useMessage"
import { AuthProvider, useAuth } from './contexts/useAuth'

export default function App() {
    return (
        <AuthProvider>
            <MessageProvider>
                <AppContent />
            </MessageProvider>
        </AuthProvider>
    )
}

function AppContent() {
    const { user } = useAuth()

	if(!user) { 
		Navigate({ to: '/auth' })
	}
	
	return ( <Outlet /> )
}