import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloPersona } from '../modelos/persona.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root',
})
export class AdministracionService {
  url = 'http://localhost:3000';
  token: String = '';
  constructor(
    private http: HttpClient,
    private seguridadServicio: SeguridadService
  ) {
    this.token = this.seguridadServicio.ObtenerToken();
  }

  UsuarioEstaRegistrado(usuario: string) {}

  CrearUsuario(usuario: ModeloPersona): Observable<ModeloPersona> {
    return this.http.post<ModeloPersona>(`${this.url}/people`, usuario, {
      headers: new HttpHeaders({}),
    });
  }

  ObtenerUsuarios(): Observable<ModeloPersona[]> {
    return this.http.get<ModeloPersona[]>(`${this.url}/people`);
  }

  ObtenerPersonaPorId(id: string): Observable<ModeloPersona> {
    return this.http.get<ModeloPersona>(`${this.url}/people/${id}`);
  }

  ObtenerPersonaPorEmail(email: string): Observable<ModeloPersona> {
    return this.http.get<ModeloPersona>(`${this.url}/people/${email}`);
  }

  ActualizarPersona(persona: ModeloPersona): Observable<ModeloPersona> {
    return this.http.put<ModeloPersona>(
      `${this.url}/people/${persona.id}`,
      persona,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  EliminarPersona(id: string): Observable<any> {
    return this.http.delete(`${this.url}/people/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
}
