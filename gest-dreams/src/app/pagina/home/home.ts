import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Slides } from "../../components/slides/slides";
import { QuemSomos } from "../../components/quem-somos/quem-somos";
import { Impacto } from "../../components/impacto/impacto";
import { Servicos } from "../../components/servicos/servicos";
import { VamosComecar } from "../../components/vamos-comecar/vamos-comecar";

@Component({
  selector: 'app-home',
  imports: [Navbar, Slides, QuemSomos, Impacto, Servicos, VamosComecar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
