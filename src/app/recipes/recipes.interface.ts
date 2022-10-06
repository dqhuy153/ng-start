import { Ingredient } from "../shopping-list/shopping-list.interface";

export interface Recipe {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[];
}
