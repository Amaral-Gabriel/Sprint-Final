import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header-site',
  standalone: true, // <- ESSENCIAL!
  imports: [],
  templateUrl: './header-site.component.html',
  styleUrls: ['./header-site.component.css']
})

export class HeaderSiteComponent {
  // Abre o menu
  openBurguer(): void {
    const menu = document.getElementById('itens');
    if (menu) {
      menu.classList.add('aberto');
    }
  }

  // Fecha o menu
  closeBurguer(): void {
    const menu = document.getElementById('itens');
    if (menu) {
      menu.classList.remove('aberto');
    }
  }

  // Fecha o menu quando clicar fora
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const menu = document.getElementById('itens');
    const menuBurguer = document.getElementById('menu_Burguer');
    
    if (menu && menuBurguer) {
      if (!menu.contains(event.target as Node) && !menuBurguer.contains(event.target as Node)) {
        menu.classList.remove('aberto');
      }
    }
  }
}