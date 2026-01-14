import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import { ReclamacaoSection } from "../../components/reclamacao-section/reclamacao-section";

@Component({
  selector: 'app-reclamacao',
  imports: [Navbar, Footer, ReclamacaoSection],
  templateUrl: './reclamacao.html',
  styleUrl: './reclamacao.css',
})
export class Reclamacao {

}
