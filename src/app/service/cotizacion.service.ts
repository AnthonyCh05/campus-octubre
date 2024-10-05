import { Injectable } from '@angular/core';
import { developmentTeamData } from '../data/role';
import { DevelopmentTeam } from '../model/DevelopmentTeam';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private cotizacion: DevelopmentTeam = developmentTeamData;

  constructor() { }

  getCotizacion(): DevelopmentTeam{
    return this.cotizacion;
  }
}
