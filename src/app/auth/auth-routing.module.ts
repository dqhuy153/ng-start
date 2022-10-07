import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { AuthComponent } from "./containers/login/auth.component";

const authRoutes: Routes = [
  {
    path: "",
    // redirectTo: "/recipes",
    // pathMatch: "full",
    component: HomeComponent,
  },
  {
    path: "auth",
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
