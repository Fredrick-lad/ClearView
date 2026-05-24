import { Router, Request, Response } from "express";
import pool from "../database.js";
import bcrypt from "bcrypt";
const routes = Router();

routes.get("/", async (req: Request, res: Response) => {
  try {
    const [data] = await pool.query("SELECT * FROM users");
    res.json(data);
    res.status(201);
  } catch (error) {
    console.error(error);
  }
});

routes.post("/login", async (req: Request, res: Response) => {
  try {

    const { password, email } = req.body;

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
    }
    return res.status(200).json({
      Message: "User logged in",
      user: {
        id: user.id,
        useremail: user.email,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(501).json({ Message: "Internal server error" });
  }
});

routes.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ Message: "All fields need to be filled" });
    }

    const saltrounds = 10;
    const salt = await bcrypt.genSalt(saltrounds);
    const password_hashed = await bcrypt.hash(password, salt);

    const [checkemail]: any = await pool.query(
      "SELECT email FROM users WHERE email=?",
      [email],
    );
    if (checkemail.length > 0) {
      return res
        .status(401)
        .json({ Message: "An account with this email already exists" });
    }

    const [registerdetails]: any = await pool.query(
      "INSERT INTO users (username,password_hash,email) VALUES (?,?,?)",
      [username, password_hashed, email],
    );
    res.status(201).json({
      Message: "User registered succesfully",
      userId: registerdetails.id,
    });
  } catch (error) {
    console.error("REgistration error: ", error);
    res.status(500).json({
      Message: "Internal server error",
    });
  }
});
export default routes;
