import { Injectable } from '@angular/core';
import { developmentTeamData } from '../data/role';
import { Cotizacion } from '../model/Cotizacion';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private cotizacion: Cotizacion = developmentTeamData;

  constructor() { }

  getCotizacion(): Cotizacion{
    return this.cotizacion;
  }
}
