import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apiKey:string = 'XXXXXXXXXXXXXXXXXXXXXX';
  private urlMoviedb:string = 'https://api.themoviedb.org/3';

  peliculas:any[] = [];

  constructor( private http:HttpClient ) { }

  getCartelera(){

    let desde = new Date();
    let hasta = new Date();
    hasta.setDate(hasta.getDate() + 7);

    let desdeStr = `${ desde.getFullYear() }-${ ('0' + (desde.getMonth()+1)).slice(-2) }-${ ("0" + desde.getDate()).slice(-2) }`;
    let hastaStr = `${ hasta.getFullYear() }-${ ('0' + (hasta.getMonth()+1)).slice(-2) }-${ ("0" + hasta.getDate()).slice(-2) }`;

    let url = `${ this.urlMoviedb }/discover/movie?primary_release_date.gte=${ desdeStr }&primary_release_date.lte=${ hastaStr }&api_key=${ this.apiKey }&language=es`;

    return this.http.get(url)
                    .pipe(map((res: any) => res.results));
  }

  getPopulares(){
    let url = `${ this.urlMoviedb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apiKey }&language=es`;

    return this.http.get(url)
                    .pipe(map((res: any) => res.results));
  }

  getPopularesNinos(){
    let url = `${ this.urlMoviedb }/discover/movie?certification_country=US&certification=G&sort_by=popularity.desc&api_key=${ this.apiKey }&language=es`;

    return this.http.get(url)
                    .pipe(map((res: any) => res.results));
  }

  buscarPelicula(texto:string){
    let url = `${ this.urlMoviedb }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apiKey }&language=es`;

    return this.http.get(url)
                    .pipe(map((res: any) => { this.peliculas = res.results; return res.results; }));
  }

  getPelicula(id:string){
    let url = `${ this.urlMoviedb }/movie/${ id }?api_key=${ this.apiKey }&language=es`;

    return this.http.get(url)
                    .pipe(map((res: any) => res));
  }
}
