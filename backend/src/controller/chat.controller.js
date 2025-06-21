import { generateStreamToken } from '../lib/stream.js'; // Assuming you have a function to generate a token

export async function getStreamToken(req, res) {
    try {
        const userId = req.user.id;
        // Assuming you have a function to generate a token for the user
        const token = await generateStreamToken(userId);
        
        if (!token) {
            return res.status(500).json({ message: "Failed to generate token" });
        }
        
        res.status(200).json({ token });
    } catch (error) {
        console.error(`Error in getStreamToken: ${error.message}`);
        return res.status(500).json({ message: "Internal server error" });
    }
}