import express from "express";
import cors from "cors";
import routes from "./routes/endpoints.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin:process.env.CORS_ORIGIN_LOCAL,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use(routes);

const PORT = parseInt(process.env.PORT || "4000");
app.listen(PORT, () => {
  console.log(`Server up and Running on port ${PORT}`);
});

export default app;
