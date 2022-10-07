import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthPayload, AuthResponse } from "../../interfaces/auth.interface";
import { AuthFormData } from "../../interfaces/form.interface";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  authForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.authForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.authForm.valid) return;

    const formValues = this.authForm.value as AuthFormData;
    const authPayload: AuthPayload = {
      email: formValues.email,
      password: formValues.password,
    };
    let authObservable: Observable<AuthResponse>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObservable = this.authService.signIn(authPayload);
    } else {
      authObservable = this.authService.signup(authPayload);
    }

    authObservable.subscribe(
      (response) => {
        console.log("res", response);
        this.authForm.reset();
        this.error = null;
        this.isLoading = false;
        this.router.navigate(["/"]);
      },
      (errorMessage: string) => {
        this.error = errorMessage;
        this.isLoading = false;
      },
    );
  }
}
