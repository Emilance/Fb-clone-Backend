import express  from "express";
import cors from 'cors';
import mongoose from "mongoose";
import 'dotenv/config';
import bodyParser from "body-parser";
import PostRoutes from './routes/post.js'
import UserRoutes from './routes/user.js'
import AuthRoutes from './routes/auth.js'
import cookieParser from "cookie-parser";


const app = express()

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials:true
}));

//middleware
app.use(bodyParser.json({limit: "20mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "20mb", extended: true}))
app.use(cookieParser())

app.use('/posts', PostRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/auth", AuthRoutes);



//db   config
const mongoURL = "mongodb://localhost/fbclone"

const port =  process.env.PORT || 4000;

mongoose.connect(mongoURL, {
    useNewUrlParser:true,  useUnifiedTopology:true
}).then(()=> {
    app.listen(port , () => {
        console.log(`listening at port ${port}`)
    })
}).catch((err)=> {
    console.log(err.message)
})








































// import express  from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import multer from "multer";
// import Grid from "gridfs-stream";
// import GridFsStorage from "multer-gridfs-storage";
// import path from "path";
// import Pusher from "pusher";
// import mongoose from "mongoose";


// Grid.mongo = mongoose.mongo

// //app config
// const app = express();
// const port = process.env.PORT || 4000


// //middleware

// app.use(bodyParser.json());
// app.use(cors());


// //dbconfig
//  const  mongoURL = "mongodb://localhost/facebookdb";
//  const conn = mongoose.createConnection(mongoURL, { 
//     useCreateIndex : true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,     
// })

// let gfs
// conn.once('open', ()=>{
//     console.log("Db connected")
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection("images")
// })

// const storage = new GridFsStorage({
//     url :mongoURL,
//     file:(req, file) =>{
//     return new Promise((resolve, reject) => {
//         const filename= `image-${Date.now()}${path.extname(file.originalname)}`

//         const fileInfo = {
//             filename :filename,
//             bucketName : images
//         };
//         resolve(fileInfo)
//     })
// }
// })


// const upload = multer({ storage })


//  mongoose.connect(mongoURL, { 
//      useCreateIndex : true,
//      useNewUrlParser: true,
//      useUnifiedTopology: true,     
//  })

// //api routes
// app.get("/", (req, res) =>{
//     res.status(200).send("hellow world")
// })

// app.post("/upload/image", upload.single("file"), (req, res)=>{
//     res.status(201).send(req.file)
// })


// //listen
// app.listen(port, ()=> {
//     console.log(`listening on localhost port ${port}`)
// })
