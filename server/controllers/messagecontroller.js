const Message=require('../usermodel/messagemodel')

module.exports.sendmsg =async (req,res,next) => {
    try{
       
        const {from,to,msg}=req.body;
        const data= await Message.create({
            message:{text:msg},
            user:[from,to],
            sender:from
    });
    if(data){
        return res.json({msg:"sucessful"})
    }
    return res.json({msg:'failed'})
    }
    catch(err){
        next(err)
    }
}
module.exports.getallmsg =async (req,res,next) => {
    try{
        const {from,to}=req.body;
        console.log(req.body);
        
        const message=await Message.find({
            user:{
                $all:[from,to],
            },
        }).sort({updatedAt:1});
        
        const projectedmsg=message.map((msg)=>{
            return{
                fromself:msg.sender.toString()===from,
                message:msg.message.text
            }
        })
        
        
        res.json(projectedmsg)
    }
    catch(err){

      next(err)
    }
    
}