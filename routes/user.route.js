import {users} from '../users.js'
import express from 'express'
import {signin,signup,getAllUsers} from '../conrollers/user.controller.js'
const router=express.Router();


//הרשמה
router.post("/",signup)
//התחברות
router.get("/:code",signin)

//קבלת כל המשתמשים
router.get("/",getAllUsers)

export default router