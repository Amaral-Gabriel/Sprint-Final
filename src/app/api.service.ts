import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api-ford.onrender.com';

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vehicles`);
  }

  getVehicleData(vin: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/vehicleData`, { vin });
  }
}
