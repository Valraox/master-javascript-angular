import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mi-componente',
  templateUrl: './mi-componente.component.html',
  styleUrls: ['./mi-componente.component.css'],
})
export class MiComponenteComponent implements OnInit {
  public titulo: string;
  public comentario :string;
  public year: number;
  public mostrarPeliculas: boolean;

  constructor() {
    this.titulo = "Hola mundo, soy Mi Componente";
    this.comentario = "Este es mi primer componente";
    this.year = 2021;
    this.mostrarPeliculas = true;
    console.log('Componente mi-compoente cargado!!');
  }

  ngOnInit(): void {}

  ocultarPeliculas()
  {
    this.mostrarPeliculas = false;
  }
}
