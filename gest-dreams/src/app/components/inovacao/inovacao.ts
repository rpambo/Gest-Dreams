import { Component } from '@angular/core';
import { Estrategia } from "../estrategia/estrategia";
import { OndaSection } from "../onda-section/onda-section";

@Component({
  selector: 'app-inovacao',
  imports: [Estrategia, OndaSection],
  templateUrl: './inovacao.html',
  styleUrl: './inovacao.css',
})
export class Inovacao {

}
