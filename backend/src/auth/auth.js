import express from "express"
import crypto from 'crypto'
import UsersControllers from "../controllers/users.js"
import jwt from 'jsonwebtoken'
import passport from 'passport'
import LocalStrategy from 'passport-local'

const authRouter = express.Router()
const usersControllers = new UsersControllers()

const myCrypto = (password) => {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16)
        
        crypto.pbkdf2(password, salt, 310000, 16, 'sha256', async (error, hashedPassword) => {
            if (error) {
                reject({ hashError: error })
            } else {
                resolve({ hashedPassword, salt })
            }
        })
    })
}

const myJwtSecret = 'secret'

passport.use(new LocalStrategy(async (username, password, callback) => {
    const user = await (await usersControllers.getUserByUsername(username)).body.user

    if(!user?.username) {
        return callback(null, false)
    }

    crypto.pbkdf2(password, user.salt, 310000, 16, 'sha256', 
    (err, hashedPassword) => {
        if (err) { 
            return callback(err) 
        }
        
        if(!crypto.timingSafeEqual(user.password, hashedPassword)) {
            console.log(hashedPassword)
            return callback(null, false)
        }

        const { password, salt, ...rest } = user
        
        return callback(null, rest)
    })
}))

authRouter.post('/signup', async (req, res) => {

    const checkUser = await usersControllers.getUserByUsername(req.body.username)

    if(checkUser?.body?.user?.username) {
        return res.status(409).send({
            success: false,
            statusCode: 409,
            body: {
                message: 'User already exists',
            }
        })
    }

    const { hashError, hashedPassword, salt } = await myCrypto(req.body.password)
    
    if(hashError) {
        return res.status(500).send({
            success: false,
            statusCode: 500,
            body: {
                message: 'Error during hashing',
                error
            }
        })
    }
    
    const insertUserResult = await usersControllers.addUser({
        username: req.body.username,
        password: hashedPassword,
        salt
    })

    if(insertUserResult.success && insertUserResult.body.username) {
        insertUserResult.body = {
            user: insertUserResult.body,
            token: jwt.sign(insertUserResult.body, myJwtSecret),
            message: 'User registered correctly'
        }
    }
    
    res.send(insertUserResult)
})

authRouter.post('/login', (req, res) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            return res.status(500).send({
                success: false,
                statusCode: 500,
                body: {
                    message: 'Error during authentication!',
                    err
                }
            })
        }
        if (!user) {
            return res.status(401).send({
                success: false,
                statusCode: 401,
                body: {
                    message: 'Email or password is not correct!',
                }
            })
        }
        
        const token = jwt.sign(user, myJwtSecret)
        
        return res.send({
            success: true,
            statusCode: 200,
            body: {
                token,
                user,
                message: 'Login successfully'
            }
        })
        
    })(req, res)
})

export default authRouter