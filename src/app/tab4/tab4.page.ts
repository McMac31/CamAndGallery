import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonSearchbar, IonCard, IonCardHeader, IonCardTitle,IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { EstacionMeteorologica } from '../services/estacion-meteorologica';
import { Vibracion } from '../services/vibracion';

export interface Ciudad{
nombre: string;
nombreCompleto:string
ubicacion: {lat:number, lon:number};
clima:{temperatura:number,minTemp:number,maxTemp:number,humedad:number,descripcion:string,velocidadViento:number};

 }
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonSearchbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent],
})

export class Tab4Page {
 
  constructor(private clima: EstacionMeteorologica,  private vibracion: Vibracion) { }
 

  //Inicializo el objeto vacio para rellenarlo luego
  public ciudad: Ciudad={
    nombre: '',
    nombreCompleto: '',
    ubicacion: {lat:0, lon:0},
    clima: {temperatura:0,minTemp:0,maxTemp:0,humedad:0, descripcion:'',velocidadViento:0}

  };

onSearch(event: any) {
  const ciudadIngresada= event.target.value;
  this.clima.getClima(ciudadIngresada).subscribe((data) => {
    if(data != null){
    this.ciudad.clima.descripcion=data.current_condition[0].lang_es[0].value;
    this.ciudad.clima.humedad=data.current_condition[0].humidity;
    this.ciudad.clima.velocidadViento=data.current_condition[0].windspeedKmph;
    this.ciudad.clima.minTemp=data.weather[0].mintempC;
    this.ciudad.clima.maxTemp=data.weather[0].maxtempC;
    this.vibracion.VibrarBien();
  }
  else{
    this.vibracion.VibrarError();
  }
}
);
  this.clima.getCiudad(ciudadIngresada).subscribe((data) => {
    if (data.length > 0) {
      //Formateo latitud y longitud porque devulve string y el enlace pide numerp
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      this.ciudad.nombre = ciudadIngresada;
      this.ciudad.ubicacion = { lat, lon };
      this.ciudad.nombreCompleto = data[0].display_name;
      this.clima.getClimaporCoords(lat, lon).subscribe((climaData) => {
      this.ciudad.clima.temperatura = climaData.current_weather.temperature;
      });
      this.vibracion.VibrarBien();
    }
    else {
      console.error('Ciudad no encontrada');
      this.vibracion.VibrarError();
    } 
  });
}
}