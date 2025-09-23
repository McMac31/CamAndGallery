import { Component } from '@angular/core';
import { PhotoService } from '../services/photo';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [CommonModule, IonicModule]
})
export class Tab2Page {
  constructor(public photoService: PhotoService) {}
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}