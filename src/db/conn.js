import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/employeeRegistration").then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log("Noconnection");
});
