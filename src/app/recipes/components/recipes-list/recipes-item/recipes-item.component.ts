import { Component, Input, OnInit } from "@angular/core";
import { Recipe } from "src/app/recipes/recipes.interface";

@Component({
  selector: "app-recipes-item",
  templateUrl: "./recipes-item.component.html",
  styleUrls: ["./recipes-item.component.scss"],
})
export class RecipesItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor() {}

  ngOnInit(): void {}
}
