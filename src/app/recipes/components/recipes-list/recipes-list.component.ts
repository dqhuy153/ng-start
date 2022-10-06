import { RecipesService } from "../../services/recipes.service";
import { Component, OnInit } from "@angular/core";
import { Recipe } from "../../recipes.interface";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipes-list",
  templateUrl: "./recipes-list.component.html",
  styleUrls: ["./recipes-list.component.scss"],
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(private recipesService: RecipesService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.recipesService.recipesChanged.subscribe((recipes) => {
      this.recipes = recipes;
    });

    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(["recipes", "new"]);
  }
}
