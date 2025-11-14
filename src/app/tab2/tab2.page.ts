import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LlamadaApi, FotoApi } from '../services/llamada-api';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class Tab2Page {
  public photos$!: Observable<FotoApi[]>;

  constructor(
    private api: LlamadaApi,
    private alertController: AlertController
  ) {}
  ngOnInit() {
    this.loadPhotos();
  }
  ionViewWillEnter() {
    this.loadPhotos();
  }
  loadPhotos() {
    this.photos$ = this.api.getPhotos();
  }

  async deletePhoto(photo: FotoApi) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres borrar esta foto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Borrar',
          handler: async () => {
            try {
              await this.api.deletePhoto(photo.id).toPromise();
              this.loadPhotos();
            } catch (error) {
              console.error('Error borrando foto:', error);
            }
          }
        }
      ]
    });
    await alert.present();
  }
}