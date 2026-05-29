import { Router, Request, Response } from "express";
import pool from "../database.js";
import bcrypt from "bcrypt";
const routes = Router();
import generateToken from "../util/tokengenerator.js";
import { JwtPayload } from "../interfaces/registerPayload.js";

routes.get("/", async (req: Request, res: Response) => {
  try {
    const [data] = await pool.query("SELECT * FROM users");
    res.json(data);
    
    return res.status(201);
  } catch (error) {
    console.error(error);
  }
});

routes.post("/login", async (req: Request, res: Response) => {
  try {

    const { email, password} = req.body;

    if (!password && !email) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const [logindetails]: any = await pool.query(
      "SELECT id,username,password_hash,email FROM users WHERE email =?",
      [email],
    );

    const user = logindetails[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid password or email" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
      // return console.log("Wrong password")
    }
    const payload={
      username: user.username,
      email: user.email
    }
    const token = generateToken(payload);

    return res.status(200).json({
      Message: "User logged in",
      user: {
        id: user.id,
        useremail: user.email,
        token,
      },
    });

  } catch (error) {
    console.error("Log in error: ",error);
    return res.status(501).json({ Message: "Internal server error" });
}
});

routes.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ Message: "All fields need to be filled" });
    }

    const saltrounds = 10;
    const salt = await bcrypt.genSalt(saltrounds);
    const password_hash = await bcrypt.hash(password, salt);

    const [checkemail]: any = await pool.query(
      "SELECT email FROM users WHERE email=?",
      [email],
    );
    if (checkemail.length > 0) {
      res
        .status(401)
        .json({ Message: "An account with this email already exists" });
        return;
    }

    const [registerdetails]: any = await pool.query(
      "INSERT INTO users (username,password_hash,email) VALUES (?,?,?)",
      [username, password_hash, email],
    );
    const payload={
      username: registerdetails.username,
      email: registerdetails.email
    }
    const token = generateToken(payload);
    return res.status(201).json({
      Message: "User registered succesfully",
      userId: registerdetails.id,
      token,
    });
    
  } catch (error) {
    console.error("REgistration error: ", error);
    res.status(500).json({
      Message: "Internal server error",
    });
  }
});
export default routes;

function alert(arg0: string) {
  throw new Error("Function not implemented.");
}

