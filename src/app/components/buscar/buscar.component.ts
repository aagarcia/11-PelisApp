import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: []
})
export class BuscarComponent implements OnInit {

  buscar: string;

  constructor(public _ps:PeliculasService,
              public route:ActivatedRoute) {
                this.route.params.subscribe(parametro => {
                  //console.log(parametro);
                  if(parametro['texto']){
                    this.buscar = parametro['texto'];
                    this.buscarPelicula();
                  }
                });
              }

  ngOnInit(): void {
  }

  buscarPelicula(){
    if(this.buscar.length == 0){
      return;
    }

    this._ps.buscarPelicula(this.buscar).subscribe(/*data => console.log(data)*/);
  }

}
