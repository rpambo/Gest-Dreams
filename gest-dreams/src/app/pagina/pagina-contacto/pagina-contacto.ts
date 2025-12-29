import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Contacto } from '../../components/contacto/contacto';
import { Footer } from '../../components/footer/footer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pagina-contacto',
  imports: [Navbar, Contacto, Footer, ReactiveFormsModule],
  templateUrl: './pagina-contacto.html',
  styleUrl: './pagina-contacto.css',
})

export class PaginaContacto {

  applyForm : FormGroup;

  constructor(private fb: FormBuilder){
    this.applyForm = this.fb.group({
      name : ['', Validators.required]
    })
  }

}
