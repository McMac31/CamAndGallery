import { Injectable } from '@angular/core';
import { Haptics } from '@capacitor/haptics';

@Injectable({
  providedIn: 'root'
})
export class Vibracion {
  constructor() { } 
  
  VibrarBien() {
    Haptics.vibrate({duration:100});
    console.log('Vibración exitosa');
    
  }
  VibrarError() {
    Haptics.vibrate({ duration: 50});
    Haptics.vibrate({ duration: 50 });
    console.log('Vibración de error');
  }
  
}
