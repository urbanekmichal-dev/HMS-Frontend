import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestapiService } from '../shared/restapi.service';



@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private authService: RestapiService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
        const isAuthenticated = this.authService.getRoleUserLogged().includes(next.data.role[0])
        const isAuthenticated1 = this.authService.getRoleUserLogged().includes(next.data.role[1])  
        const isAuthenticated2 = this.authService.getRoleUserLogged().includes(next.data.role[2])

        if (isAuthenticated || isAuthenticated1 || isAuthenticated2) {
            return true;
        }
        else {
            this.router.navigateByUrl('/login');
        }
        return true;
    }
}
