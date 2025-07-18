import { RecipeModel, IRecipe } from '../models/RecipeModel';

export interface ListOptions { skip: number; take: number; }

export class RecipeService {
  async create(data: { title: string; description?: string; author: string }) 
  {
    return RecipeModel.create(data);
  }

  async list({ skip, take }: ListOptions) 
  {
    return RecipeModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(take)
      .populate('author', 'email name');
  }

  async update(id: string, data: Partial<IRecipe>)
  {
    return RecipeModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) 
  {
    return RecipeModel.findByIdAndDelete(id);
  }
}
