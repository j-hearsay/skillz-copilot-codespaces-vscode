// Create web server
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// @route POST api/comments
// @desc Create a comment
// @access Private
router.post('/', 
    auth,
    check('comment', 'Comment is required').not().isEmpty(),
    check('postId', 'Post ID is required').not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id