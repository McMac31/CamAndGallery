import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonicModule]
})
export class Tab3Page {
  lat?: number;
  lng?: number;

  constructor() {}

  async getLocation() {
  try {
    const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    this.lat = pos.coords.latitude;
    this.lng = pos.coords.longitude;
    alert(`Ubicación obtenida: Latitud ${this.lat}, Longitud ${this.lng}`);
  } catch (e: any) {
    console.error('Error al obtener ubicación', e);
    alert(`Error al obtener ubicación: code=${e.code} message=${e.message}`);
  }
}
}
