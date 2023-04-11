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