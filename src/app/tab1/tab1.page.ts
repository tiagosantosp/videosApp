import { IFilmes } from '../models/IFilme.model';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DadosService } from '../services/dados.service';
import { Router } from '@angular/router';
import { FilmeService } from '../services/filme.service';
import { IListaFilmes, IFilmeApi } from '../models/IFilmeApi.model';
import { GeneroService } from '../services/genero.service';
import { IGenero } from '../models/IGenero.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit{
  titulo = 'Videos App';

  listaVideos: IFilmes[] = [
    {
      nome: 'The Flash (2014)',
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lJA2RCMfsWoskqlQhXPSLFQGXEJ.jpg',
      classificacao: 78,
      duracao: '44 min',
      generos: ['Drama', 'Sci-Fi', 'Fantasy'],
      lancamento: '07/10/2021',
      pagina: '/flash',
    },
    {
      nome: 'Venom: Tempo de Carnificina (2021)',
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/h5UzYZquMwO9FVn15R2eK2itmHu.jpg',
      classificacao: 72,
      duracao: '1h 37min',
      generos: ['Ficção científica', 'Ação', 'Aventura'],
      lancamento: '07/10/2021',
      pagina: '/venon',
    },
  ];

  listaFilmes: IListaFilmes;

  generos: string[] = [];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public dadosService: DadosService,
    public route: Router,
    public filmeService: FilmeService,
    public generoService: GeneroService,
  ) {}

    buscarFilmes(evento: any) {
      console.log(evento.target.value);
      const busca = evento.target.value;
      if(busca && busca.trim() !== ''){
        this.filmeService.buscarFilmes(busca).subscribe(dados => {
          console.log(dados);
          this.listaFilmes = dados;
        });
      }
    }

  exibirFilme(filme: IFilmeApi) {
    this.dadosService.guardarDados('filme', filme);
    this.route.navigateByUrl('/dados-filme');
  }

  async exibirAlertaFavorito() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!',
      message: 'Deseja favoritar o Filme?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Sim',
          handler: () => this.presentToast(),
        },
      ],
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'filme favoritado!',
      duration: 2000,
    });
    toast.present();
  }

  ngOnInit() {
    this.generoService.buscarGeneros().subscribe(dados => {
      console.log('generos: ', dados.genres);
      dados.genres.forEach(genero => {
        this.generos[genero.id] = genero.name;
      });

      this.dadosService.guardarDados('generos', this.generos);
    });
  }
}
