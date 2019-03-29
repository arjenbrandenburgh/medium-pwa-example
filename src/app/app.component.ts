import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { CheckForUpdateService } from './services/check-for-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-pwa-app';
  updateAvailable = false;

  constructor(private updates: SwUpdate,
              private checkForUpdateService: CheckForUpdateService) {
    this.updates.available.subscribe((event) => {
      console.log('avaiable!');
      this.updateAvailable = true;
    });
  }
}
