const express = require("express");
const {JobDetails, Jobs} = require("../models/jobs");
const jwtAuth = require("../middleware/jwtAuth");

//used to handle the routes of nodejs project
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("this is api routes");
});

// To get all jobs
router.get("/jobs", jwtAuth, async(req, res)=>{
    try{
        // will return all Jobs model to allJobs
        const allJobs = await Jobs.find({});
        //console.log(allJobs)
        res.send(allJobs);
    }
    catch(e){
        console.log(e.message);
        return res.status(500).json({message:"Internal servor error"});
    }
});

// Specific job based on  jobId
router.get("/jobs/:id", jwtAuth, async(req, res)=>{
    try{
        const {id} = req.params;
        const jobDetails = await JobDetails.findOne({_id: id});
        if(!jobDetails){
            return res.status(404).json({message:"Job not found"})
        }

        const jobTitle = jobDetails.title;

        const similarJobs = await Jobs.find({
            // Here regex is contains and i is case insensitive
            title: {$regex: jobTitle, $options: 'i'},
            _id : {$ne: id} //Here excluding current job and returning remaining jobs
        });
        // console.log(`Similarjobs :`, similarJobs)

        res.status(200).json({jobDetails : jobDetails, similarJobs : similarJobs})
    }
    catch(e){
        console.log(e.message);
        res.status(500).json({message:"Internal server error"});
    }
});

// filter jobs api
router.get("/filterjobs", jwtAuth, async(req, res)=>{
    //console.log(req.query);
    const {employment_type, minimum_package, search} = req.query;
    const query = {};

    if(employment_type){
         const employmentTypesArray = employment_type.split(' ');
         query.employmentType = {$in: employmentTypesArray.map( type=> new RegExp(type, 'i'))}
    }

    if(minimum_package){
        const minPackage = parseFloat(minimum_package.replace(/\D+/g, '')); //parsing the minimum package remove non numeric value
        if(!isNaN(minPackage)){
            query.packagePerAnnum = {$gte: minPackage}
        }
    }
    if(search){
        query.title = {$regex: search, $options: 'i'}
    }

    const filteredJobs = await Jobs.find(query);
    //console.log(filteredJobs)

    if(filteredJobs.length === 0){
        return res.status(400).json({message:"No jobs found"});
    }
    else{
        res.json(filteredJobs);
    }
})


module.exports = router;