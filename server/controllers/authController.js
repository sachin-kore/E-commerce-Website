import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {

        const { name, email, password, phone, address, answer } = req.body;

        // validation 
        if (!name) {
            return res.send({ error: 'Name is required' })
        }
        if (!email) {
            return res.send({ error: 'Email is required' })
        }
        if (!password) {
            return res.send({ error: 'Password is required' })
        }
        if (!phone) {
            return res.send({ error: 'Phone is required' })
        }
        if (!address) {
            return res.send({ error: 'Address is required' })
        }
        if (!answer) {
            return res.send({ error: 'Answer is required' })
        }

        //check  user
        const existingUser = await userModel.findOne({ email })

        // Exists user
        if (existingUser) {
            res.status(200).send({
                success: true,
                message: "Already Register please Login"
            })
        }

        // hashing password
        const NewhashedPassword = await hashPassword(password);

        // save user
        const user = await new userModel({ name, email, password: NewhashedPassword, phone, address, answer }).save();

        res.status(200).send({
            success: true,
            message: 'User Registered successfully',
            user
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in Registration',
            error
        })
    }
}

// Login Controller

export const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation 
        if (!email) {
            return res.send({ error: 'Name is required' })
        }
        if (!password) {
            return res.send({ error: 'Name is required' })
        }

        //check  user
        const existingUser = await userModel.findOne({ email });

        // Exists user
        if (!existingUser) {
            return res.status(501).send({
                success: false,
                message: "Don't have an Account Please Register"
            })
        }
        const isCorrect = await comparePassword(password, existingUser.password);
        if (!isCorrect) {
            return res.status(501).send({
                success: false,
                message: "Incorrect Password"
            })
        }

        // creating JWT token

        const token = await jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.status(200).send({
            success: true,
            message: 'User Login successfully',
            user: {
                email: existingUser.email,
                name: existingUser.name,
                phone: existingUser.phone,
                address: existingUser.address,
                answer: existingUser.answer,
                role: existingUser.role
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in Login',
            error
        })
    }
}

// forget-password

export const ForgetpasswordController = async (req, res) => {
    try {
        const { email, newpassword, answer } = req.body;
        console.log(email, newpassword, answer);

        if (!email) {
            return res.send({ error: 'email is required' })
        }
        if (!newpassword) {
            return res.send({ error: 'newpassword is required' })
        }
        if (!answer) {
            return res.send({ error: 'answer is required' })
        }
        const hashPass = await hashPassword(newpassword);

        const user = await userModel.findOne({ email, answer });
        console.log(user);
        if (!user) {
            res.status(501).send({
                success: false,
                message: "User not found"
            })
        }

        const newOne = await userModel.findByIdAndUpdate(user?._id, { password: hashPass }, { new: true })

        if (newOne) {
            res.status(200).send({
                success: true,
                message: "Password Updated Successfully",
                user: newOne
            })
        }

    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "something wnt wrong"
        })

    }
}

//get all users
export const GetallUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        console.log(users);
        if (!users) {
            res.status(501).send({
                success: false,
                message: "Users are not found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Users fetched Successfully",
            users
        })

    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "something wnt wrong"
        })

    }
}
