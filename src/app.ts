import express from 'express';
import cors from 'cors';
import 'reflect-metadata'
import router from './routes';
import { AppDataSource } from './database/dbConnection';
import { createSystemJobsEntity } from './jobs/job.factory';

const app = express();
const jobs = createSystemJobsEntity();

jobs.initalize();
AppDataSource.initialize();

app.use(express.json());
app.use(cors())
app.use('/api', router)

export default app;