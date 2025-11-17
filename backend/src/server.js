import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); //middleware that will parse JSON bodies
app.use(rateLimiter)

//simple middleware
app.use((req, res, next) => {
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
    next();
})

app.use("/api/notes", notesRoutes);

// make sure to connect to db first before starting the program
connectDB().then(() => {
    app.listen(PORT, () =>{
    console.log("Server started on PORT:", PORT);
    })
})



// [5] Added a simple middleware
// import express from "express";
// import notesRoutes from "./routes/notesRoutes.js"
// import {connectDB} from "./config/db.js"
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5001;

// connectDB();

// app.use(express.json()); //middleware that will parse JSON bodies

// //simple middleware
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// })

// app.use("/api/notes", notesRoutes);

// app.listen(PORT, () =>{
//     console.log("Server started on PORT:", PORT);
// })


// [4] Use environment variables and importing dotenv
// import express from "express";
// import notesRoutes from "./routes/notesRoutes.js"
// import {connectDB} from "../config/db.js"
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5001;

// connectDB();

// app.use("/api/notes", notesRoutes);

// app.listen(PORT, () =>{
//     console.log("Server started on PORT:", PORT);
// })

// [3] Connect to Db
// import express from "express";
// import notesRoutes from "./routes/notesRoutes.js"
// import {connectDB} from "../config/db.js"


// const app = express();

// connectDB();

// app.use("/api/notes", notesRoutes);

// app.listen(5001, () =>{
//     console.log("Server started on PORT: 5001");
// })


//----------------------------------------------

// [2] Create a simple API
// import express from "express"

// const app = express()

// app.get("/api/notes", (req,res) => {
//     res.send("you got 5 notes");
// });

// app.listen(5001, () =>{
//     console.log("Server started on PORT: 5001")
// });

//----------------------------------------------

// [1] Simple script to run the backend
// import express from "express"

// const app = express()

// app.listen(5001, () =>{
//     console.log("Server started on PORT: 5001")
// });