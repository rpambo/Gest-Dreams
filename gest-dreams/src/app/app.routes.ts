import { Routes } from '@angular/router';
import { Home } from './pagina/home/home';
import { Sobre } from './pagina/sobre/sobre';
import { PaginaContacto } from './pagina/pagina-contacto/pagina-contacto';
import { Programa } from './pagina/programa/programa';
import { Transforme } from './pagina/transforme/transforme';

export const routes: Routes = [
    {path:'', component:Home},
    {path:'sobre-gestdreams', component: Sobre},
    {path:'contacto', component: PaginaContacto},
    {path:'programas', component: Programa},
    {path:'formulario', component: Transforme}
];
