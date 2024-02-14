const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jobbyUserData = require('../models/jobbyUsers');
const jwtAuth = require("../middleware/jwtAuth");

//used to handle the routes of nodejs project
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("this is authenticaticon routes");
});

// signup api
router.post("/signup", async(req, res)=>{
    try {
      //console.log(req.body);
      const {name, email, phoneNumber, gender, password} = req.body;
      // if user is found it will retrieve user details or else will return empty value
      const isExist = await jobbyUserData.findOne({ email: req.body.email });
      //console.log(isExist)
      if (!isExist) {
        const hashedPassword = await bcrypt.hash(password, 10)  // it will generate a encrypted password
        const user = new jobbyUserData({
          name: req.body.name,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          gender: req.body.gender,
          password: hashedPassword,
        });
        user.save();
        return res.status(200).json({ message: "Registration success" });
      } else {
        return res.status(400).json({ message: "User already registered" });
      }
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: "Internal server error" });
    }
});

// Login api
router.post("/login", async(req, res)=>{
    try {
      const { email, password } = req.body;
      const isExist = await jobbyUserData.findOne({email: email});
      if(isExist){
        // password check
        const isPasswordMatched = await bcrypt.compare(password, isExist.password)
        if(isPasswordMatched){
          // Generate token
          let payload = {
            id : isExist._id
          }
          let token = jwt.sign(payload, 'JOBBY_SECRET', {expiresIn: '2hr'});
          //console.log(token)
          
           return res.status(200).json({token: token, message:"Login Success"})
        }
        else{
            return res.status(400).json({message:"password not matched"})
        }
      }
      else{
        return res.status(400).json({message:"User not found"});
      }
    } catch(e) {
      console.log(e.message);
      return res.status(500).json({ message: "Internal server error" });
    }
})

// profile api
router.get("/profile", jwtAuth, async(req, res)=>{
  //console.log(req.id); 
  const user = await jobbyUserData.findOne({_id: req.id});
  //console.log(user);
  res.send(user);
})


module.exports = router;