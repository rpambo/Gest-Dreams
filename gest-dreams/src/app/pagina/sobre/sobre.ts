import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import { ClientesParceiro } from '../../components/clientes-parceiro/clientes-parceiro';
import { QuemSomos } from "../../components/quem-somos/quem-somos";

@Component({
  selector: 'app-sobre',
  imports: [Navbar, Footer, ClientesParceiro, QuemSomos],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css',
})
export class Sobre {

}
