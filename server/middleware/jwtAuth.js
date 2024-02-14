const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next)=>{
    let jwtToken;
    const authHeader = req.headers["authorization"]
    //console.log(authHeader)
    if(authHeader !== undefined){
        jwtToken = authHeader.split(' ')[1]
    }
    //console.log(jwtToken)
    if(authHeader === undefined){
        return res.status(401).json({message:'Invalid JWT token'});
    }
    else{
        jwt.verify(jwtToken, 'JOBBY_SECRET', async(error, payload)=>{
            if(error){
                return res.status(401).json({message:"Invalid Jwt Token"});
            }
            else{
                req.id = payload.id  ///storing the id of user in req object
                next();
            }
        })
    }
};


module.exports = jwtAuth;