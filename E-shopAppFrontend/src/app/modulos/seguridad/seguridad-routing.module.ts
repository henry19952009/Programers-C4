import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaptchaComponent } from './captcha/captcha.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { IdentificacionComponent } from './identificacion/identificacion.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';

const routes: Routes = [
  {
    path: 'identificar',
    component: IdentificacionComponent,
  },
  {
    path: 'cerrarSesion',
    component: CerrarSesionComponent,
  },
  {
    path: 'recuperarClave',
    component: RecuperarClaveComponent,
  },
  {
    path: 'captcha',
    component: CaptchaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguridadRoutingModule {}
