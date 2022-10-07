import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from "@core/core.module";
import { DropdownDirective } from "@shared/directives/dropdown.directive";
import { SharedModule } from "@shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { HeaderModule } from "./header/header.module";
import { HomeModule } from "./home/home.module";

// import mockServer from "./_be-mocks";

// mockServer();

const APP_CORE_CONFIG = {
  defaultLanguage: "en",
  appName: "Shopping List",
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    CoreModule.forRoot(APP_CORE_CONFIG),
    SharedModule,

    // app
    // NavigationModule,
    HeaderModule,
    AppRoutingModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
