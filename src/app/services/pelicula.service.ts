import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula';

@Injectable()
export class PeliculaService {
  public peliculas: Pelicula[];

  constructor() {
    this.peliculas = [
      new Pelicula(
        'Spiderman 4',
        2019,
        'https://upload.wikimedia.org/wikipedia/commons/9/90/Spiderman.JPG'
      ),
      new Pelicula(
        'Los Vengadores Endgame',
        2018,
        'https://as.com/tikitakas/imagenes/2019/04/06/portada/1554566621_000164_1554566834_noticia_normal.jpg'
      ),
      new Pelicula(
        'Batman vs Superman',
        2011,
        'https://i1.wp.com/www.vinilonegro.com/wp-content/uploads/2016/03/Batman-v-Superman-3-e1459165974655.jpg?fit=600%2C400&ssl=1'
      ),
    ];
  }

  holaMundo() {
    return 'Hola Mundo desde un servicio de Angular';
  }

  getPeliculas() {
      return this.peliculas;
  }
}
