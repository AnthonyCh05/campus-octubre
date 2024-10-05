import { Component } from '@angular/core';
import { CotizacionSualdoComponent } from '../cotizacion-sualdo/cotizacion-sualdo.component';

@Component({
  selector: 'app-cotizacion',
  standalone: true,
  imports: [CotizacionSualdoComponent],
  templateUrl: './cotizacion.component.html',
})
export class CotizacionComponent {

}
