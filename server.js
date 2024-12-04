require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import cors
const postRoutes = require('./routes/postRoutes');  // Import routes

const app = express();
const port = 5000;

// Cấu hình CORS
app.use(cors({
  origin: 'http://localhost:3000',  // Cho phép truy cập từ localhost:3000
  methods: ['GET', 'POST'],  // Chỉ cho phép GET và POST
  allowedHeaders: ['Content-Type'],  // Chỉ cho phép header Content-Type
}));

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
