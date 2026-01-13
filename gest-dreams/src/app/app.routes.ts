import { Routes } from '@angular/router';
import { Home } from './pagina/home/home';
import { Sobre } from './pagina/sobre/sobre';
import { PaginaContacto } from './pagina/pagina-contacto/pagina-contacto';
import { Programa } from './pagina/programa/programa';
import { Transforme } from './pagina/transforme/transforme';
import { PoliticaCockiees } from './pagina/politica-cockiees/politica-cockiees';
import { TermoDeUso } from './pagina/termo-de-uso/termo-de-uso';

export const routes: Routes = [
    {path:'', component:Home},
    {path:'sobre-gestdreams', component: Sobre},
    {path:'contacto', component: PaginaContacto},
    {path:'programas', component: Programa},
    {path:'perfil-empresa', component: Transforme},
    {path:'politica-de-privacidade-e-cookies', component: PoliticaCockiees},
    {path:'termo-de-uso', component: TermoDeUso}
];
