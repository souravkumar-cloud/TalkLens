import User from '../models/User.js'; // Importing the User model
import bcrypt from 'bcryptjs'; // Importing bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Importing jsonwebtoken for token generation
import { upsertStreamUser } from '../lib/stream.js';

export async function signup(req, res) {
    const { fullName, email, password } = req.body;
    try{
        if(!fullName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if(password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const idx=Math.floor(Math.random() * 100)+1;
        const randomAvatar=`https://avatar.iran.liara.run/public/${idx}.png`;
        const newUser=new User({
            fullName,
            email,
            password,
            profilePic: randomAvatar
        });
        try{
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName, 
                image: newUser.profilePic||"",
            });
            console.log(`Stream user upserted: ${newUser.fullName}`);
        }catch(error) {
            console.error(`Error upserting Stream user: ${error.message}`);
            return res.status(500).json({ message: 'Failed to create Stream user' });
        }
        console.log(`Stream user upserted: ${newUser._id}`);
        await newUser.save(); 
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 ,// 7 days
            sameSite: 'Strict',
        });
        res.status(201).json({success: true, user: newUser})
    }catch(error) {
        console.error(`Error during signup: ${error.message}`);
        return res.status(500).json({ message: 'Email already Existed,Use different one' });
    }
    
}
export async function login(req, res) {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 ,// 7 days
            sameSite: 'Strict',
        });
        res.status(200).json({ success: true, user });
    }catch (error) {
        console.error(`Error during login: ${error.message}`);
        return res.status(500).json({ message: 'Internal server error' });
    }   
}
export async function logout(req, res) {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
}


export async function onboard(req, res) {
    try{
        const userId= req.user._id;
        const { fullName,bio,nativeLanguage, learningLanguage, location } = req.body;
        if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({
                message: 'All fields are required for onboarding',
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location"
                ].filter(Boolean)
            });
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                ...req.body,
                isOnboraded: true,
            },
            { new: true }
        );
        if(!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || "",
            });
            console.log(`Stream user upserted during onboarding: ${updatedUser.fullName}`);
        } catch (error) {
            console.error(`Error upserting Stream user during onboarding: ${error.message}`);
            return res.status(500).json({ message: 'Failed to update Stream user' });
        }
        res.status(200).json({ success: true, user: updatedUser });
    }catch(error){
        console.error(`Error during onboarding: ${error.message}`);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
