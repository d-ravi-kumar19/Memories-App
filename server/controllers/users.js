import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../models/user.js';

dotenv.config(); // Load environment variables from .env file

const SECRET_KEY = process.env.JWT_SECRET; // Get secret key from environment variables

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials." });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY, { expiresIn: '1h' });
        // console.table(existingUser.email, existingUser.User)
        res.status(201).json({ result: existingUser, token });
        
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
        
        console.error("Signin error:", error);
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        
        if (existingUser) return res.status(400).json({ message: "User already exists." });
        
        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match!" });
        
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        // console.table(result.email, result.User)
        
        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });

        console.error("Signup error:", error);
    }
}
