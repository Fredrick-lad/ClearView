import Express  from "express";
import cors from 'cors';
import routes from "./routes/routing.js";

const app = Express();

app.use(Express.json());

app.use(cors())

app.use(routes)

app.listen(4020, ()=>{
    console.log("Server up and Running")
});