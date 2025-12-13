import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import authRoutes from './routes/auth.routes'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.use('/api', (req: Request, res: Response, next: NextFunction) => {
    next();
});

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
