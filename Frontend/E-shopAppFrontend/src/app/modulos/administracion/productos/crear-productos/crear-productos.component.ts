import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css'],
})
export class CrearProductosComponent implements OnInit {
  fgValidador: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    valorUnitario: ['', [Validators.required]],
    descuento: ['', [Validators.required]],
    imagen: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private servicioProducto: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  GuardarProducto() {
    // "name": "string",
    // "description": "string",
    // "stock": 0,
    // "unitValue": 0,
    // "discount": 0,
    // "vat": 0,
    // "total": 0,
    // "orderId": "string"
    let nombre = this.fgValidador.controls['nombre'].value;
    let descripcion = this.fgValidador.controls['descripcion'].value;
    let stock = parseInt(this.fgValidador.controls['stock'].value);
    let valorUnitario = parseInt(
      this.fgValidador.controls['valorUnitario'].value
    );
    let descuento = parseInt(this.fgValidador.controls['descuento'].value);
    let iva = 19;
    let total = valorUnitario * (1 + iva / 100);
    let idCompra = ' ';
    let imagen = this.fgValidador.controls['imagen'].value;
    let p = new ModeloProducto();
    p.name = nombre;
    p.description = descripcion;
    p.stock = stock;
    p.unitValue = valorUnitario;
    p.discount = descuento;
    p.vat = iva;
    p.total = total;
    p.orderId = idCompra;
    p.image = imagen;
    this.servicioProducto.CrearProducto(p).subscribe(
      (datos: ModeloProducto) => {
        alert('Producto Almacenado Correctamente');
        this.router.navigate(['/administracion/listar-productos']);
      },
      (error: any) => {
        alert('Error almacenando el producto');
      }
    );
  }
}
