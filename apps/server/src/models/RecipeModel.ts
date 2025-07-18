import { Schema, model, Document, Types } from 'mongoose';

export interface IRecipe extends Document {
  title: string;
  description?: string;
  imageUrl?: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const recipeSchema = new Schema<IRecipe>(
  {
    title:       { type: String, required: true },
    description: { type: String },
    imageUrl:    { type: String },
    author:      { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export const RecipeModel = model<IRecipe>('Recipe', recipeSchema);