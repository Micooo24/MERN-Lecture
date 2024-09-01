const express = require('express');
const router = express.Router();
const { create, list, read , update} = require('../controllers/post');

router.post('/post', create);
router.get('/posts', list);
router.get('/post/:slug', read);
router.put('/edit/post/:slug', update);

module.exports = router;