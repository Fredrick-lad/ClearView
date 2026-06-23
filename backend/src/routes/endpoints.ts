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
      userid:registerdetails.insertId,
      email: email
    }
    const token = generateToken(payload);

    res.cookie("token", token,{
      httpOnly:true,
      secure:false,
      sameSite: "strict",
      maxAge: 36000000,
    })
    console.log(registerdetails.insertId)
    return res.status(201).json({
      user: {
        id:registerdetails.insertId,
        username: firstname,
        email:email
      },
      Message: "User registered succesfully",
    });
    
  } catch (error) {/////j/j
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
    "SELECT * FROM Users WHERE id= ?",[user.userid]
  )
  const [income]: any = await pool.query(
    "SELECT * FROM Income where user_id= ?",[user.userid]
  )

  const [envelope]:any = await pool.query(
    "SELECT * FROM Envelopes WHERE user_id = ?",[user.userid]
  )
  const [expenses]:any = await pool.query(
    "SELECT * FROM Expenses WHERE user_id=?",[user.userid]
  )
  const [period]:any = await pool.query(
    "SELECT * FROM BudgetPeriods WHERE user_id=?",[user.userid]
  )
  // console.log(income);

  return res.status(200).json({
    user:rows[0],
  incomesource: income,
  envelope: envelope,
  expenses : expenses,
  period:period,
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

  const{id,name,limit,spend,icon} = req.body;

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
      "INSERT INTO Envelopes (user_id,name,monthly_limit,current_spend,icon_name) VALUES (?,?,?,?,?)",[id,name,limit,spend,icon]
    )
    return res.status(200).json({
      message:"Envelope registered succesfully"
    })
  });
  routes.get("/getenvelopes" , TokenAuthenticator , async (req:Request,res:Response)=>{
      const user = (req as any).user;
    const [envelope] = await pool.query(
      "SELECT * FROM Envelopes WHERE user_id = ?",[user.userid]
    )
    return res.status(200).json({
      envelope: envelope,
    })
  })

  routes.put("/editenvelope/:id", TokenAuthenticator, async (req: Request, res: Response) => {
    const env_id = req.params.id;
    const { name, limit, icon } = req.body;
    try {
      await pool.query(
        "UPDATE Envelopes SET name = ?, monthly_limit = ?, icon_name = ? WHERE id = ?",
        [name, limit, icon, env_id],
      );
      return res.status(200).json({ message: "Envelope updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  })

  routes.delete("/deleteenvelope/:id",TokenAuthenticator, async(req:Request,res:Response)=>{
    const env_id = req.params.id;
    try {
      await pool.query(
        "DELETE FROM Envelopes WHERE id= ?",[env_id]
      )
      return res.status(200).json({message:"envelope deleted succesfully"})
    } catch (error) {
      
    }
  })

  routes.post("/addexpense" , TokenAuthenticator, async(req:Request,res:Response)=>{
    const {user_id,envelope_id,period_id,expense_name,amount,description,expense_date}= req.body

    if(period_id === ""|| expense_name === ""|| expense_date === ""||amount === ""){
      return res.status(400).json({
      message: "All fields are required"
    })
    }
    const response  = await pool.query(
      "INSERT INTO Expenses(user_id,envelope_id,period_id,amount,description,expense_date,expense_name) VALUES (?,?,?,?,?,?,?)",[user_id,envelope_id,period_id,amount,description,expense_date,expense_name]
    )
    await pool.query(
      "UPDATE Envelopes SET current_spend = current_spend + ? WHERE id = ?",
      [amount, envelope_id],
    )
    return res.status(200).json({
      message:"Envelope registered succesfully"
    })

  })
  routes.put("/editexpense/:id", TokenAuthenticator, async (req: Request, res: Response) => {
    const expense_id = req.params.id;
    const { expense_name, amount, expense_date, envelope_id, description } = req.body;
    try {
      const [oldRows]: any = await pool.query(
        "SELECT envelope_id, amount FROM Expenses WHERE id = ?",
        [expense_id],
      );
      const oldEnvelopeId = oldRows[0]?.envelope_id;
      const oldAmount = oldRows[0]?.amount;

      await pool.query(
        "UPDATE Expenses SET expense_name = ?, amount = ?, expense_date = ?, envelope_id = ?, description = ? WHERE id = ?",
        [expense_name, amount, expense_date, envelope_id, description, expense_id],
      );

      const affected = new Set<number>();
      if (oldEnvelopeId) affected.add(oldEnvelopeId);
      if (envelope_id) affected.add(envelope_id);

      for (const envId of affected) {
        const [sumRows]: any = await pool.query(
          "SELECT COALESCE(SUM(amount), 0) AS total FROM Expenses WHERE envelope_id = ?",
          [envId],
        );
        await pool.query(
          "UPDATE Envelopes SET current_spend = ? WHERE id = ?",
          [sumRows[0].total, envId],
        );
      }

      return res.status(200).json({ message: "Expense updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  })

  routes.post("/addperiod", TokenAuthenticator, async(req:Request,res:Response)=>{
    const {user_id,label,start_date,end_date}=req.body
    const [period]:any = await pool.query(
      "INSERT INTO BudgetPeriods(user_id,label,start_date,end_date) VALUES (?,?,?,?)",[user_id,label,start_date,end_date]
    )
    const period_id = period.insertId;
    return res.status(200).json({period: {
      id:period_id,
      label:label,
      start_date: start_date,
      end_date:end_date,
    },
   message:"Period added succesfully",})
  })
routes.post("/addincome",TokenAuthenticator, async(req:Request,res:Response)=>{
  const{user_id,period_id,source,total_amount}= req.body
  await pool.query(
    "INSERT INTO Income(user_id,period_id,source,total_amount) VALUES (?,?,?,?)",[user_id,period_id,source,total_amount]
  )
  return res.status(200).json({message:"Income source added succesfully"});
})

routes.post("/logout" , TokenAuthenticator, (req:Request,res:Response)=>{
  res.clearCookie("token");
  res.status(200).json({message:"Logged out succesfully"})
})

routes.put("/update-profile", TokenAuthenticator, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { firstName, lastName, email } = req.body;

    if (!firstName || !email) {
      return res.status(400).json({ message: "First name and email are required" });
    }

    await pool.query(
      "UPDATE Users SET firstName = ?, lastName = ?, email = ? WHERE id = ?",
      [firstName, lastName || null, email, user.userid],
    );

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

routes.put("/change-password", TokenAuthenticator, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }

    const [rows]: any = await pool.query(
      "SELECT password_hash FROM Users WHERE id = ?",
      [user.userid],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, rows[0].password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(newPassword, salt);

    await pool.query(
      "UPDATE Users SET password_hash = ? WHERE id = ?",
      [password_hash, user.userid],
    );

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

routes.delete("/delete-account", TokenAuthenticator, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const userId = user.userid;

    await pool.query("DELETE FROM Expenses WHERE user_id = ?", [userId]);
    await pool.query("DELETE FROM IncomeAllocation WHERE income_id IN (SELECT id FROM Income WHERE user_id = ?)", [userId]);
    await pool.query("DELETE FROM Income WHERE user_id = ?", [userId]);
    await pool.query("DELETE FROM Envelopes WHERE user_id = ?", [userId]);
    await pool.query("DELETE FROM BudgetPeriods WHERE user_id = ?", [userId]);
    await pool.query("DELETE FROM Users WHERE id = ?", [userId]);

    res.clearCookie("token");
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete account error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default routes;


