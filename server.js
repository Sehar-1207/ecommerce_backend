import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import addressRoutes from "./routes/addressRoutes.js";
connectDB();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://ecommerce-website-nine-wine.vercel.app",
  ],
  credentials: true,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart',cartRouter)
app.use('/api/orders',orderRouter);
app.use('/api/addresses', addressRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});