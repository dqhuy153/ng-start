import { NgModule } from "@angular/core";
import { NoPreloading, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@core/guards/auth.guard";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "recipes",
    loadChildren: () => import("./recipes/recipes.module").then((m) => m.RecipesModule),
    canActivate: [AuthGuard],
  },
  {
    path: "shopping-list",
    loadChildren: () => import("./shopping-list/shopping-list.module").then((m) => m.ShoppingListModule),
  },
  {
    path: "forms",
    loadChildren: () => import("./forms/forms.module").then((m) => m.FormsModule),
  },
  {
    path: "dc",
    loadChildren: () => import("./dynamic-components/dc.module").then((m) => m.DCModule),
  },

  {
    path: "patterns",
    loadChildren: () => import("./patterns/patterns.module").then((m) => m.PatternsModule),
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading, relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
