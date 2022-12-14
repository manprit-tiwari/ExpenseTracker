import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AuthorizGuard implements CanActivate{

    constructor(
        private router: Router
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const auth_token = localStorage.getItem('auth_token');
        if (auth_token) {
            return true;
        }
        else {
            this.router.navigate(['/auth']);
            return false;
        }
    }

}