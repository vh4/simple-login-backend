import Users from "../model/UserModel.js";
import argon2 from "argon2"
import jwt from "jsonwebtoken"

export const getUsers = async (req, res) => { 
    try {
        const users = await Users.findAll(); 
        return res.status(200).json({message:"success", data:users});
    } catch (error) {
        console.log(error);
    }
 }

 export const RegisterUsers = async (req, res) => { 
    
    const {name, email, password, confirmPassword} = req.body;

    if(password !== confirmPassword){return res.status(400).json({message:"password and conform password not valid brooo!"})}
    
    //const hashPassword = await argon2.hash(password);
    
    try {
        // await Users.create({
        //     name:name,
        //     email:email,
        //     password:hashPassword,
        // });

        return res.status(201).json({message: "Users created successfully"});
        
    } catch (error) {
        console.log(error);
    }
  }

  export const Login = async (req, res) => {
        
        const {email, password} = req.body;
        try {
            const user = await Users.findOne({
                where:{
                    email: email
                }
            });
            if(!user){return res.status(400).json({message:"User not found!"})}
            const match = await argon2.verify(user.password, password);
            if(!match){return res.status(400).json({message:"Email or password incorrect"})}

            const Id = user.id,  name = user.name, emailDB = user.email;
            const accessToken = jwt.sign({Id, name, emailDB}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '60s'
            });

            const refreshToken = jwt.sign({Id, name, emailDB}, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '1d'
            });

            await Users.update({refresh_token: refreshToken}, {
                where:{
                    id: Id
                }
            });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 1000
                //secure: true
            });

            return res.status(200).json({accessToken});

        } catch (error) {
            console.log(error);
            return res.status(500).json({message:"Server Error!"});
        }
   }


export const Logout = async (req, res) => { 
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
        return res.status(401).json({message:"unauthorized!"});
    }
    const user = await Users.findOne({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user){return res.status(403).json({message: 'Forbidden!'});}

    await Users.update({refresh_token:null}, {
        where:{
            id: user.id
        }
    });

    res.clearCookie("refreshToken");
    return res.status(200).json({message:"Logout successfully!"});


 }