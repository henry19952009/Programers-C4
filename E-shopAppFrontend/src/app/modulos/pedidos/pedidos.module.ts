import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { AsignarPedidoComponent } from './asignar-pedido/asignar-pedido.component';
import { CarritoComprasComponent } from './carrito-compras/carrito-compras.component';


@NgModule({
  declarations: [
    AsignarPedidoComponent,
    CarritoComprasComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule
  ]
})
export class PedidosModule { }
