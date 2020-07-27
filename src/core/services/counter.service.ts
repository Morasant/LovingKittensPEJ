import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

public contadorMatagatos: number;
public contadorFavoritos: number;

constructor() {
  this.contadorMatagatos = 0;
  this.contadorFavoritos = 0;
}

public setContadorMatagatos(data: number){
  this.contadorMatagatos = data;
}

public getContadorMatagatos(){
  console.log(this.contadorMatagatos);
  return this.contadorMatagatos;
}

public setContadorFavoritos(data: number){
  this.contadorMatagatos = data;
}

public getContadorFavoritos(){
  return this.contadorMatagatos;
}

}
