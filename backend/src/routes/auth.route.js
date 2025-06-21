import express from 'express';
import { login, logout, signup } from '../controller/auth.controller.js'; // Importing the auth controller functions
import { protectRoute } from '../middleware/auth.middleware.js'; // Importing the protectRoute middleware
import { onboard } from '../controller/auth.controller.js'; // Importing the onboard function
const router = express.Router();

router.post('/login',login);
router.post('/logout', logout);
router.post('/signup', signup);

router.post("/onboarding",protectRoute,onboard);

router.get('/me', protectRoute, (req, res) => {
    res.status(200).json({ user: req.user });
});

export default router;