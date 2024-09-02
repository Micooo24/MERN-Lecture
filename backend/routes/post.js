const express = require('express');
const router = express.Router();
const { create, list, read , update, remove} = require('../controllers/post');

router.post('/post', create);
router.get('/posts', list);
router.get('/post/:slug', read);
router.put('/edit/post/:slug', update);
router.delete('/delete/post/:slug', remove);

module.exports = router;