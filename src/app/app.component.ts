import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink} from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dash-Ford';
}