import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent { // Login class
  loginObj: Login;
  errorMessage: string = '';  
  successMessage: string = ''; 
  typePassword: string = "";
  showPasswordType: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.loginObj = new Login();
  }

  showPassword(): void { // Change password visibility
    this.showPasswordType = !this.showPasswordType;
  }

  onLogin() {
    // Clear previous messages
    this.errorMessage = '';
    this.successMessage = '';

    // Check if inputs are correctly
    if (this.loginObj.EmailId.trim() === "" || this.loginObj.Password.trim() === "") {
      this.errorMessage = 'Please fill in all the fields!';
      return;
    }

    // Change the port HERE
    const url = `https://api-ford.onrender.com/login`; // Set the port

    this.http.post(url, { // Send data to server
      nome: this.loginObj.EmailId,
      senha: this.loginObj.Password
    }).subscribe({ // Wait for the response
      next: (response: any) => { // If success
        this.successMessage = 'Login successful!';
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', 'fake-jwt-token');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      },
      error: (err) => { // If error
        if (err.status === 400 || err.status === 401) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Error while logging in.';
        }
        console.error('Erro:', err);
      }
    });
  }
}

export class Login { // Login data class
  EmailId: string;
  Password: string;

  constructor() {
    this.EmailId = '';
    this.Password = '';
  }
}


