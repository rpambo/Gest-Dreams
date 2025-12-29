import { Component } from '@angular/core';
import { SlidesProgram } from "../../components/slides-program/slides-program";
import { Navbar } from "../../components/navbar/navbar";
import { Servicos } from "../../components/servicos/servicos";
import { Footer } from "../../components/footer/footer";
import { Estrategia } from "../../components/estrategia/estrategia";

@Component({
  selector: 'app-programa',
  imports: [SlidesProgram, Navbar, Servicos, Footer, Estrategia],
  templateUrl: './programa.html',
  styleUrl: './programa.css',
})
export class Programa {

}
