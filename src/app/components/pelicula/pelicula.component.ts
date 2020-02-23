import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: []
})
export class PeliculaComponent implements OnInit {

  pelicula:any;
  regresarA:string = '';
  busqueda:string = '';

  constructor(public _ps:PeliculasService,
    public route:ActivatedRoute) {

      this.route.params.subscribe(parametro => {
        //console.log(parametro);
        this.regresarA = parametro['pag'];

        if(parametro['busqueda']){
          this.busqueda = parametro['busqueda'];
        }

        this._ps.getPelicula(parametro['id']).subscribe(pelicula => {
          //console.log(pelicula);
          this.pelicula = pelicula
        });
      });

    }

  ngOnInit(): void {
  }

}
