import express  from "express";
import cors from 'cors';
import routes from "./routes/endpoints.js";

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5174",
    credentials: true
}))

app.use(routes)

app.listen(4000, ()=>{
    console.log("Server up and Running")
});