import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Contacto } from '../../components/contacto/contacto';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-pagina-contacto',
  imports: [Navbar, Contacto, Footer],
  templateUrl: './pagina-contacto.html',
  styleUrl: './pagina-contacto.css',
})
export class PaginaContacto {

}
