const user =require('../usermodel/user');

module.exports.register= async (req,res,next)=>{
  try{
    const {username,email,password} = req.body
    const usernamecheck= await user.findOne({username})
    if (usernamecheck){
       return res.json({msg:'Username already taken',status:false})  
    }
    const emailcheck= await user.findOne({email})
    if(emailcheck){
        return res.json({msg:'Email already taken',status:false})    

    }
   const User=user.create({
    username,
    email,
    password
   })
  
   return res.json({status:true,User})
  }
  catch(e){
    next(e);
  }

}

module.exports.login= async (req,res,next)=>{
    try{
        const {username,password} = req.body
    const userlogin= await user.findOne({username})
    if (!userlogin){
       return res.json({msg:'Invalid username',status:false})  
    }
    if(userlogin.password!==password){
        return res.json({msg:'Invalid password',status:false})    

    }
   
   return res.json({status:true,userlogin})
    }
    catch(e){
        next(e);
    }

}

module.exports.avatar=async (req,res,next) => {
   try{
    const id=req.body.id;
    const avathar=req.body.image;
    const userdata= await user.findByIdAndUpdate(id,{
        isavatharset:true,
        avathar,
    })
    

    return res.json({
        isset:userdata.isavatharset,
        image:userdata.avathar
    }
    )
   }
   catch(e){
    next(e)
   }
}

module.exports.alluser =async (req,res,next) => {    
    const users =await user.find({_id:{$ne:req.params.id}}).select([
        "username",
        "_id",
        "email",
        "avathar"
    ])

    return res.json(users)
}