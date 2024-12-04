require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');  // Import routes

const app = express();
const port = 5000;

// Middleware để xử lý JSON body
app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Kết nối MongoDB thành công!'))
  .catch(err => console.log('Lỗi kết nối MongoDB:', err));

// Sử dụng các route từ postRoutes
app.use('/api/posts', postRoutes);

// Chạy server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
