import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header.component';



@Component({
  imports: [CommonModule, FormsModule, HeaderComponent],
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})

export class DashBoardComponent implements OnInit {
  vehicles: any[] = [];
  img: string = '';  
  totalVendas: number = 0;
  conectados: number = 0;
  updateSoftware: number = 0;
  selectedVehicle: any = null;
  vehicleData: any = null;
  vinInput: string = ''; 
  errorMessage: string = '';
  isLoading: boolean = false;
  inputInvalido: boolean = false;
  nameVehicles: string = "";
  
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles() { 
    this.isLoading = true;
    this.api.getVehicles().subscribe({ // Get data e wait for response
      next: (response: any) => { // If success
        this.vehicles = response.vehicles;
        
        if (this.vehicles.length > 0) { // If not empty
          this.selectedVehicle = this.vehicles[0];  
          this.img = this.selectedVehicle.img + '?' + new Date().getTime(); // Force get the latest image from server
          this.totalVendas = this.selectedVehicle.volumetotal;
          this.conectados = this.selectedVehicle.connected;
          this.updateSoftware = this.selectedVehicle.softwareUpdates;
          this.nameVehicles = this.selectedVehicle.vehicle;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar veículos.';
        this.isLoading = false;
      }
    });
  }

  onVehicleSelect(event: Event) { // Get select car
    let selectElement = event.target as HTMLSelectElement;
    if (selectElement && selectElement.value) { // Check if it's valid
      const vehicleId = selectElement.value;
      this.selectedVehicle = this.vehicles.find(v => v.id === Number(vehicleId));
   
      if (this.selectedVehicle) {
        this.img = this.selectedVehicle.img + '?' + new Date().getTime();
        this.totalVendas = this.selectedVehicle.volumetotal;
        this.conectados = this.selectedVehicle.connected;
        this.updateSoftware = this.selectedVehicle.softwareUpdates;
        this.nameVehicles = this.selectedVehicle.vehicle;
      }
    }
  }

  searchForVin() {
    if (!this.vinInput) return;
  
    this.isLoading = true;
    this.api.getVehicleData(this.vinInput).subscribe({ // Get data e wait for response
      next: (data: any) => {
        this.vehicleData = data;
        this.errorMessage = '';
        this.isLoading = false;
        this.inputInvalido = false; // VIN found
      },
      error: (err) => {
        this.vehicleData = null;
        this.errorMessage = err.error?.message || 'Erro ao buscar dados do veículo';
        this.isLoading = false;
        this.inputInvalido = true; // VIN invalid
      }
    });
  }
  }

