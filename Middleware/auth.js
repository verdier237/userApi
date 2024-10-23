const jwt = require('jsonwebtoken')
const TOKEN_HASH = 'a35c37cf83b09f5ae7350f9ffa21b298b7a7391b1332a49ca0ff5dd3e32f2381d2ea38d7cabe0d9d2a1dd7ca39b84a25fbdf356da2e0cdd146c1a6ec3538ec80'

exports.protect = (req,res,next)=>{
    try {
        let token = req.headers.authorization 
        if(token === undefined) return res.status(400).send('Not authorized')

        if(!token.startsWith('Bearer')) return res.status(400).send('Not authorized')

        token = token.split(' ')[1]

        const tokenDecoded = jwt.verify(token,TOKEN_HASH)

        req.id = tokenDecoded.id

        next();
        
    } catch (error) {
        return res.status(400).send('Not authorized')
    }
}

