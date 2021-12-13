import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavegacionComponent } from './plantilla/barra-navegacion/barra-navegacion.component';
import { PiePaginaComponent } from './plantilla/pie-pagina/pie-pagina.component';
import { InicioComponent } from './plantilla/inicio/inicio.component';
import { ErrorComponent } from './plantilla/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductoDetallesComponent } from './plantilla/producto-detalles/producto-detalles.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { CarruselImagenesComponent } from './plantilla/carrusel-imagenes/carrusel-imagenes.component';
import { ModalComponent } from './plantilla/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacionComponent,
    PiePaginaComponent,
    InicioComponent,
    ErrorComponent,
    ProductoDetallesComponent,
    CarruselImagenesComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
