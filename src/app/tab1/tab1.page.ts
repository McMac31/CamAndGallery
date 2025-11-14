import { Component } from '@angular/core';
import { PhotoService } from '../services/photo';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class Tab1Page {
  constructor(public photoService: PhotoService,private toastCtrl: ToastController ) {}
  async addPhotoToGallery() {
    try {
      await this.photoService.addNewToGallery();
      const toast = await this.toastCtrl.create({
        message: 'Foto guardada',
        duration: 3000,
        color: 'success',
        position: 'top'
      });
      await toast.present();
    } catch (error) {
      console.error(error);
      const toast = await this.toastCtrl.create({
        message: 'Error al guardar la foto',
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
    }
  }
}
