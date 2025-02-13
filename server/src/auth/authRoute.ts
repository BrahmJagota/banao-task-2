import express, { NextFunction, Request, Response } from "express";
import { userModel } from "../database/models";
import bcrypt from "bcrypt";
import { loginUser, registerUser } from "./authService";
const authRouter = express.Router();

// auth middleware
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session.userId) {
        return res.status(400).json({message: "Unauthorized user!"});
    }
    next();
}


authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body.data;
  console.log(username, email, password);
  try {
    const result = await registerUser(username, email, password);
    if (result.message) {
      res.status(200).json({ message: result });
      return;
    }

    req.session.userId = result.userId;
    req.session.save();
    res.json({ message: result });
} catch (err) {
    console.error(err);
    res.status(400).json({ message: "Something went wrong" });
}
});

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body.data;
        const result = await loginUser(email, password);
        if (result.message) {
            throw new Error(result.message);
        }
        console.log('result', result)
        req.session.userId = result.userId;
        req.session.save((err) => {
            if(err) {
                console.log('err', err) 
            }
        });
        console.log("console",req.session)
        res.status(200).send({ userId: result });
    } catch (err) {
        if(err){
        console.error(err);
        }
    res
      .status(400)
      .json({
        message:
          err instanceof Error ? err.message : "An unknown error occured",
      });
  }
});

authRouter.get('/me',(req, res) => {
    console.log(req.session)
    if(req.session.userId){
        res.json({authenticated: true, userId: req.session.userId});
        return;
    }
    res.json({authenticated: false})
})
export default authRouter;
