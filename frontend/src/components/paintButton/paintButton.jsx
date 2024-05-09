import { LuPaintbrush } from "react-icons/lu"
import styles from './paintButton.module.css'
import { Menu, MenuItem } from "@mui/material"
import { useState } from "react"

export default function PaintButton({ onColorChange }) {
    const [anchorEl, setAnchorEl] = useState(null)    
	
    const open = Boolean(anchorEl)
	
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleChangeColor = (color) => {
        onColorChange(color)
        handleClose()
    }

    const stickyNotesColors = [ '#ffcaca', '#ffedca', '#caffd0', '#cae3ff', '#f5caff' ]

    return (
        <>
            <LuPaintbrush 
            className={styles.paintButtonContainer}
            onClick={handleClick}
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
                {stickyNotesColors.map((color) => (
                    <MenuItem 
                    key={color}
                    onClick={() => { handleChangeColor(color) }}
                    style={{ background: color }}
                    >
                        {color}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}