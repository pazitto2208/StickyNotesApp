import { LuUser, LuLogOut } from "react-icons/lu"
import { Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import styles from './userButton.module.css'
import authServices from "../../services/auth"
import { useAuth } from "../../contexts/useAuth"

export default function UserButton() {
    const [anchorEl, setAnchorEl] = useState(null)    
    const { logout } = authServices()
    const { user } = useAuth()
	
    const open = Boolean(anchorEl)
	
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }


    return (
        <>
            <LuUser 
            onClick={handleClick}
            className={styles.userButtonContainer}
            />
            <Menu
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            >
                <p className={styles.username}>User: {user?.username}</p>
                <MenuItem onClick={() => { logout() }}><LuLogOut /> Logout</MenuItem>
            </Menu>
        </>
    )
}