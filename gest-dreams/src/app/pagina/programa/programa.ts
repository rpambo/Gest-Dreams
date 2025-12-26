import { Component } from '@angular/core';
import { SlidesProgram } from "../../components/slides-program/slides-program";
import { Navbar } from "../../components/navbar/navbar";
import { Servicos } from "../../components/servicos/servicos";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-programa',
  imports: [SlidesProgram, Navbar, Servicos, Footer],
  templateUrl: './programa.html',
  styleUrl: './programa.css',
})
export class Programa {

}
