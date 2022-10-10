import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSubscription: Subscription;
  currentLang = "en";

  constructor(private translate: TranslateService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  // onChangeLanguage() {
  //   const lang = localStorage.getItem("language") || "en";

  //   const switchedLang = lang === "en" ? "jp" : "en";

  //
  // }

  onChangeEnLang() {
    this.translate.use("en");
    localStorage.setItem("language", "en");
    this.currentLang = "en";
  }

  onChangeJpLang() {
    this.translate.use("jp");
    localStorage.setItem("language", "jp");
    this.currentLang = "jp";
  }

  onChangeViLang() {
    this.translate.use("vi");
    localStorage.setItem("language", "vi");
    this.currentLang = "vi";
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
