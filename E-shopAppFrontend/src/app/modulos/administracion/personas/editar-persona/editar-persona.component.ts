import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { AdministracionService } from 'src/app/servicios/administracion.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css'],
})
export class EditarPersonaComponent implements OnInit {
  id: string = '';
  u_email: string = '';
  u_key: string = '';

  fgValidador: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    identification: ['', [Validators.required]],
    address: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private seguridadServicio: SeguridadService,
    private administracionServicio: AdministracionService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.ObtenerDatosPerfil();
  }

  ObtenerDatosPerfil() {
    let userData = this.administracionServicio
      .ObtenerPersonaPorId(this.id)
      .subscribe((datos: ModeloPersona) => {
        this.fgValidador.controls['id'].setValue(this.id);
        this.fgValidador.controls['name'].setValue(datos.name);
        this.fgValidador.controls['lastName'].setValue(datos.lastName);
        this.fgValidador.controls['identification'].setValue(
          datos.documentNumber
        );
        this.fgValidador.controls['address'].setValue(datos.address);
        this.fgValidador.controls['phone'].setValue(datos.phone);
        this.u_email = String(datos.email);
        this.u_key = String(datos.key);
      });
  }

  GuardarPerfil() {
    let name = this.fgValidador.controls['name'].value;
    let lastName = this.fgValidador.controls['lastName'].value;
    let identification = this.fgValidador.controls['identification'].value;
    let address = this.fgValidador.controls['address'].value;
    let phone = this.fgValidador.controls['phone'].value;
    let user = new ModeloPersona();
    user.name = name;
    user.lastName = lastName;
    user.documentNumber = identification;
    user.address = address;
    user.email = this.u_email;
    user.phone = phone;
    user.id = this.id;
    user.key = this.u_key;

    console.log(user);
    this.administracionServicio.ActualizarPersona(user).subscribe(
      (datos: ModeloPersona) => {
        alert('Perfil Actualizado Correctamente');
        this.router.navigate(['/administracion/perfil']);
      },
      (error: any) => {
        alert('Error Actualizando El Perfil');
      }
    );
  }
}
