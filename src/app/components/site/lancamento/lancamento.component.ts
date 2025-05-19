import { Component, OnInit } from '@angular/core';
import { HeaderSiteComponent } from '../sharedSite/header-site/header-site.component';
import { FooterSiteComponent } from '../sharedSite/footer-site/footer-site.component';
import { CommonModule } from '@angular/common';

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
  
  // Tabela de carros
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

  // Classe para instanciar carros
  carInstances: Car[] = [];
  
  // Array para armazenar os carros selecionados
  carsToCompare: Car[] = [];

  constructor() { }

  ngOnInit(): void {
    // Inicializa os carros
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

    // Inicializa a tabela e os eventos após o carregamento do DOM
    setTimeout(() => {
      this.createCarTableCells();
      this.handleCompareSelection();
      
      const botaoComparar = document.querySelector('.botao_Comparar');
      if (botaoComparar) {
        botaoComparar.addEventListener('click', (event: Event) => {
          this.showCompare(event);
        });
      }

      document.addEventListener("click", (event: MouseEvent) => {
        const tabela = document.getElementById("div_Comparacao");
        const target = event.target as HTMLElement;
        
        if (tabela && 
            tabela.style.display === "flex" && 
            !tabela.contains(target) && 
            !target.closest('.botao_Comparar')) {
          this.hideCompare();
        }
      });
    });
  }

  // Função para criar as células da tabela
  createCarTableCells(): void {
    const tabela = document.querySelector('.tabela tr');
    if (!tabela) return;
    
    tabela.classList.add('table_Cars');
    tabela.innerHTML = '';
    
    this.carInstances.forEach((car) => {
      const td = document.createElement('td');
      td.innerHTML = `
        <img src="${car.image}" alt="${car.nome}">
        <div class="info_Carro">
          <div class="titulo_Carro">
            <a href="#"><p>${car.nome}</p></a>
          </div>
          <div class="titulo_Preco">
            <input type="checkbox" name="compare" class="input_Box" 
                   data-car-index="${car.index}">
            <p class="preco">A partir de R$ ${car.preco} <a href=""><img id="simbolo_Info" src="img/info.png" alt="Simbolo de informação"></a></p>
          </div>
        </div>
      `;
      tabela.appendChild(td);
    });
  }

  // Função principal de comparação
  handleCompareSelection(): void {
    document.querySelectorAll('.input_Box').forEach((checkbox: Element) => {
      const checkboxElement = checkbox as HTMLInputElement;

      checkboxElement.addEventListener('change', () => {
        const carIndex = Number(checkboxElement.dataset['carIndex']);
        const selectedCar = this.carInstances[carIndex];

        const div_Erro = document.getElementById("erro_Div");
        if (!div_Erro) return;

        if (checkboxElement.checked) {
          if (this.carsToCompare.length >= 2) { // Trata erro
            checkboxElement.checked = false;
            
            div_Erro.style.display = "flex";
            const erroSpan = document.getElementById("erro_Span");
            if (erroSpan) {
              erroSpan.innerHTML = "Máximo de 2 veículos para comparação.";
            }
            return;
          }
          // Adiciona se o carro não estiver na lista
          if (!this.carsToCompare.some(car => car.index === carIndex)) {
            this.carsToCompare.push(selectedCar);
          }
        } else {
          // Remove usando findIndex para garantir que remove o certo
          const indexToRemove = this.carsToCompare.findIndex(car => car.index === carIndex);
          if (indexToRemove !== -1) {
            this.carsToCompare.splice(indexToRemove, 1); // Remove o index do selecionado
          }
        }
        div_Erro.style.display = "none";
        console.log("Carros selecionados:", this.carsToCompare); // Para debug
      });
    });
  }

  // Função para exibir comparação
  showCompare(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    
    const div_Erro = document.getElementById("erro_Div");
    if (!div_Erro) return;
    
    if (this.carsToCompare.length !== 2) {
      // Mensagem de erro
      const erroSpan = document.getElementById("erro_Span");
      if (erroSpan) {
        erroSpan.innerHTML = "Selecione 2 veículos para comparação.";
      }
      div_Erro.style.display = "flex";
      return;
    }
    
    div_Erro.style.display = "none";
    this.updateCompareTable(); // Chama função para atualizar tabela
    
    const divComparacao = document.getElementById("div_Comparacao");
    if (divComparacao) {
      divComparacao.style.display = "flex"; // Exibe tabela após a atualização
    }
  }

  // Atualiza tabela
  updateCompareTable(): void {
    //Pega os 2 carros selecionados
    const item1 = this.carsToCompare[0];
    const item2 = this.carsToCompare[1];

    // Função auxiliar para atualizar elementos por ID
    const updateElement = (id: string, value: string): void => {
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = value;
      }
    };

    // Muda todos os dados dos carros na tabela
    updateElement("compare_image_0", `<img class="image_Table" src="${item1.image}">`);
    updateElement("compare_image_1", `<img class="image_Table" src="${item2.image}">`);
    
    updateElement("compare_modelo_0", item1.nome);
    updateElement("compare_modelo_1", item2.nome);
    
    updateElement("compare_alturaveiculo_0", item1.alturaVeiculo);
    updateElement("compare_alturaveiculo_1", item2.alturaVeiculo);

    updateElement("compare_alturasolo_0", item1.alturaSolo);
    updateElement("compare_alturasolo_1", item2.alturaSolo);

    updateElement("compare_capacidadecarga_0", item1.capacidadeCarga);
    updateElement("compare_capacidadecarga_1", item2.capacidadeCarga);

    updateElement("compare_motor_0", item1.motor);
    updateElement("compare_motor_1", item2.motor);

    updateElement("compare_potencia_0", item1.potencia);
    updateElement("compare_potencia_1", item2.potencia);

    updateElement("compare_volumecacamba_0", item1.volumeCacamba);
    updateElement("compare_volumecacamba_1", item2.volumeCacamba);

    updateElement("compare_roda_0", item1.roda);
    updateElement("compare_roda_1", item2.roda);

    updateElement("compare_preco_0", item1.preco);
    updateElement("compare_preco_1", item2.preco);
  }

  // Esconde a tabela
  hideCompare(): void {
    const divComparacao = document.getElementById("div_Comparacao");
    if (divComparacao) {
      divComparacao.style.display = "none";
    }
    
    const sectionBtn = document.getElementById("section_Btn");
    if (sectionBtn) {
      sectionBtn.style.display = "flex";
    }
  }
}

// Classe para instanciar carros
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
