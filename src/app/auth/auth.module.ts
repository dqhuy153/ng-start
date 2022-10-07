import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./containers/login/auth.component";
import { HomeModule } from "../home/home.module";

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule, HomeModule],
})
export class AuthModule {}
