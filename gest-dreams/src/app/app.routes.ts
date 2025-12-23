import { Routes } from '@angular/router';
import { Home } from './pagina/home/home';
import { Sobre } from './pagina/sobre/sobre';

export const routes: Routes = [
    {path:'', component:Home},
    {path:'sobre', component: Sobre}
];
