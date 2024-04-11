import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log("Noconnection");
});
