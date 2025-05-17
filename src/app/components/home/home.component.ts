import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}

  cards = [ // List of  vehicles
    { id: 1, name: 'Ranger', img: 'img/ranger-frente.jpg' },
    { id: 2, name: 'Mustang', img: 'img/mustang-frente.jpg' },
    { id: 3, name: 'Mustang', img: 'img/mustang-traseira.jpg' },
    { id: 4, name: 'Ford antigo', img: 'img/ford-antigo.jpg' },
    { id: 5, name: 'Ford de corrida', img: 'img/ford-corrida.jpg' },
    { id: 6, name: 'Mustang', img: 'img/mustang-antigo-frente.jpg' },
    { id: 7, name: 'Mustang', img: 'img/mustang-fundo.jpg' },
  ];

  setId: number = 0;

  ngOnInit() {
    this.setBgImage();
  }

  ngAfterViewInit() {
    this.setBgImage();
  }

  setBgImage() {
    if (isPlatformBrowser(this.platformId)) { // Verify is it's on server
      const myElement = document.getElementById("bgBig"); // Work only on Browser

      const setId: number = Math.floor(Math.random() * 7);

      if (myElement) {
        const imgSrc = this.cards[setId].img;
        const imgAlt = this.cards[setId].name;

        myElement.style.backgroundImage = `url('${imgSrc}')`;

        const imageElement = document.getElementById("myImage") as HTMLImageElement;
        if (imageElement) {
          imageElement.alt = imgAlt;
        }
      }
    }
  }
}
