import {Request,Response} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

export const newuser= async(req:Request,res:Response)=>{
    
    const {username,password}= req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const user= await User.findOne({where:{username:username}});

    if(user){
        res.status(400).json({
            msg:`ya existe un usuario con el nombre ${username}`
        });

    }

    try{
        await User.create({
            username:username,
            password:hashedPassword
        })
        return res.json({
            msg:`Usuario ${username} creado exitosamente`
        })

    }catch(error){
        res.status(400).json({
            msg:'Ocurrio un error',
            error
        })

    }
}

export const loginUser=async(req:Request,res:Response)=>{

    const {username,password}= req.body;
    //valdiar existencia del usuario
    const user:any= await User.findOne({where:{username:username}});
    if(!user) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} en la base datos`
        })
   }
    // Validamos password
   const passwordValid = await bcrypt.compare(password, user.password)
   if(!passwordValid) {
    return res.status(400).json({
        msg: `Password Incorrecta`
    })
   }

   // Generamos token
   const token = jwt.sign({
    username: username
   }, process.env.SECRET_KEY || 'pepito123');
   
   res.json(token);

}