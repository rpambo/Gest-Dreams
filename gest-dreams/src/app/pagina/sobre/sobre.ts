import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import { ClientesParceiro } from '../../components/clientes-parceiro/clientes-parceiro';
import { QuemSomos } from "../../components/quem-somos/quem-somos";
import { Founder } from "../../components/founder/founder";
import { RouterLink } from "@angular/router";
import { MetricasHome } from "../../components/metricas-home/metricas-home";
import { Historia } from "../../components/historia/historia";
import { Essencia } from "../../components/essencia/essencia";

@Component({
  selector: 'app-sobre',
  imports: [Navbar, Footer, ClientesParceiro, QuemSomos, Founder, RouterLink, MetricasHome, Historia, Essencia],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css',
})
export class Sobre {

}
