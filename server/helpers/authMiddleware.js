import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "error in jwt token"
        })
    }
}

// admin access

export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role == 1) {
            next();
        } else {
            res.status(401).send({
                success: false,
                message: "UnAthorized Access"
            })
        }
    } catch (error) {
        console.log(error);
    }
}