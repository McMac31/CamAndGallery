import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EstacionMeteorologica } from '../services/estacion-meteorologica';
import { Vibracion } from '../services/vibracion';
import { addIcons } from 'ionicons';
import { searchOutline,sunnyOutline, rainyOutline, thunderstormOutline, snowOutline, cloudyOutline, partlySunnyOutline,thermometerOutline,waterOutline,flagOutline,locationOutline,umbrellaOutline } from 'ionicons/icons';

export interface Ciudad{
  nombre: string;
  nombreCompleto:string
  ubicacion: {lat:number, lon:number};
  clima:{
    temperatura: number;
    minTemp: number;
    maxTemp: number;
    humedad: number;
    descripcion: string;
    velocidadViento: number;
    icon: string;
    sensacionTermica: number;
    precipitacion: number;
    indiceUV: number;
  };
}
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class Tab4Page {
 
  constructor(private clima: EstacionMeteorologica,  private vibracion: Vibracion) { 
    //Iconos clima
    addIcons({
      searchOutline,
      sunnyOutline,
      rainyOutline,
      thunderstormOutline,
      snowOutline,
      cloudyOutline,
      partlySunnyOutline,
      thermometerOutline,
      waterOutline,
      flagOutline,
      locationOutline,
      umbrellaOutline
    });
  }

  // Binding del searchbar
  public searchQuery: string = '';

  //Objeto ciudad 
  public ciudad: Ciudad={
    nombre: '',
    nombreCompleto: '',
    ubicacion: {lat:0, lon:0},
    clima: {
      temperatura:0,
      minTemp:0,
      maxTemp:0,
      humedad:0, 
      descripcion:'',
      velocidadViento:0,
      icon: 'sunny-outline',
      sensacionTermica: 0,
      precipitacion: 0,
      indiceUV: 0
    }
  };

  //Obtener icono segun descripcion
  private getIconForWeather(description: string): string {
    const desc = description.toLowerCase();
    if (desc.includes('soleado') || desc.includes('despejado')) {
      return 'sunny-outline';
    } else if (desc.includes('lluvia') || desc.includes('llovizna') || desc.includes('aguacero')) {
      return 'rainy-outline';
    } else if (desc.includes('tormenta') || desc.includes('rayos')) {
      return 'thunderstorm-outline';
    } else if (desc.includes('nieve') || desc.includes('nevada')) {
      return 'snow-outline';
    } else if (desc.includes('nublado') || desc.includes('nubes')) {
      return 'cloudy-outline';
    } else if (desc.includes('parcialmente nuboso') || desc.includes('niebla')) {
      return 'partly-sunny-outline';
    } else {
      return 'partly-sunny-outline';
    }
  }

  //Boton buscar clima
  buscarClima() {
    const ciudadIngresada = this.searchQuery;
    if (!ciudadIngresada) { 
      this.ciudad.nombre = ''; 
      return;
    }

    // LLamada a wttr.in) ---
    this.clima.getClima(ciudadIngresada).subscribe((dataClima) => {
      if (dataClima && dataClima.current_condition) {
        const current = dataClima.current_condition[0];
        const weather = dataClima.weather[0];

        // Rellenamos todos los datos descriptivos
        this.ciudad.clima.descripcion = current.lang_es[0].value;
        this.ciudad.clima.icon = this.getIconForWeather(this.ciudad.clima.descripcion);
        this.ciudad.clima.humedad = parseFloat(current.humidity);
        this.ciudad.clima.velocidadViento = parseFloat(current.windspeedKmph);
        this.ciudad.clima.minTemp = parseFloat(weather.mintempC);
        this.ciudad.clima.maxTemp = parseFloat(weather.maxtempC);
        this.ciudad.clima.sensacionTermica = parseFloat(current.FeelsLikeC);
        this.ciudad.clima.precipitacion = parseFloat(current.precipMM);
        this.ciudad.clima.indiceUV = parseFloat(weather.uvIndex);
        
        this.vibracion.VibrarBien();
      } else {
        this.vibracion.VibrarError();
      }
    });

    // Llamada a (nominatim) ---
    this.clima.getCiudad(ciudadIngresada).subscribe((dataGeo) => {
      if (dataGeo && dataGeo.length > 0) {
        const lat = parseFloat(dataGeo[0].lat);
        const lon = parseFloat(dataGeo[0].lon);
        this.ciudad.nombre = ciudadIngresada;
        this.ciudad.ubicacion = { lat, lon };
        this.ciudad.nombreCompleto = dataGeo[0].display_name;
        
        this.vibracion.VibrarBien();

        // Llamada a (open-meteo) 
        this.clima.getClimaporCoords(lat, lon).subscribe((climaCoords) => {
          if (climaCoords && climaCoords.current_weather) {
            this.ciudad.clima.temperatura = climaCoords.current_weather.temperature;
          }
        });

      } else {
        console.error('Ciudad no encontrada');
        this.vibracion.VibrarError();
      } 
    });
  }
}