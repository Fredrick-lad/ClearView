import express from "express";
import cors from "cors";
import routes from "./routes/endpoints.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use(routes);

if (!process.env.VERCEL) {
  app.listen(4000, () => {
    console.log("Server up and Running");
  });
}

export default app;
