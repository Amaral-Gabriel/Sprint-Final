import { Component } from '@angular/core';
import { HeaderSiteComponent } from '../sharedSite/header-site/header-site.component';
import { FooterSiteComponent } from '../sharedSite/footer-site/footer-site.component'; 
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-site',
  standalone: true,
  imports: [CommonModule, HeaderSiteComponent, FooterSiteComponent, RouterModule, RouterLink],
  templateUrl: './home-site.component.html',
  styleUrls: ['./home-site.component.css']
})
export class HomeSiteComponent {
  // Dados do carrossel
  carouselItems = [
    {
      image: "img/imagem_1.jpg",
      title: "Esta é a nova Ranger Ford 2022",
      url: "/lancamentos"
    },
    {
      image: "img/imagem_2.jpg",
      title: "Nossa história",
      url: "https://corporate.ford.com/about/history.html"
    },
    {
      image: "img/imagem_3.jpg",
      title: "Nova Ford Bronco Sport 2022",
      url: "https://www.ford.com.br/suvs-e-crossovers/bronco-sport/"
    }
  ];
  currentIndex = 0;

  constructor(private router: Router, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Home Ford');
  }

  isExternalLink(url: string): boolean {
  return url.startsWith('https://');
}

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
  }
  // Muda para o slide anterior
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
  }

}