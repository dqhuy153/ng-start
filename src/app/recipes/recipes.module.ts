import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponentsModule } from "./components/recipesComponents.module";
import { RecipesComponent } from "./recipes.component";
import { RecipesListModule } from "./components/recipes-list/recipes-list.module";

@NgModule({
  declarations: [RecipesComponent],
  imports: [CommonModule, SharedModule, RecipesRoutingModule, RecipesComponentsModule, RecipesListModule],
})
export class RecipesModule {}
