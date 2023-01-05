const { sendmsg,getallmsg } =require( "../controllers/messagecontroller");

const router=require('express').Router();


router.post('/sendmsg',sendmsg)
router.post('/getmsg',getallmsg)

module.exports= router; 