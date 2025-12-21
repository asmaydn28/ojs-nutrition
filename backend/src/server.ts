import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import authRoutes from './routes/auth.routes'
import categoryRoutes from './routes/category.routes'
import productRoutes from './routes/product.routes'
import productPhotoRoutes from './routes/productPhoto.routes'      
import productCommentRoutes from './routes/productComment.routes'
import userRoutes from './routes/user.routes'
import cartItemRoutes from './routes/cartItem.routes'
import orderRoutes from './routes/order.routes'  
import roleRoutes from './routes/role.routes'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/product-photos', productPhotoRoutes);      
app.use('/api/comments', productCommentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart-items', cartItemRoutes);
app.use('/api/orders', orderRoutes);    
app.use('/api/roles', roleRoutes);    

app.get('/health', (req: Request, res: Response) => {
    res.json({ 
      status: 'true', 
      message: 'Server is running' 
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(` health check: http://localhost:${PORT}/health`);
});