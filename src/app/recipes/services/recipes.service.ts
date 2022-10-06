import { Injectable } from "@angular/core";
import { Recipe } from "../recipes.interface";
import { Subject } from "rxjs";

import { v4 as uuidv4 } from "uuid";

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    {
      id: uuidv4(),
      name: "Tasty Schnitzel",
      description: "A super-tasty Schnitzel - just awesome!",
      imagePath: "https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG",
      ingredients: [
        { name: "Meat", amount: 1 },
        { name: "French Fries", amount: 20 },
      ],
    },
    {
      id: uuidv4(),
      name: "Tasty Schnitzel 2",
      description: "A super-tasty Schnitzel - just awesome!",
      imagePath:
        "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
      ingredients: [
        { name: "Meat 2", amount: 1 },
        { name: "French Fries 2", amount: 20 },
      ],
    },
  ];

  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: string) {
    const recipe = this.recipes.find((recipe) => recipe.id === id);
    if (!recipe) return;
    return recipe;
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(updatedRecipe: Recipe) {
    const recipeIndex = this.recipes.findIndex((recipe) => recipe.id === updatedRecipe.id);

    if (recipeIndex < 0) return;

    this.recipes[recipeIndex] = updatedRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: string) {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
    this.recipesChanged.next(this.recipes.slice());
  }
}
