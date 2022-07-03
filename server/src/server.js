import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoDBConnect from './config/db.js';
import placeRoutes from './routes/place.routes.js';
import schoolRoutes from './routes/school.routes.js';

const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(express.json());

//routes
app.use(placeRoutes);
app.use(schoolRoutes);

const PORT = process.env.SERVER_PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
    mongoDBConnect();
});