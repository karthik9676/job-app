const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { JobDetails, Jobs } = require("./models/jobs");
const app = express();

app.use(express.json());
app.use(cors());

const port = 4444 || process.env.port;

// mongoDB initialization
 mongoose.connect("mongodb+srv://karthikreddy7877:karthik7877@cluster0.j1oly1z.mongodb.net/jobbyApp?retryWrites=true&w=majority")
.then( ()=>{
    console.log("DB is connected successfully");
})
.catch( (error)=>{
    console.log(error);
})

//sending data to db 

// const addJobs = async () => {
//   try {
//     const jobDetail = new JobDetails(
//       {
//         title:"Fullstack Developer",
//     companyLogoUrl:"https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png",
//     companyWebsiteUrl:"https://about.google/",
//     rating:4, 
//     location:"Bangalore",
//     employementType:"Internship",
//     packagePerAnnum:"14 LPA",
//     jobDescription:"Google is and always will be an engineering company. We hire people with a broad set of technical skills who are ready to take on some of technology's greatest challenges and make an impact on millions, if not billions, of users. Google engineers are changing the world one technological achievement after another.",

//     skils: [
//         {
//             name:"HTML 5",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/html-img.png"
//         },
//         {
//             name:"CSS 3",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/css-img.png",
//         },
//         {
//             name:"Javascript",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/javascript-img.png",
//         },
//         {
//             name:"React JS",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/reactjs-img.png",
//         },
//         {
//             name:"Redux",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/redux-img.png",
//         },
//         {
//             name:"NodeJs",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/nodejs-img.png",
//         },
//         {
//             name:"SQL Lite",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/sqlite-img.png",
//         },
//         {
//             name:"Python",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/python-img.png",
//         },
//         {
//             name:"AWS",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/aws-img.png",
//         },
//         {
//             name:"Go",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/go-img.png",
//         },
//         ],
//         lifeAtCompany:{
//             description:"Google is not a conventional company, and we do not intend to become one. We know that every employee has something important to say and that every employee is integral to our success. Our mission is to organize the world‘s information and make it universally accessible.",
//             imageUrl:"https://assets.ccbp.in/frontend/react-js/jobby-app/life-google-img.png",
//         }
//       },
      
//     );

//     const savedJobDetail = await jobDetail.save();
//     // Create and save a Job document that uses the same _id as the JobDetail

//     const job = new Jobs(
//       {
//         title:"Fullstack Developer",
//     companyLogoUrl:"https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png",
//     companyWebsiteUrl:"https://about.google/",
//     rating:4, 
//     location:"Bangalore",
//     employementType:"Internship",
//     packagePerAnnum:"14 LPA",
//     jobDescription:"Google is and always will be an engineering company. We hire people with a broad set of technical skills who are ready to take on some of technology's greatest challenges and make an impact on millions, if not billions, of users. Google engineers are changing the world one technological achievement after another.",
//       }

    
//     );


//     await job.save();
//     await mongoose.disconnect();
//   } catch (e) {
//     console.log(e);
//   }
// };

//  addJobs()



//auth routes
app.use("/auth", require("./routes/authRoutes"));

// api routes
app.use("/api", require("./routes/apiRoutes"));

app.listen(port, ()=>{
    console.log(`server is running at ${port}`)
});