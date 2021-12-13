import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { AdministracionService } from 'src/app/servicios/administracion.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-buscar-persona',
  templateUrl: './buscar-persona.component.html',
  styleUrls: ['./buscar-persona.component.css'],
})
export class BuscarPersonaComponent implements OnInit {
  id: string = '';
  u_name: string = '';
  u_lastName: string = '';
  u_identification: string = '';
  u_address: string = '';
  u_email: string = '';
  u_phone: string = '';

  constructor(
    private router: Router,
    private seguridadServicio: SeguridadService,
    private administracionServicio: AdministracionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    let datos = this.seguridadServicio.ObtenerInformacionSesion();
    if (datos != null) {
      this.id = datos.datas.id;
    }

    this.ObtenerDatosPerfil();
  }

  ObtenerDatosPerfil() {
    let userData = this.administracionServicio
      .ObtenerPersonaPorId(this.id)
      .subscribe((datos: ModeloPersona) => {
        this.u_name = String(datos.name);
        this.u_lastName = String(datos.lastName);
        this.u_identification = String(datos.documentNumber);
        this.u_address = String(datos.address);
        this.u_email = String(datos.email);
        this.u_phone = String(datos.phone);
      });
  }

  editarRouter() {
    this.router.navigate([`/administracion/editarPerfil/${this.id}`]);
  }
}
