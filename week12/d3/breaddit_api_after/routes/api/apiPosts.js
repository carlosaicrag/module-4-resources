const express = require('express');
const router = express.Router();
const { Post } = require('../../models')

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const post = await Post.findByPk(id);
  if (post) {
    await post.destroy();
    res.json({ success: 'success' })
  } else {
    res.status(500)
    res.json({ success: 'failure!' })
  }
})

module.exports = router;