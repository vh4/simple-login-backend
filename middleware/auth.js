import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) =>{
    const header = req.headers['authorization'];
    const token = header && header.split(" ")[1];

    if(token == null){
        return res.status(401).json({message:"Unauthorized !"}); 
    }

    try { 
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => { 
            if (err) { return res.status(401).json({error: err.message}); } 
            req.user = decode; 
            next();
        });
     } catch (err) { 
        return res.status(500).send({ message: err.message }); }
}