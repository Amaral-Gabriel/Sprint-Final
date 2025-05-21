import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderSiteComponent } from '../sharedSite/header-site/header-site.component';
import { FooterSiteComponent } from '../sharedSite/footer-site/footer-site.component';
import { Title } from '@angular/platform-browser';

interface Contato {
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  tipoContato: string;
  mensagem: string;
  data: string;
}

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderSiteComponent, FooterSiteComponent]
})
export class ContatoComponent implements OnInit {
  @ViewChild('contatoForm') contatoForm!: NgForm;
  @ViewChild('nomeInput') nomeInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('sobrenomeInput') sobrenomeInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput') emailInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('telefoneInput') telefoneInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('tipoContatoSelect') tipoContatoSelectRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('mensagemTextarea') mensagemTextareaRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('lgpdCheckbox') lgpdCheckboxRef!: ElementRef<HTMLInputElement>;
  @ViewChild('formElement') formElementRef!: ElementRef<HTMLFormElement>;
  @ViewChild('confirmacaoElement') confirmacaoElementRef!: ElementRef<HTMLDivElement>;
  @ViewChild('strongName') strongNameRef!: ElementRef<HTMLElement>;
  @ViewChild('textTipo') textTipoRef!: ElementRef<HTMLElement>;

  mensage_Base: Contato[] = []; 
  erro_Mensage: string = '';

  formData: Contato = {
    nome: '',
    sobrenome: '',
    email: '',
    telefone: '',
    tipoContato: '',
    mensagem: '',
    data: ''
  };

  constructor(private renderer: Renderer2, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Contato Ford');
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (!this.nomeInputRef || !this.sobrenomeInputRef || !this.emailInputRef || 
        !this.telefoneInputRef || !this.tipoContatoSelectRef || !this.mensagemTextareaRef || 
        !this.lgpdCheckboxRef) {
      console.error('Elementos do formulário não estão disponíveis');
      return;
    }

    const nome = this.nomeInputRef.nativeElement.value.trim();
    const sobrenome = this.sobrenomeInputRef.nativeElement.value.trim();
    const email = this.emailInputRef.nativeElement.value.trim();
    const telefone = this.telefoneInputRef.nativeElement.value;
    const tipoContato = this.tipoContatoSelectRef.nativeElement.value;
    const mensagem = this.mensagemTextareaRef.nativeElement.value.trim();
    const data = new Date().toLocaleString();

    if (!this.checkNome(nome)) {
      this.erro_Mensage = "Verifique o primeiro nome.";
      this.renderer.setStyle(this.nomeInputRef.nativeElement, 'borderColor', 'rgb(255, 55, 55)');
      return;
    } else {
      this.clearErro();
    }

    if (!this.checkNome(sobrenome)) {
      this.erro_Mensage = "Verifique o último nome.";
      this.renderer.setStyle(this.sobrenomeInputRef.nativeElement, 'borderColor', 'rgb(255, 55, 55)');
      return;
    } else {
      this.renderer.setStyle(this.sobrenomeInputRef.nativeElement, 'borderColor', 'black');
    }

    if (!this.checkEmail(email)) {
      this.erro_Mensage = "Digite um email válido.";
      this.renderer.setStyle(this.emailInputRef.nativeElement, 'borderColor', 'rgb(255, 55, 55)');
      return;
    } else {
      this.renderer.setStyle(this.emailInputRef.nativeElement, 'borderColor', 'black');
    }

    if (!this.checkPhone(telefone)) {
      this.erro_Mensage = "Digite um telefone válido. Apenas números";
      this.renderer.setStyle(this.telefoneInputRef.nativeElement, 'borderColor', 'rgb(255, 55, 55)');
      return;
    } else {
      this.renderer.setStyle(this.telefoneInputRef.nativeElement, 'borderColor', 'black');
    }

    if (tipoContato === "") {
      this.erro_Mensage = "Selecione o tipo de contato";
      this.renderer.setStyle(this.tipoContatoSelectRef.nativeElement, 'borderColor', 'rgb(255, 55, 55)');
      return;
    } else {
      this.renderer.setStyle(this.tipoContatoSelectRef.nativeElement, 'borderColor', 'black');
    }

    if (this.checkMensage(mensagem)) {
      this.erro_Mensage = "A mensagem deve conter pelo menos 10 caracteres.";
      this.renderer.setStyle(this.mensagemTextareaRef.nativeElement, 'borderColor', 'rgb(255, 55, 55)');
      return;
    } else {
      this.renderer.setStyle(this.mensagemTextareaRef.nativeElement, 'borderColor', 'black');
    }

    if (!this.checkLGPD()) {
      this.erro_Mensage = "Aceitação obrigatória dos Termos e Condições para continuar";
      this.renderer.setStyle(this.lgpdCheckboxRef.nativeElement, 'borderColor', 'rgb(255, 55, 55)');
      return;
    } else {
      this.renderer.setStyle(this.lgpdCheckboxRef.nativeElement, 'borderColor', 'black');
    }

    this.clearErro();

    const contato: Contato = {
      nome,
      sobrenome,
      email,
      telefone,
      tipoContato,
      mensagem,
      data
    };
    
    this.mensage_Base.push(contato);
    console.log(this.mensage_Base);
    
    if (this.formElementRef && this.confirmacaoElementRef) {
      this.renderer.setStyle(this.formElementRef.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.confirmacaoElementRef.nativeElement, 'display', 'flex');
    }
    
    this.confirmacao(nome, tipoContato);
  }

  clearErro(): void {
    this.erro_Mensage = "";
    if (this.nomeInputRef) {
      this.renderer.setStyle(this.nomeInputRef.nativeElement, 'borderColor', 'black');
    }
  }

  checkNome(value: string): boolean { 
    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{3,}$/;
    return nomeRegex.test(value);
  }

  checkMensage(value: string): boolean {
    return value.length < 10;
  }

  checkEmail(value: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  }

  checkPhone(value: string): boolean {
    const phoneRegex = /^\(\d{2}\) 9 \d{4}-\d{4}$/;
    return phoneRegex.test(value);
  }

  mascaraTelefone(input: HTMLInputElement): void {
    let valor = input.value.replace(/\D/g, "");
    
    if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
    }

    if (valor.length > 7) {
      valor = valor.replace(/(\(\d{2}\) \d)(\d)/, "$1 $2");
    }

    if (valor.length > 11) {
      valor = valor.replace(/(\(\d{2}\) \d \d{4})(\d)/, "$1-$2");
    }
    
 
    if (valor.length > 16) {
      valor = valor.substring(0, 15);
    }

    input.value = valor;
    

    this.formData.telefone = valor;
  }

  confirmacao(nome: string, tipo_contato: string): void {
    if (this.strongNameRef && this.textTipoRef) {
      this.renderer.setProperty(this.strongNameRef.nativeElement, 'innerHTML', `${nome}`);
      
      if (tipo_contato === "Elogio") {
        this.renderer.setProperty(this.textTipoRef.nativeElement, 'innerHTML', "o seu elogio");
      } else {
        this.renderer.setProperty(this.textTipoRef.nativeElement, 'innerHTML', `a sua ${tipo_contato.toLowerCase()}`);
      }
    }
  }

  closeConfirmation(event: Event): void {
    event.preventDefault();
    
    if (this.confirmacaoElementRef && this.formElementRef) {
      this.renderer.setStyle(this.confirmacaoElementRef.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.formElementRef.nativeElement, 'display', 'flex');
    }
    
    if (this.contatoForm) {
      this.contatoForm.resetForm(); 
    }
    
    this.erro_Mensage = ""; 
    
    if (this.nomeInputRef) {
      this.renderer.setStyle(this.nomeInputRef.nativeElement, 'borderColor', 'black'); 
    }
  }

  checkLGPD(): boolean {
    return this.lgpdCheckboxRef ? this.lgpdCheckboxRef.nativeElement.checked : false;
  }
  
  
  onTelefoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.mascaraTelefone(input);
  }
}
