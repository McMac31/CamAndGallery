import { Component } from '@angular/core';
import { PhotoService } from '../services/photo';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular'; // ToastController ya no es necesario aquí

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class Tab1Page {
  
  constructor(public photoService: PhotoService) {}
  
  async addPhotoToGallery() {
    await this.photoService.addNewToGallery();
  }
}