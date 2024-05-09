import express from 'express'
import cors from 'cors'
import { config } from 'dotenv' 
import authRouter from './auth/auth.js'
// import usersRouter from './routes/users.js'
import notesRouter from './routes/notes.js'
import { isAuthenticated } from './middlewares/isAuthenticated.js'

config()

async function main () {
    const hostname = 'localhost'
    const port = 3000

    const app = express()
    
    app.use(express.json({ limit: '10mb' }))
    app.use(express.urlencoded({ limit: '10mb', extended: false }))
    app.use(cors())

    app.get('/', (req, res) => {
        res.send({
            success: true, 
            statusCode: 200,
            body: 'Welcome to MyStickyNotes!'
        })
    })

    // routes
    // app.use('/users', usersRouter)
    app.use('/auth', authRouter)
    app.use('/notes', isAuthenticated, notesRouter)
    
    app.listen(port, () => {
        console.log(`Server running on: http://${hostname}:${port}`)
    })
}

main()