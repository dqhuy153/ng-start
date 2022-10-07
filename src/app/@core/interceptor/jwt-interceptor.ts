import { take, exhaustMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  logStyle = "color: red; font-size: 1rem;";

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(request);
        }

        // add a custom header
        request = request.clone({
          // params: new HttpParams().set('auth', user?.token),
          setHeaders: {
            authorization: `Bearer ${user?.token}`,
          },
        });

        return next.handle(request);
      }),
    );
  }
}
