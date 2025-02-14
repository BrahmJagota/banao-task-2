import express, { NextFunction, Request, Response } from "express";
import { otpModel, userModel } from "../database/models";
import bcrypt from "bcrypt";
import { forgotPassword, loginUser, registerUser } from "./authService";
const authRouter = express.Router();

// auth middleware its not being used yet
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return res.status(400).json({ message: "Unauthorized user!" });
  }
  next();
};

authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body.data;
  console.log(username, email, password);
  try {
    const result = await registerUser(username, email, password);
    if (result.error) {
      res.status(200).json({ error: result, isLoggedIn: false });
      return;
    }

    req.session.userId = result.userId;
    req.session.save();
    res.json({ message: result, isLoggedIn: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Something went wrong", isLoggedIn: false });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body.data;
    const result = await loginUser(email, password);
    if (result.error) {
      throw new Error(result.error);
    }
    console.log("result", result);
    req.session.userId = result.userId;
    req.session.save((err) => {
      if (err) {
        console.log("err", err);
      }
    });
    console.log("console", req.session);
    res.status(200).send({ userId: result, isLoggedIn: true });
  } catch (err) {
    if (err) {
      console.error(err);
    }
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occured",
      isLoggedIn: false});
  }
});

authRouter.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body.data;
    const otp = await forgotPassword(email);
    console.log(otp);
    res.status(200).json({ otp, email });
    return;
  } catch (err) {
    if (err) {
      console.error(err);
    }
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occured",
    });
  }
});

authRouter.post("/verify-otp", async (req, res) => {
  try {
    const {otp, email} = req.body.data;
    const verify = await otpModel.findOne({email});
    console.log(verify);
    console.log("h")
    if(!verify) {
        console.log('here')
        res.status(400).json({message: "otp not found", isValid: false});
        return;
    }else if (verify.otp === otp) {
        console.log('there')
        await otpModel.deleteOne({email})
        res.status(200).json({ isValid: true, email });
        return;  
    } else {
        res.status(200).json({ isValid: false });
        return;  

    }
  } catch (err) {
    if (err) {
      console.error(err);
    }
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occured",
    });
  }
});

authRouter.post("/new-password/:token", async (req, res) => {
    try{
        const {password, confirmPassword} = req.body.data;

        const token = req.params.token;
        console.log(token);
        if(password !== confirmPassword) {
            res.status(200).json({message: "password didn't match", isChanged: false})
            console.log('h')
            return;
          } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await userModel.findOneAndUpdate({resetToken: token}, {password: hashedPassword, resetToken: ''});
            res.status(200).json({message: "password changed!", isChanged: true})
            return;
        }

    } catch (err) {
        if (err) {
          console.error(err);
        }
        res.status(400).json({
          message: err instanceof Error ? err.message : "An unknown error occured",
        });
      }
})
authRouter.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ message: "Unable to log out" });
    }

    res.clearCookie("connect.sid", {
      path: "/",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  });
});


authRouter.get("/me",async (req, res) => {
  console.log(req.session);
  if (req.session.userId) {
    const userId = req.session.userId;
    const user = await userModel.findById(userId)
    console.log(user);
    res.json({ authenticated: true, userId: req.session.userId, user: {username: user?.username, email: user?.email} });
    return;
  }
  res.json({ authenticated: false });
});
export default authRouter;
