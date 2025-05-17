import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  logout() { // Remove acesso do usuário
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login'], { replaceUrl: true }).then(() => {
      window.location.reload();
    });
  }
}
