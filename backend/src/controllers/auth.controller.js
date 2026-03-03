const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerUser(req, res) {

    const { username, email, password, dob, gender } = req.body;

    const isUserExist = await userModel.findOne({email});
    if (isUserExist) {
        return res.status(409).json({ message: "User already exists" });
    }
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        dob,
        gender,
        age
    })
    
    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            dob: user.dob,
            gender: user.gender,
            age: user.age
        }
    })


}

async function loginUser(req, res) {
    
    const { email, password } = req.body;
    const user = await userModel.findOne({email})

    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token, {httpOnly:true})

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            dob: user.dob,
            gender: user.gender,
            age: user.age
        }
    })
}

async function logOutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
}

module.exports = {registerUser, loginUser, logOutUser}