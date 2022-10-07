import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_KEY, AuthLocalStorageName, AuthPayload, AuthResponse } from "../interfaces/auth.interface";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { User, UserProps } from "../interfaces/user.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  signup(payload: AuthPayload) {
    return this.http
      .post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
        ...payload,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError))
      .pipe(
        tap((response) => {
          this.handleAuthentication(response);
        }),
      );
  }

  signIn(payload: AuthPayload) {
    return this.http
      .post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
        ...payload,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError))
      .pipe(
        tap((response) => {
          this.handleAuthentication(response);
        }),
      );
  }

  autoLogin() {
    const userData: UserProps = JSON.parse(localStorage.getItem(AuthLocalStorageName));

    if (!userData) return;

    const loadedUser = new User(userData);

    if (!loadedUser.token) return;

    const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
    return this.user.next(loadedUser);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem(AuthLocalStorageName);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(userData: AuthResponse) {
    const expirationDate = new Date(new Date().getTime() + userData.expiresIn * 1000);
    const user = new User({
      email: userData.email,
      id: userData.localId,
      _token: userData.idToken,
      _tokenExpirationDate: expirationDate,
    });

    this.user.next(user);
    this.autoLogout(userData.expiresIn * 1000);
    localStorage.setItem(AuthLocalStorageName, JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";

    if (!errorRes?.error?.error?.message) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case "EMAIL_NOT_FOUND":
      case "INVALID_PASSWORD":
        errorMessage = "Invalid email or password!";
        break;

      default:
        break;
    }

    return throwError(errorMessage);
  }
}
