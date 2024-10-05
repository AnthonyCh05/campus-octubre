import { Component, OnInit } from '@angular/core';
import { CotizacionSualdoComponent } from '../cotizacion-sualdo/cotizacion-sualdo.component';
import { DevelopmentTeam } from '../../model/DevelopmentTeam';
import { CotizacionService } from '../../service/cotizacion.service';
import { Role } from '../../model/Role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cotizacion',
  standalone: true,
  imports: [CotizacionSualdoComponent, CommonModule],
  templateUrl: './cotizacion.component.html',
})
export class CotizacionComponent implements OnInit {
  cotizacion!: DevelopmentTeam;

  // Valores globales
  sueldoBasico: number = 460;
  horasMes: number = 168;
  tiempoDesarrolloMes: number = 3;
  mesesAnio: number = 12;

  constructor(private service: CotizacionService) {}

  ngOnInit(): void {
    this.cotizacion = this.service.getCotizacion();
  }

  // Método para calcular el sueldo mensual de cada rol en el equipo
  sueldoMensualPorRol(role: Role): number {
    const aporteEmpleadorIess: number = role.salary * 0.1115;
    const decimotercerSueldo: number = role.salary / this.mesesAnio;
    const decimoCuartoSueldo: number = this.sueldoBasico / this.mesesAnio;
    const vaciones: number = role.salary / 2 / this.mesesAnio;
    const costoEmpleador: number =
      role.salary +
      aporteEmpleadorIess +
      decimotercerSueldo +
      decimoCuartoSueldo +
      vaciones;

    return this.redondear(costoEmpleador);
  }

  sueldoHoraPorRol(role: Role): number {
    const costoEmpleador: number = this.sueldoMensualPorRol(role);
    const costoHora: number = costoEmpleador / this.horasMes;
    return this.redondear(costoHora);
  }

  // Método para calcular el sueldo total del proyecto
  sueldoTotalProyecto(): number {
    let sueldoTotal = 0;

    this.cotizacion.developmentTeam.forEach((role) => {
      const sueldoHoraRol = this.sueldoHoraPorRol(role) * role.quantityPerson;
      sueldoTotal += sueldoHoraRol * this.tiempoDesarrolloHoras();
    });

    return this.redondear(sueldoTotal);
  }

  tiempoDesarrolloHoras(): number {
    return this.tiempoDesarrolloMes * this.horasMes;
  }

  redondear(valor: number): number {
    return Math.round(valor * 100) / 100;
  }
}
