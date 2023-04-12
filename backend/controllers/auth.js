import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User} from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const {
            firstname, lastname, email,
            password, picturePath, friends,
            location, occupation
        } = req.body;
        // TOHLE VSECHNO ZADAVA UZIVATEL PRI REGISTRACI !

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User(
            {
                firstname, lastname, email,
                passwordHash, picturePath, friends,
                location, occupation,
                viewedProfile: Math.floor(Math.random() * 10000),
                impressions: Math.floor(Math.random() * 10000)
            });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({error: "Register error", err})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(400).json({message: "User does not exist !"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials!"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        delete user.password;   // delete so it doesnt get sent back to frontend
        res.status(200).json({token, user})


    } catch (err) {
        res.status(500).json({error: "Register error", err})
    }
}