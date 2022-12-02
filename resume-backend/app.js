import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/connectdb.js';
import candidateRoutes from './routes/candidateRoute.js';

const app = express();

// CORS POLICY
app.use(cors());

const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// Connect Database
connectDB(DATABASE_URL);

// Static Files
app.use(express.static('public/upload/pimage'))
app.use(express.static('public/upload/rdoc'))

// For Parsing application/json
app.use(express.json());

// Application Level Middleware - For Parsing multipart/form-data
// app.use(
//   upload.fields([
//     { name: 'pimage', maxCount: 1 },
//     { name: 'rdoc', maxCount: 1 },
//   ])
// );

//Load Routes
app.use('/api', candidateRoutes);



app.listen(port, () => {
  console.log(`Server Listening at http://localhost:${port}`);
});
