import { NgModule, Type } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { RecipesDetailComponent } from "./recipes-detail/recipes-detail.component";
import { RecipesEditComponent } from "./recipes-edit/recipes-edit.component";
import { RecipesListModule } from "./recipes-list/recipes-list.module";
import { RecipesStartComponent } from "./recipes-start/recipes-start.component";

const recipesComponents: Array<Type<any>> = [RecipesDetailComponent, RecipesEditComponent, RecipesStartComponent];

@NgModule({
  declarations: [...recipesComponents],
  imports: [SharedModule, RecipesListModule],
  exports: [...recipesComponents],
})
export class RecipesComponentsModule {}
