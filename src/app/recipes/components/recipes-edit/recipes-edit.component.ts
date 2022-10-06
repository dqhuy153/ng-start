import { ActivatedRoute, Params, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { RecipesService } from "../../services/recipes.service";
import { Ingredient } from "src/app/shopping-list/shopping-list.interface";
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: "app-recipes-edit",
  templateUrl: "./recipes-edit.component.html",
  styleUrls: ["./recipes-edit.component.scss"],
})
export class RecipesEditComponent implements OnInit {
  id: string;
  isEdit: boolean = false;
  recipeForm: FormGroup;

  get ingredientsControls() {
    return (this.recipeForm.get("ingredients") as FormArray).controls;
  }

  constructor(private route: ActivatedRoute, private recipesService: RecipesService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params["id"];
      this.id = id;
      this.isEdit = id != null;

      this.initForm();
    });
  }

  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);

    if (this.isEdit) {
      const recipe = this.recipesService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe["ingredients"]) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            }),
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      }),
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  onSubmit() {
    if (this.isEdit) {
      this.recipesService.updateRecipe({ ...this.recipeForm.value, id: this.id });
    } else {
      this.recipesService.addRecipe({ ...this.recipeForm.value, id: uuidv4() });
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
