import { Component, OnInit } from '@angular/core';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  listadoRegistros: ModeloProducto[] = [];
  constructor(private productoServicio: ProductoService) {}

  ngOnInit(): void {
    this.ObtenerListadoProductos();
  }

  ObtenerListadoProductos() {
    this.productoServicio
      .ObtenerRegistros()
      .subscribe((datos: ModeloProducto[]) => {
        this.listadoRegistros = datos;
      });
  }
}
