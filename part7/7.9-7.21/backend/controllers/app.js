const express = require('express')
const Blog = require('../models/blog-model.js')
const { request } = require('http')
const router = express.Router()

router.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  .populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs)
})

router.post('/:id/comments', async(req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Token missing or invalid'})
  }

  const UpdateBlog = await Blog.findById(req.params.id)
  if (UpdateBlog) {
    UpdateBlog.comments.push(req.body.comment);
    await UpdateBlog.save();
    res.status(201).json(UpdateBlog);
  } else {
    res.status(400).end()
  }
})
  
router.post('/', async (request, response) => {
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: 'Token missing or invalid'})
  }
  
  const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      user: user._id
  });

  if (blog.title && blog.url) {
      const savedBlog = await blog.save();
      user.blogs_made = user.blogs_made.concat(savedBlog._id);
      await user.save();
      response.status(201).json(savedBlog);
  } else {
      response.status(400).end();
  }
});

router.delete('/:id', async(req, res) => {
  try{
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Token missing or invalid'});
    }

    const blog = await Blog.findById(req.params.id);
    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndDelete(req.params.id)
      res.status(204).end()
    } else {
      res.status(403).json({ error: 'Unathorized to delete this blog'})
    }
  } catch (error) {
    res.status(500).json({error: 'Error trying to eliminate the id'}) 
  }
})

router.put('/:id', async(req, res) => {
  const { likes } = req.body
  try {
    const updated_blog = await Blog.findByIdAndUpdate(
      req.params.id, 
      { likes }, 
      {new: true, runValidators: true, context: 'query'})
      res.json(updated_blog)
  } catch(error) {
    console.error(error)
    res.status(400).json({ error: 'Error updating the blog'})
  }
})

module.exports = router