import { RecipesComponent } from "./recipes.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesEditComponent } from "./components/recipes-edit/recipes-edit.component";
import { RecipesDetailComponent } from "./components/recipes-detail/recipes-detail.component";

const routes: Routes = [
  {
    path: "",
    component: RecipesComponent,
    // canActivate: [AuthG]
    children: [
      { path: "new", component: RecipesEditComponent },
      { path: ":id", component: RecipesDetailComponent },
      { path: ":id/edit", component: RecipesEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
