import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { config } from './config';
import userRouter from './resources/UserResource';
import recipeRouter from './resources/RecipeResource';
import { log } from './utils/logger';

async function bootstrap() {

  await mongoose.connect(config.mongoUri);
  log('Connected to MongoDB');

  const app = express();
  app.use(bodyParser.json());

  app.use('/users',   userRouter);
  app.use('/recipes', recipeRouter);

  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    log(err.message);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  });

  app.listen(config.port, () => log(`Server listening on port ${config.port}`));
}

bootstrap().catch(err => console.error(err));