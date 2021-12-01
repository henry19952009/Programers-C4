import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-producto-detalles',
  templateUrl: './producto-detalles.component.html',
  styleUrls: ['./producto-detalles.component.css'],
})
export class ProductoDetallesComponent implements OnInit {
  id: string = '';
  registroProducto: ModeloProducto | undefined;
  p_name: string = '';
  p_description: string = '';
  p_stock: number = 0;
  p_unitValue: number = 0;
  p_discount: string = '';
  p_vat: number = 0;
  p_total: number = 0;
  p_image: string = '';

  // id?: string;
  // name?: string;
  // description?: string;
  // stock?: number;
  // unitValue?: number;
  // discount?: number;
  // vat?: number;
  // total?: number;
  // orderId?: string;
  // image?: string;

  constructor(
    private productoServicio: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.ObtenerDatosProducto();
  }

  ObtenerDatosProducto() {
    this.productoServicio
      .ObtenerRegistrosPorId(this.id)
      .subscribe((datos: ModeloProducto) => {
        this.registroProducto = datos;
        // console.log(datos);
        console.log(this.registroProducto);
        this.p_name = String(this.registroProducto.name);
        this.p_description = String(this.registroProducto.description);
        this.p_stock = Number(this.registroProducto.stock);
        this.p_unitValue = Number(this.registroProducto.unitValue);
        this.p_discount = String(this.registroProducto.discount);
        this.p_vat = Number(this.registroProducto.vat);
        this.p_total = Number(this.registroProducto.total);
        this.p_image = String(this.registroProducto.image);
      });
  }
}
