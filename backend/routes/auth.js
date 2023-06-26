const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'Pranav@003'

// ROUTE 1
//creating a user no login required
// POST : localhost:5000/api/auth/createuser

 router.post('/createuser',
 [
    body('email','Enter a valid email').isEmail(),
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('password','Enter a valid password').isLength({ min: 5 }),
 ]
 ,async (req,res)=>{
     //if there are errors return error message.

     let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     //   success = false;
      return res.status(400).json({ success,errors: errors.array() });
    }

    //check whether user with same email exists 
    try{
    let user = await User.findOne({email : req.body.email})
    if(user){
      //  success = false;
        return res.status(400).json({success,error : "User with same email exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);

    user = await 
    User.create({
        name: req.body.name,
        password: secPass,
        email : req.body.email
      });
      const data = {
          user : {
              id : user.id
          }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
     success = true;
      res.json({success,authToken});

      }
    catch(err){
        console.log(err);
        res.status(500).send("Internal server error")
    }
 });

 // ROUTE 2
 //authenticate a user, no login required
 //POST : localhost:5000/api/auth/login

 router.post('/login',
 [
    body('email','Enter a valid email').isEmail(),
    body('password','Cannot be blank').exists()
 ],
  
 async (req,res)=>{
    //if there are errors return error message.
    let success = false;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   const {email,password} = req.body;
   try {
        let user = await User.findOne({email});
        if(!user)
        {
            success = false;
            res.status(400).json({error : "Please try to login with correct credentitals"});
        }

        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare)
        {
            success = false;
            res.status(400).json({success,error : "Please try to login with correct credentitals"});   
        }
        const data = {
            user : {
                id : user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        success = true;
        res.json({success,authToken});


   } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
   }


});

// ROUTE 3
// get logged in user details, login required
// POST : localhost:5000/api/auth/getuser

router.post('/getuser',fetchuser,
 
 async (req,res)=>{
try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
} 

catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
   }});

 module.exports = router