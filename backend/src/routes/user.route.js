import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getRecommendedUsers, getMyFriends,sendFriendRequest,acceptFriendRequest,getFriendRequests,getOutgoingFriendRequests } from '../controller/user.controller.js';
const router = express.Router();

router.use(protectRoute);

// Routes
router.get('/', getRecommendedUsers);
router.get('/friends', getMyFriends);
router.post('/friend-request/:id', sendFriendRequest);
router.put('/friend-request/:id/accept', acceptFriendRequest);
router.get('/friend-requests', getFriendRequests);
router.get('/outgoing-friend-requests', getOutgoingFriendRequests);

export default router;
