import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css'],
})
export class EditarProductoComponent implements OnInit {
  id: string = '';

  fgValidador: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.BuscarProducto();
  }

  BuscarProducto() {
    this.servicioProducto
      .ObtenerRegistrosPorId(this.id)
      .subscribe((datos: ModeloProducto) => {
        this.fgValidador.controls['id'].setValue(this.id);
        this.fgValidador.controls['nombre'].setValue(datos.name);
        this.fgValidador.controls['descripcion'].setValue(datos.description);
        this.fgValidador.controls['stock'].setValue(datos.stock);
        this.fgValidador.controls['valorUnitario'].setValue(datos.unitValue);
        this.fgValidador.controls['descuento'].setValue(datos.discount);
        this.fgValidador.controls['imagen'].setValue(datos.image);
      });
  }

  EditarProducto() {
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
    p.id = this.id;
    this.servicioProducto.ActualizarProducto(p).subscribe(
      (datos: ModeloProducto) => {
        alert('Producto Actualizado Correctamente');
        this.router.navigate(['/administracion/listar-productos']);
      },
      (error: any) => {
        alert('Error Actualizando el producto');
      }
    );
  }
}
