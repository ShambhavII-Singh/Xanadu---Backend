import express from 'express';

import { getAllUsers, 
    createUser, 
    getUserbyID, 
    // updateUserInfobyID 
} from "../controllers/user.controller.js";

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/').post(createUser);
router.route('/:id').get(getUserbyID);
// router.route('/:id').patch(updateUserInfobyID);

export default router;