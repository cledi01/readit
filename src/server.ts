import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

import authRoutes from './routes/auth';
import postRoutes from './routes/posts';
import subRoutes from './routes/subs';
import miscRoutes from './routes/misc';
import userRoutes from './routes/users';

import trim from './middleware/trim';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(require('morgan')('dev'));
app.use(trim);
app.use(cookieParser());
app.use(
	require('cors')({
		credentials: true,
		origin: process.env.ORIGIN,
		optionsSuccessStatus: 200,
	})
);
app.use(express.static('public'));

app.get('/', (_, res) => res.send('Hello World'));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/subs', subRoutes);
app.use('/api/misc', miscRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, async () => {
	console.log(`Server running at http://localhost:${PORT}`);

	try {
		await createConnection();
		console.log('Database connected!');
	} catch (err) {
		console.log(err);
	}
});
