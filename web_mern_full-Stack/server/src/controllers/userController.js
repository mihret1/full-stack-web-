import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/userSchema.js'


export const signin=async (req,res)=>{

   const {email,password}=req.body;
   try{
    const existingUser=await User.findOne({email})
    if(!existingUser) return res.status(404).json({mesg:"user doesn't exist"})
    const isPasswordCorrect=await bcrypt.compare(password,existingUser.password)
   if(!isPasswordCorrect) return res.status(400).json({msg:'invalide credential'})
   
    
   const token=jwt.sign(
    {email:existingUser.email, id:existingUser._id},
    'test',
    {expiresIn:"1d"}
    )
    res.status(200).json({result:existingUser,token})

}catch(error){
    res.status(500).json({msg:"something gone wrong"})

   }


}



export const  signup=async(req,res)=>{
    const {email,password,confrimPassword,firstName,lastName}=req.body

    try{
        const existingUser=await User.findOne({email})
        if(existingUser) return res.status(400).json({msg:'user already eregister'})
        if (password !== confrimPassword) return res.status(400).json({msg:'password not the same'})
        const hashedPassword=await bcrypt.hash(password,12)
        const result =await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`})
      
        const token=jwt.sign(
         {email:result.email, id:result._id},
         'test',
         {expiresIn:"1d"}
         )

         res.status(201).json({result,token})

     }catch(error){
        res.status(500).json({msg:"something gone wrong"})


     }







}
