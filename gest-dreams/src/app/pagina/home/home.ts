import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Slides } from "../../components/slides/slides";
import { Servicos } from "../../components/servicos/servicos";
import { Footer } from "../../components/footer/footer";
import { ClientesParceiro } from "../../components/clientes-parceiro/clientes-parceiro";
import { MetricasHome } from "../../components/metricas-home/metricas-home";
import { Estrategia } from "../../components/estrategia/estrategia";
import { Founder } from "../../components/founder/founder";

@Component({
  selector: 'app-home',
  imports: [Navbar, Slides, Servicos, Footer, ClientesParceiro, MetricasHome, Estrategia, Founder],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
