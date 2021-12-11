import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { AdministracionService } from 'src/app/servicios/administracion.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css'],
})
export class CrearPersonaComponent implements OnInit {
  isRegister: boolean = false;
  captcha: string = '';
  email: string = '';

  fgValidador: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    address: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    recaptcha: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servicioAdministracion: AdministracionService,
    private servicioSeguridad: SeguridadService
  ) {
    this.captcha = '';
    this.email = 'prueba@gmail.com';
  }

  ngOnInit(): void {}

  GuardarUsuario() {
    let name = this.fgValidador.controls['name'].value;
    let lastName = this.fgValidador.controls['lastName'].value;
    let address = this.fgValidador.controls['address'].value;
    let email = this.fgValidador.controls['email'].value;
    let phone = this.fgValidador.controls['phone'].value;

    let data = {
      name: name,
      lastName: lastName,
      address: address,
      email: email,
      phone: phone,
    };

    console.log(data);

    let p = new ModeloPersona();

    p.name = name;
    p.lastName = lastName;
    p.address = address;
    p.email = email;
    p.phone = phone;
    this.servicioAdministracion.CrearUsuario(p).subscribe(
      (datos: ModeloPersona) => {
        alert('Usuario Registrado Correctamente');
        this.router.navigate(['/seguridad/identificar']);
      },
      (error: any) => {
        alert('Error al Registrar el Usuario');
      }
    );
  }

  resolved(captchaResponse: string) {
    this.fgValidador.controls['recaptcha'].setValue('valid');
    this.captcha = captchaResponse;
    console.log('resolved captcha with response: ' + this.captcha);
  }
}
