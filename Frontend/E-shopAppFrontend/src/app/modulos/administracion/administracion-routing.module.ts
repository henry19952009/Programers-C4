import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPersonaComponent } from './personas/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './personas/editar-persona/editar-persona.component';
import { BuscarProductoComponent } from './productos/buscar-producto/buscar-producto.component';
import { CrearProductosComponent } from './productos/crear-productos/crear-productos.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';

const routes: Routes = [
  {
    path: 'crear-persona',
    component: CrearPersonaComponent,
  },
  {
    path: 'editar-persona',
    component: EditarPersonaComponent,
  },
  {
    path: 'listar-productos',
    component: BuscarProductoComponent,
  },
  {
    path: 'crear-productos',
    component: CrearProductosComponent,
  },
  {
    path: 'editar-producto/:id',
    component: EditarProductoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracionRoutingModule {}
