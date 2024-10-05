import { Component, OnInit } from '@angular/core';
import { CotizacionSualdoComponent } from '../cotizacion-sualdo/cotizacion-sualdo.component';
import { Cotizacion } from '../../model/Cotizacion';
import { CotizacionService } from '../../service/cotizacion.service';
import { Role } from '../../model/Role';
import { CommonModule } from '@angular/common';
import { GastoExtra } from '../../model/GastoExtra';

@Component({
  selector: 'app-cotizacion',
  standalone: true,
  imports: [CotizacionSualdoComponent, CommonModule],
  templateUrl: './cotizacion.component.html',
})
export class CotizacionComponent implements OnInit {
  cotizacion!: Cotizacion;

  // Valores globales
  sueldoBasico: number = 460;
  horasMes: number = 168;
  mesesAnio: number = 12;
  porcentajeIESS: number = 0.1115;
  totalManoObra: number = 16870.85;

  constructor(private service: CotizacionService) {}

  ngOnInit(): void {
    this.cotizacion = this.service.getCotizacion();
  }

  // Método para calcular el sueldo mensual de cada rol en el equipo
  sueldoMensualPorRol(role: Role): number {
    const aporteEmpleadorIess: number = role.salary * this.porcentajeIESS;
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

  // Método para calcular el costo por hora por cada rol
  sueldoHoraPorRol(role: Role): number {
    const costoEmpleador: number = this.sueldoMensualPorRol(role);
    const costoHora: number = costoEmpleador / this.horasMes;
    return this.redondear(costoHora);
  }

  // Método para calcular el sueldo total por rol en el proyecto
  sueldoTotalPorRol(role: Role): number {
    const sueldoHora: number = this.sueldoHoraPorRol(role);
    const sueldoProyectoPorRol: number =
      sueldoHora * role.quantityPerson * this.tiempoDesarrolloHoras();
    return this.redondear(sueldoProyectoPorRol);
  }

  // Método para calcular el sueldo total del proyecto completo
  sueldoTotalProyecto(role: Role): number {
    const sueldoHoraRol: number =
      this.sueldoHoraPorRol(role) * role.quantityPerson;
    const sueldoProyecto: number = sueldoHoraRol * this.tiempoDesarrolloHoras();
    return this.redondear(sueldoProyecto);
  }

  tiempoDesarrolloHoras(): number {
    return this.cotizacion.mesDuracion * this.horasMes;
  }

  //GASTOS EXTRAS
  gastoExtraSincantidad(gasto: GastoExtra): number {
    return gasto.costoMensual * this.cotizacion.mesDuracion;
  }
  gastoExtraConcantidad(gasto: GastoExtra): number {
    if (gasto.cantidadDispositivos === 0) {
      return this.gastoExtraSincantidad(gasto);
    } else {
      return (
        gasto.costoMensual *
        gasto.cantidadDispositivos! *
        this.cotizacion.mesDuracion
      );
    }
  }

  redondear(valor: number): number {
    return Math.round(valor * 100) / 100;
  }
}
