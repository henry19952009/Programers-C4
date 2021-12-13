import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css'],
})
export class RecuperarClaveComponent implements OnInit {
  fgValidador: FormGroup = this.fb.group({
    usuario: ['', [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servicioSeguridad: SeguridadService
  ) {}

  ngOnInit(): void {}

  RecuperarClave() {
    let usuario = this.fgValidador.controls['usuario'].value;
    let clave = '23safasfasf';
    console.log(usuario);
    this.servicioSeguridad.RecuperarContraseña(usuario, clave).subscribe(
      (datos: any) => {
        alert('Contraseña Nueva Enviada Al Correo Electrónico');
        this.router.navigate(['/seguridad/identificar']);
      },
      (error: any) => {
        alert('El Correo no se encuentra Registrado');
      }
    );
  }
}
