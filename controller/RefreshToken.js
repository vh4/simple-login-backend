import Users from "../model/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => { 
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({message:"unauthorized!"});
        }
        const user = await Users.findOne({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user){return res.status(403).json({message: 'Forbidden!'});}
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => { 
            if (err) { return res.status(401).json({error: err.message}); } 
            const Id = user.id,  name = user.name, emailDB = user.email;
            const accessToken = jwt.sign({Id, name, emailDB}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn:"60s"
            });

            return res.status(200).json({accessToken: accessToken});
        });
    } catch (error) {
        console.log(error)
    }
 }