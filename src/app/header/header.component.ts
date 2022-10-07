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

  constructor(private translate: TranslateService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  onChangeLanguage() {
    const lang = localStorage.getItem("language") || "en";

    const switchedLang = lang === "en" ? "jp" : "en";

    this.translate.use(switchedLang);
    localStorage.setItem("language", switchedLang);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
