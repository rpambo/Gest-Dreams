import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-transforme',
  templateUrl: './transforme.html',
  imports:[CommonModule],
  styleUrls: ['./transforme.css']
})
export class Transforme {
  mostrarFormulario = false;
  passoAtual = 0;

  iniciarFormulario() {
    this.mostrarFormulario = true;
    this.passoAtual = 0;
  }

  proximoPasso() {
    this.passoAtual++;
  }
  anterioPasso() {
    this.passoAtual--;
  }
}