import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}

  canActivate(): boolean {
    // Verify is on browser
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      
      if (!token || !isLoggedIn) { // Verify is logged e has a token
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      return true; // Always permit on server
    }
    return true; 
  }
}
