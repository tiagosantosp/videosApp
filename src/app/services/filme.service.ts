import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IListaFilmes } from '../models/IFilmeApi.model';
import { ToastController } from '@ionic/angular';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  lingua = 'pt-BR';
  regiao = 'BR';

  private apiURL = 'https://api.themoviedb.org/3/';
  private key = '?api_key=0dec6abdf9d45060cef6a8489229dab5';

  constructor(private http: HttpClient, public toastController: ToastController ) { }

  buscarFilmes(busca: string): Observable<IListaFilmes> {
    const url =`${this.apiURL}search/movie${this.key}&language=${this.lingua}&region=${this.regiao}&query=${busca}`;

    return this.http.get<IListaFilmes>(url).pipe(
      map(returno => returno),
      catchError(erro => this.exibirErro(erro))
    );

  }

  async exibirErro(err) {
    const toast = await this.toastController.create({
      message: 'Filme não encontrado.',
      duration: 2000,
      color: 'danger',
      position: 'middle'
    });
    toast.present();
    return null;
  }

}
