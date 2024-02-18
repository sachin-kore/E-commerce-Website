import express from "express"
import { registerController, LoginController, ForgetpasswordController, GetallUsers } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../helpers/authMiddleware.js";


// route object

const router = express.Router();

// routing
// Register || method POST
router.post("/register", registerController);

// Login || method POST
router.post("/login", LoginController);

// get all users || method POST
router.get("/get-all-users", requireSignIn, isAdmin, GetallUsers);


// forget-password
router.post("/forget-password", ForgetpasswordController);

// protucted Routes for user
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({
        ok: true
    })
});

// protucted Routes for Admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({
        ok: true
    })
});

export default router;
