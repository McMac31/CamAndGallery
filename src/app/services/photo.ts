import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Geolocation,Position } from '@capacitor/geolocation';
import { LlamadaApi } from './llamada-api'; // <-- IMPORTAR
import { ToastController } from '@ionic/angular'; // <-- IMPORTAR

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
  
  // INYECTAR Api y Toast
  constructor(
    private api: LlamadaApi, 
    private toastCtrl: ToastController
  ) { }

  async getCurrent(): Promise<Position> {
    return await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
  }

  // Método principal para tomar una foto y añadirla a la galería
  public async addNewToGallery() {
    try {
      // 1. Obtener posición y foto
      const position = await this.getCurrent();
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        quality: 100
      });

      // 2. Preparar datos
      const base64Data = await this.readAsBase64(capturedPhoto);
      const fileName = new Date().getTime() + '.jpeg';
      const geoString = position ? `${position.coords.latitude},${position.coords.longitude}` : 'No location';

      // 3. Guardar localmente
      const savedImageFile = await this.savePicture(capturedPhoto, base64Data, fileName);
      if (position) {
        savedImageFile.lat = position.coords.latitude;
        savedImageFile.lng = position.coords.longitude;
      }
      this.photos.unshift(savedImageFile);

      // 4. Preparar datos para la API
      const photoData = {
        izena: 'Miguel', // Como en tu endpoint /get/Miguel
        photo_name: fileName,
        photo_base64: base64Data,
        photo_geo: geoString
      };

      // 5. Subir foto a la API (usamos toPromise para esperarlo)
      await this.api.uploadPhoto(photoData).toPromise();

      // 6. Notificar éxito
      const toast = await this.toastCtrl.create({
        message: 'Foto guardada y subida correctamente',
        duration: 3000,
        color: 'success',
        position: 'top'
      });
      await toast.present();

    } catch (error) {
      console.error('Error en addNewToGallery', error);
      // Notificar error
      const toast = await this.toastCtrl.create({
        message: 'Error al procesar la foto',
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
    }
  }

  // Modificado para aceptar datos y no repetir lógica
  private async savePicture(photo: Photo, base64Data: string, fileName: string): Promise<UserPhoto> {
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