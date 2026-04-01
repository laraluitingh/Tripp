const express = require('express');
const router = express.Router();
const Follow = require('../models/follow');

// Follow a user
router.post('/:id', (req, res) => {
  const followerId = req.session.userId;
  const followingId = req.params.id;

  if (!followerId) return res.status(401).json({ status: 'Failed', message: 'Not authenticated' });
  if (followerId === followingId) return res.status(400).json({ status: 'Failed', message: 'Cannot follow yourself' });

  const follow = new Follow({ followerId, followingId });
  follow.save()
    .then(() => res.status(201).json({ status: 'Success' }))
    .catch((err) => {
      if (err.code === 11000) return res.status(409).json({ status: 'Failed', message: 'Already following' });
      res.status(500).json({ status: 'Failed' });
    });
});

// Unfollow a user
router.delete('/:id', (req, res) => {
  const followerId = req.session.userId;
  const followingId = req.params.id;

  if (!followerId) return res.status(401).json({ status: 'Failed', message: 'Not authenticated' });

  Follow.deleteOne({ followerId, followingId })
    .then(() => res.status(200).json({ status: 'Success' }))
    .catch(() => res.status(500).json({ status: 'Failed' }));
});

// Get followers of a user (people who follow :id)
router.get('/followers/:id', (req, res) => {
  Follow.find({ followingId: req.params.id })
    .populate('followerId', ['name', 'img'])
    .then((result) => res.json({ result }))
    .catch(() => res.status(500).json({ status: 'Failed' }));
});

// Get following of a user (people that :id follows)
router.get('/following/:id', (req, res) => {
  Follow.find({ followerId: req.params.id })
    .populate('followingId', ['name', 'img'])
    .then((result) => res.json({ result }))
    .catch(() => res.status(500).json({ status: 'Failed' }));
});

// Check if current session user follows :id
router.get('/status/:id', (req, res) => {
  const followerId = req.session.userId;
  const followingId = req.params.id;
  Follow.findOne({ followerId, followingId })
    .then((result) => res.json({ following: !!result }))
    .catch(() => res.status(500).json({ status: 'Failed' }));
});

// Get follower/following counts for a user
router.get('/counts/:id', (req, res) => {
  const userId = req.params.id;
  Promise.all([
    Follow.countDocuments({ followingId: userId }),
    Follow.countDocuments({ followerId: userId }),
  ])
    .then(([followers, following]) => res.json({ followers, following }))
    .catch(() => res.status(500).json({ status: 'Failed' }));
});

module.exports = router;
