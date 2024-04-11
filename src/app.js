// import express from 'express';
// import path from 'path';
// import "./db/conn.js";
// const app = express();
// const port = process.env.PORT || 3000;

// // const static_path = path.join(new URL('.', import.meta.url).pathname, '../public');

// const static_path = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');


// app.use(express.static(static_path));

// // console.log(path.join(__dirname, "../public"));
// // console.log(path.join(new URL('.', import.meta.url).pathname, '../public'));

// app.get("/",(req,res)=>{
//     res.send("Hello from the Ajit");
// });

// app.listen(port,()=>{
//     console.log(`server is running at port no ${port}`);
// })

// import express from 'express';
// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';
// import "./db/conn.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// const port = process.env.PORT || 3000;

// const static_path = path.join(__dirname, '../public');

// app.use(express.static(static_path));
// app.set("view enginee", "hbs");


// // app.get("/", (req, res) => {
// //     res.send("Hello from Ajit");
// // });

// app.get("/", (req, res) => {
//     res.render("index")
// });

// app.listen(port, () => {
//     console.log(`Server is running at port ${port}`);
// });


//Registration Login Code//
import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import "./db/conn.js";
import hbs from 'hbs';
import "./models/register.js";
import Register from './models/register.js';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
// Set EJS as the view engine
app.set('view engine', 'hbs');

// Specify the directory where your views are located
app.set('views', path.join(__dirname, 'templates', 'views'));

hbs.registerPartials(path.join(__dirname, 'templates', 'partials'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// console.log(process.env.SECRET_KEY);

app.get("/", (req, res) => {
    // Render a view (e.g., index.hbs) located in the 'views' directory
    res.render('index');
});

app.get("/register",(req,res)=>{
    res.render('register');

});

app.post("/register", async(req,res)=>{
    res.render('register');
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        // console.log(req.body.firstname);
        // res.send(req.body.firstname);
        if(password === cpassword){
            const registerEmployee = new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                age:req.body.age,
                password:password,
                confirmpassword:cpassword,
            })

            console.log("the success part" + registerEmployee);

            const token = await registerEmployee.generateAuthToken();
            console.log("the token part" + token);


            const registerd = await registerEmployee.save();
            res.status(201).render("index");

        }else{
            res.send("password are not matching")
        }

    } catch(error){
        res.status(400).send(error);
        console.log("the error page");
    }

});

app.get("/login",(req,res)=>{
    res.render('login');

});

app.post("/login",async(req,res)=>{
   try {

    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Register.findOne({email:email});

    const isMatch = await bcrypt.compare(password,useremail.password)
    //useremail.password === password
    const token = await useremail.generateAuthToken();
    console.log("the token part" + token);

    
    if(isMatch){
        res.status(201).render("index");

    }else{
        res.send("password are not matching");
    }

   } catch (error){
    res.status(400).send("Invalid Email")
   }

})


//Hashing Encrypting//

// const securePassword = async (password) =>{

//     const passwordHash = await bcrypt.hash(password,10);
//     console.log(passwordHash)

//     const passwordmatch = await bcrypt.compare(password,passwordHash);
//     console.log(passwordmatch)
    
// }
// securePassword("Ajit@123");


//Jsonweb token Verify


// import jwt from 'jsonwebtoken';

// const createToken = async() => {
//     const token = await jwt.sign({_id:"6616a19dd4ce16db8c11f37d"},"mynameisajitpatil0018@gamiliamadancerboy",{
//         expiresIn : "2 seconds"

//     })
//     console.log(token);

//     const userVer = await jwt.verify(token,"mynameisajitpatil0018@gamiliamadancerboy")
//     console.log(userVer)

// }

// createToken();


app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

