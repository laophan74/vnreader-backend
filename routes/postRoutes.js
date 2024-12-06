const express = require('express');
const Post = require('../models/Post'); // Import model Post

const router = express.Router();

// API POST: Thêm bài viết
router.post('/', async (req, res) => {
  try {
    const { title, thumbnail, description, content, author, category } = req.body;

    const newPost = new Post({
      title,
      thumbnail,
      description,
      content,
      author,
      category,
    });

    await newPost.save(); // Lưu vào MongoDB
    res.status(201).json(newPost); // Trả về bài viết đã được tạo
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API GET: Lấy tất cả bài viết hoặc lọc theo category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query; // Lấy category từ query (nếu có)
    let filter = {};

    if (category) {
      filter.category = category; // Lọc theo category nếu được cung cấp
    }

    const posts = await Post.find(filter); // Lấy bài viết theo bộ lọc
    res.status(200).json(posts); // Trả về danh sách bài viết
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API GET: Lấy bài viết theo ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // Lấy bài viết theo ID

    if (!post) {
      return res.status(404).json({ message: 'Bài viết không tồn tại' });
    }

    res.status(200).json(post); // Trả về bài viết theo ID
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API GET: Lấy 10 bài viết mới nhất
router.get('/recent', async (req, res) => {
  return res.status(404).json({ message: 'No posts found' });
  // try {
  //   const recentPosts = await Post.find().sort({ date: -1 }).limit(10);
  //   if (!recentPosts) {
  //     return res.status(404).json({ message: 'No posts found' });
  //   }
  //   res.status(200).json(recentPosts); // Trả về 10 bài viết mới nhất
  // } catch (error) {
  //   console.error('Error fetching recent posts:', error);
  //   res.status(500).json({ message: 'Server error: ' + error.message });
  // }
});

// API PUT: Cập nhật bài viết
router.put('/:id', async (req, res) => {
  try {
    const { title, thumbnail, description, content, author, category } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, thumbnail, description, content, author, category },
      { new: true } // Trả về bài viết đã được cập nhật
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Bài viết không tồn tại' });
    }

    res.status(200).json(updatedPost); // Trả về bài viết đã cập nhật
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API DELETE: Xóa bài viết
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id); // Xóa bài viết theo ID

    if (!deletedPost) {
      return res.status(404).json({ message: 'Bài viết không tồn tại' });
    }

    res.status(200).json({ message: 'Bài viết đã được xóa' }); // Trả về thông báo xóa thành công
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
