import { RecipesRoutingModule } from "./../../recipes-routing.module";
import { RecipesListComponent } from "./recipes-list.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecipesItemComponent } from "./recipes-item/recipes-item.component";

@NgModule({
  declarations: [RecipesListComponent, RecipesItemComponent],
  imports: [CommonModule, RecipesRoutingModule],
  exports: [RecipesListComponent, RecipesItemComponent],
})
export class RecipesListModule {}
