import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { IdentificacionComponent } from './identificacion/identificacion.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    IdentificacionComponent,
    CambioClaveComponent,
    RecuperarClaveComponent,
    CerrarSesionComponent,
    RegistroComponent,
    CaptchaComponent,
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    RecaptchaModule,
  ],
})
export class SeguridadModule {}
