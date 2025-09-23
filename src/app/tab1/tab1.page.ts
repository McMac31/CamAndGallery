import { Component } from '@angular/core';
import { PhotoService, UserPhoto } from '../services/photo';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule,FormsModule]
})
export class Tab1Page {
   searchText: string = '';
  filteredPhotos: UserPhoto[] = [];
  constructor(public photoService: PhotoService) {}
   ngOnInit() {
    this.filteredPhotos = this.photoService.photos;
  }

  filterPhotos() {
    const text = this.searchText.toLowerCase();
    this.filteredPhotos = this.photoService.photos.filter(photo =>
      photo.filepath.toLowerCase().includes(text)
    );
  }
}