import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getRecommendedUsers, getMyFriends,sendFriendRequest,acceptFriendRequest,getFriendRequests,getOutgoingFriendRequests } from '../controller/user.controller.js';
const router = express.Router();

router.use(protectRoute);
router.get('/', getRecommendedUsers); 
router.get("/friends", getMyFriends);

router.post('/friend-request/:id',sendFriendRequest);
router.put('/friend-request/:id/accept',acceptFriendRequest);

router.get("/friends-requests",getFriendRequests); // Assuming you have a function to get friend requests
router.get('/outgoing-friend-requests',getOutgoingFriendRequests); // Assuming you have a function to get outgoing friend requests

export default router;