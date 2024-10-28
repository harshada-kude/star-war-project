import { Component, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SessionStorageService } from './services/session-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [SessionStorageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'star-war-app';

  constructor(private injector: Injector) {
    this.injector.get(SessionStorageService);
  }
}
