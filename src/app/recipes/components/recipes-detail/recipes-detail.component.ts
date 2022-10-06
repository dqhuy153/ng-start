import { ActivatedRoute, Params, Router } from "@angular/router";
import { Recipe } from "./../../recipes.interface";
import { Component, OnInit } from "@angular/core";
import { RecipesService } from "../../services/recipes.service";
import { ShoppingListService } from "src/app/shopping-list/services/shopping-list.service";

@Component({
  selector: "app-recipes-detail",
  templateUrl: "./recipes-detail.component.html",
  styleUrls: ["./recipes-detail.component.scss"],
})
export class RecipesDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private slService: ShoppingListService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipesService.getRecipeById(params["id"]);
    });
  }

  onAddToShoppingList() {
    this.slService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.recipe.id);
    this.router.navigate(["/recipes"]);
  }
}
