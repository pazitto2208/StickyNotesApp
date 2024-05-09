import jwt from 'jsonwebtoken'

export const isAuthenticated = (req, res, next) => {
    if(!req.headers.authorization.token) {
        return res.status(401).send({
            success: false,
            statusCode: 401,
            body: {
                text: 'No token provided',
            }
        })
    }
    
    const { token, user } = JSON.parse(req.headers.authorization)
    
    if (!token) {
        return res.status(401).send({
            success: false,
            statusCode: 401,
            body: {
                text: 'No token provided',
            }
        })
    }

    jwt.verify(token, 'secret', async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                success: false,
                statusCode: 401,
                body: {
                    err,
                    text: 'Invalid token',
                    invalidToken: true
                }
            })
        }

        req.user = decoded

        if(!req.user.id) {
            return res.status(401).send({
                success: false,
                statusCode: 401,
                body: {
                    text: 'Invalid token',
                    invalidToken: true
                }
            }) 
        }   

        if(req.user.id !== user.id) {
            return res.status(401).send({
                success: false,
                statusCode: 401,
                body: {
                    text: 'Invalid token',
                    invalidToken: true
                }
            }) 
        }

        next()   
    })
}
