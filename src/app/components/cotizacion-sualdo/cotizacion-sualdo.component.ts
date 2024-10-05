import { Component } from '@angular/core';

import { developmentTeamData } from '../../data/role';

@Component({
  selector: 'cotizacion-sualdo',
  standalone: true,
  imports: [],
  templateUrl: './cotizacion-sualdo.component.html',
})
export class CotizacionSualdoComponent {
  sueldoBasico: number = 460;
  horasMes: number = 168;
  tiempoDesarrolloMes: number = 3;
  mesesAnio: number = 12;
  sualdoDev: number = 500;
  numeroDesarrolladores: number = 4;

  sueldoMensualDev(): number {
    const aporteEmpleadorIess: number = this.sualdoDev * 0.1115;
    const decimotercerSueldo: number = this.sualdoDev / this.mesesAnio;
    const decimoCuartoSueldo: number = this.sueldoBasico / this.mesesAnio;
    const vaciones: number = this.sualdoDev / 2 / this.mesesAnio;
    const costoEmpleador: number =
      this.sualdoDev +
      aporteEmpleadorIess +
      decimotercerSueldo +
      decimoCuartoSueldo +
      vaciones;

    return this.redondear(costoEmpleador);
  }

  sueldoHoraDev(): number {
    const costoEmpleador: number = this.sueldoMensualDev();
    const costoHora: number = costoEmpleador / this.horasMes;
    return this.redondear(costoHora);
  }

  tiempoDesarrolloHoras(): number {
    return this.tiempoDesarrolloMes * this.horasMes;
  }

  sueldoTotalProyecto(): number {
    const devHoraSualdoMensual:number = this.sueldoHoraDev() * this.numeroDesarrolladores;
    const sueldoProyecto: number = devHoraSualdoMensual * this.tiempoDesarrolloHoras();
    return this.redondear(sueldoProyecto);
  }

  redondear(valor: number): number {
    return Math.round(valor * 100) / 100;
  }
}
