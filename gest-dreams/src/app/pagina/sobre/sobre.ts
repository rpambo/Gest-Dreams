import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import { Metricas } from '../../components/metricas/metricas';
import { InovacaoSobre } from '../../components/inovacao-sobre/inovacao-sobre';
import { ClientesParceiro } from '../../components/clientes-parceiro/clientes-parceiro';

@Component({
  selector: 'app-sobre',
  imports: [Navbar, Footer, Metricas, InovacaoSobre, ClientesParceiro],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css',
})
export class Sobre {

}
