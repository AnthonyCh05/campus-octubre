import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CotizacionComponent } from "./components/cotizacion/cotizacion.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CotizacionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EstimacionesApp';
}
