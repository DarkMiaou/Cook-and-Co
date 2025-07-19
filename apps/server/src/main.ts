import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { config } from './config';
import userRouter from './resources/user.resource';
import recipeRouter from './resources/recipe.resource';
import { log } from './utils/logger';