import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Geolocation,Position } from '@capacitor/geolocation';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string; // Ruta para mostrar la imagen
  created:number;
  lat?: number;
  lng?: number;
  id?: string; 
}
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: UserPhoto[] = [];
  constructor() { }
  async getCurrent(): Promise<Position> {
    return await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
  }

  // Método principal para tomar una foto y añadirla a la galería
  public async addNewToGallery() {
    try {
      const position = await this.getCurrent();
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        quality: 100
      });
      
      const savedImageFile = await this.savePicture(capturedPhoto);
      this.photos.unshift(savedImageFile);
      if (position) {
        savedImageFile.lat = position.coords.latitude;
        savedImageFile.lng = position.coords.longitude;
      }

    } catch (error) {
      console.warn('Error tomando foto', error);
    }
  }

  // Guardar la foto en el filesystem
  private async savePicture(photo: Photo): Promise<UserPhoto> {
    const base64Data = await this.readAsBase64(photo);
    const fileName = new Date().getTime() + '.jpeg';

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });
    return {
    filepath: fileName,
  webviewPath: photo.webPath,
  created: Date.now(),
    };
  }

  // Convertir Photo a base64
  private async readAsBase64(photo: Photo): Promise<string> {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;
  }

  // Convierte blob a base64
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
export { Photo };

