import express  from "express";
import cors from 'cors';
import routes from "./routes/endpoints.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());



app.use(routes)

app.listen(4000, ()=>{
    console.log("Server up and Running")
});
