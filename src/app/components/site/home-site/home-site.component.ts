import { Component } from '@angular/core';
import { HeaderSiteComponent } from '../sharedSite/header-site/header-site.component';
import { FooterSiteComponent } from '../sharedSite/footer-site/footer-site.component'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-site',
  standalone: true,
  imports: [CommonModule, HeaderSiteComponent, FooterSiteComponent],
  templateUrl: './home-site.component.html',
  styleUrls: ['./home-site.component.css']
})
export class HomeSiteComponent {
  // Dados do carrossel
  carouselItems = [
    {
      image: "img/imagem_1.jpg",
      title: "Esta é a nova Ranger Ford 2022",
      url: "lancamento"
    },
    {
      image: "img/imagem_2.jpg",
      title: "Nossa história",
      url: "https://corporate.ford.com/about/history.html"
    },
    {
      image: "img/imagem_3.jpg",
      title: "Nova Ford Bronco Sport 2022",
      url: "#"
    }
  ];
  currentIndex = 0;

 

  // Muda para o próximo slide
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
  }

  // Muda para o slide anterior
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
  }

  // Vai para um slide específico
  goToSlide(index: number) {
    this.currentIndex = index;
  }
}