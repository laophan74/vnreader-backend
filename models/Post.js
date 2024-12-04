const mongoose = require('mongoose');

// Định nghĩa schema cho bài viết
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Tạo model từ schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
