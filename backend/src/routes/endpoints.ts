import { Router, Request, Response } from "express";
import pool from "../database.js";
import bcrypt from "bcrypt";
const routes = Router();
import generateToken from "../util/tokengenerator.js";
import TokenAuthenticator from "../middleware/tokenauthenticator.js";
import { RowDataPacket } from "mysql2";
import strict from "node:assert/strict";

routes.get("/", TokenAuthenticator,  async (req: Request, res: Response) => {
  try {
    const [data] = await pool.query("SELECT * FROM Users");
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
      "SELECT id,firstName,lastName,password_hash,email FROM Users WHERE email =?",
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
      userid: user.id,
      email: email
    }
    const token = generateToken(payload);

    res.cookie("token", token, {
      httpOnly: true,
      secure:true,
      sameSite: "strict",
      maxAge: 36000000
    })
    console.log(user.id)
    return res.json({
      user: {
        id:user.id,
        username: user.firstName,
        email: user.email
      },
      message: "logged in"
    })

  } catch (error) {
    console.error("Log in error: ",error);
    return res.status(501).json({ Message: "Internal server error" });
}
});

routes.post("/register", async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !email || !password ) {
      return res.status(400).json({ Message: "Ensure all fields are filled correctly especially username both first and lastname" });
    }

    const saltrounds = 10;
    const salt = await bcrypt.genSalt(saltrounds);
    const password_hash = await bcrypt.hash(password, salt);

    const [registerdetails]: any = await pool.query(
      "INSERT INTO Users (firstName,lastName,email,password_hash) VALUES (?,?,?,?)",
      [firstname,lastname,email ,password_hash ],
    );
    

    
    const payload={
      userId:registerdetails.id,
      email: email
    }
    const token = generateToken(payload);

    res.cookie("token", token,{
      httpOnly:true,
      secure:true,
      sameSite: "strict",
      maxAge: 36000000,
    })
    return res.status(201).json({
      user: {
        username: firstname,
        email:email
      },
      Message: "User registered succesfully",
    });
    
  } catch (error) {
    console.error("Registration error: ", error);
    res.status(500).json({
      Message: "Internal server error",
    });
  }
});

routes.post("/checkemail", async (req:Request , res:Response)=>{
  try {
    const {email} = req.body;
  const [checkemail]: any = await pool.query(
      "SELECT email FROM Users WHERE email=?",
      [email],
    );
    if (checkemail.length > 0) {
     return res
        .status(409)
        .json({ Message: "An account with this email already exists" });
        return;
    }
    return res.json({message:"Available"})
  } catch (error) {
    console.log("Database contact error");
    return res.status(500).json({ error: "Internal server error" });
  }
  
})

routes.get("/me", TokenAuthenticator, async(req:Request,res:Response)=>{
  const user = (req as any).user;

  const [rows] : any  = await pool.query(
    "SELECT firstName,lastName, email,id FROM Users WHERE id= ?",[user.userid]
  )
  const [income]: any = await pool.query(
    "SELECT source, total_amount FROM Income where user_id= ?",[user.userid]
  )

  const [envelope]:any = await pool.query(
    "SELECT name,monthly_limit,current_spend,color,description FROM Envelopes WHERE user_id = ?",[user.userid]
  )
  const [expenses]:any = await pool.query(
    "SELECT envelope_id,amount,description FROM Expenses WHERE user_id=?",[user.userid]
  )
  // console.log(income);
const response = {
  user:rows,
  incomesource: income,
  envelope: envelope,
  expense: expenses,
}
  return res.status(200).json({
    user:rows[0],
  incomesource: income,
  envelope: envelope,
  expenses : expenses,
  })
  
})

routes.post("/allocateincome", TokenAuthenticator, async(req:Request, res:Response)=>{
    const user = (req as any).user.id;
  const{allocated_amount}= req.body;

  if(!allocated_amount){
    return res.status(400).json({message:"No ammount allocated"})
  }
  const details = await pool.query(
    "SELECT t1.id AS envelope_id,t2.id AS icome_id,t3.id AS period_id FROM Envelop t1 JOIN Income t2 ON t2.user_id = t1.user_id, JOIN BudgetPeriods t3 ON t3.user_id = t1.user_id WHERE t1.user_id = ?",[user]
  )
  const rows = details as any
  const envelope_id = rows[0].envelope_id;
    const income_id = rows[0].income_id;
    const period_id = rows[0].period_id;
  const request = await pool.query(
    "INSERT INTO IncomeAllocation (income_id, envelope_id,allocated_amount) VALUES (?,?,?)",[envelope_id,income_id,period_id,allocated_amount]
  )
})

routes.post("/addenvelope" , TokenAuthenticator, async(req:Request, res:Response)=>{

  const{id,name,limit,color,description} = req.body;

  if (!name|| !limit ){
    return res.status(400).json({
      message: "All fields are required"
    })
    
  }
  if (name=== " "|| limit === 0){
    return res.status(400).json({
      message: "Please name you envelope and insert the desired limit"
    })}
  
    const response  = await pool.query(
      "INSERT INTO Envelopes (name,monthly_limit,color,description) VALUES (?,?,?,?) WHERE id = ?",[name,limit,color,description]
    )
    return res.status(200).json({
      message:"Envelope registered succesfully"
    })
  });


// routes.get("/:id", TokenAuthenticator, async (req:Request, res:Response)=>{
//   const userId = req.params.id;
//   try {
//     const [rows] = await pool.query<UserRow[]>(
//     "SELECT username,email FROM users WHERE id=?",[userId]
//   )
//   if(rows.length === 0){
//     return res.status(404).json({message: "User Not Found"})
//   }
//   const user = rows[0];

//   return res.status(200).json({
//     user : user?.username,
//     email: user?.email,
//   })
// } catch (error) {
//   console.log(error);
//   return res.status(500).json({message: "INTERNAL SERVER ERROR"})
    
//   }
// })
  
// routes.get("envelopes", TokenAuthenticator, async (req: Request, res:Response)=> {

// } )
// routes.get("/dashboardData", TokenAuthenticator, async (req:Request, res:Response)=>{
  
// })

export default routes;


