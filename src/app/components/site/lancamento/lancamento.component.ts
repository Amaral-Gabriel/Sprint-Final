import { Component, OnInit, HostListener } from '@angular/core';
import { HeaderSiteComponent } from '../sharedSite/header-site/header-site.component';
import { FooterSiteComponent } from '../sharedSite/footer-site/footer-site.component';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

interface CarData {
    nome: string;
    preco: string;
    alturaVeiculo: string;
    alturaSolo: string;
    capacidadeCarga: string;
    motor: string;
    potencia: string;
    volumeCacamba: string;
    roda: string;
    image: string;
}

@Component({
  selector: 'app-lancamento',
  standalone: true,
  imports: [HeaderSiteComponent, FooterSiteComponent, CommonModule],
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})

export class LancamentoComponent implements OnInit {
  

  cars: CarData[] = [
    {
        nome: "RANGER XL",
        preco: "227.990,00",
        alturaVeiculo: "1821",
        alturaSolo: "232",
        capacidadeCarga: "1.234",
        motor: "2.2 Duratorq",
        potencia: "160 cv @3.200 rpm",
        volumeCacamba: "1.180",
        roda: "16\" aço",
        image: "img/XL Cabine.jpg"
    },
    {
        nome: "RANGER XLS",
        preco: "262.590,00",
        alturaVeiculo: "1821",
        alturaSolo: "232",
        capacidadeCarga: "1.076",
        motor: "2.2 Duratorq",
        potencia: "160 cv @ 3200 rpm",
        volumeCacamba: "1.180",
        roda: "17\" liga leve",
        image: "img/xls 2.2 diesel.jpg"
    },
    {
        nome: "RANGER STORM",
        preco: "272.690,00",
        alturaVeiculo: "1821",
        alturaSolo: "232",
        capacidadeCarga: "1.040",
        motor: "2.2 Duratorq",
        potencia: "200 cv @3.000 rpm",
        volumeCacamba: "1.180",
        roda: "17\" liga leve",
        image: "img/storm.jpg"
    }
  ];

  carInstances: Car[] = [];

  carsToCompare: Car[] = [];
  
  errorMessage: string = '';
  showCompareTable: boolean = false;

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Lançamentos Ford');

    this.carInstances = this.cars.map((car, index) => {
      return new Car(
        index,
        car.nome,
        car.preco,
        car.alturaVeiculo,
        car.alturaSolo,
        car.capacidadeCarga,
        car.motor,
        car.potencia,
        car.volumeCacamba,
        car.roda,
        car.image
      );
    });
  }

  onCheckboxChange(event: Event, carIndex: number): void {
    const checkbox = event.target as HTMLInputElement;
    const selectedCar = this.carInstances[carIndex];
    
    if (checkbox.checked) {
      if (this.carsToCompare.length >= 2) {

        checkbox.checked = false;
        this.errorMessage = "Máximo de 2 veículos para comparação.";
        return;
      }
      
      if (!this.carsToCompare.some(car => car.index === carIndex)) {
        this.carsToCompare.push(selectedCar);
      }
    } else {

      const indexToRemove = this.carsToCompare.findIndex(car => car.index === carIndex);
      if (indexToRemove !== -1) {
        this.carsToCompare.splice(indexToRemove, 1);
      }
    }
    
    this.errorMessage = '';
    console.log("Carros selecionados:", this.carsToCompare);
  }

  showCompare(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    
    if (this.carsToCompare.length !== 2) {

      this.errorMessage = "Selecione 2 veículos para comparação.";
      return;
    }
    
    this.errorMessage = '';
    this.showCompareTable = true;
    
    document.body.classList.add('modal-open');
  }

  hideCompare(): void {
    this.showCompareTable = false;

    document.body.classList.remove('modal-open');
  }

  onOverlayClick(event: MouseEvent): void {

    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.hideCompare();
    }
  }

  onDialogClick(event: MouseEvent): void {

    event.stopPropagation();
  }
  
  @HostListener('document:keydown.escape')
  onEscKeydown() {
    if (this.showCompareTable) {
      this.hideCompare();
    }
  }
}

class Car {
  constructor(
    public index: number,
    public nome: string,
    public preco: string,
    public alturaVeiculo: string,
    public alturaSolo: string,
    public capacidadeCarga: string,
    public motor: string,
    public potencia: string,
    public volumeCacamba: string,
    public roda: string,
    public image: string
  ) {}
}
