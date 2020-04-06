import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-update-component',
  template: `
    <h1>Check for update</h1>
    <p>Click below to check if there's an update available:</p>
    <button (click)="checkForUpdate()">Check for update</button>
  `
})
export class UpdateComponent {
  constructor(private swUpdate: SwUpdate) {
    this.swUpdate.available.subscribe(event => {
      console.log('New update available');
      this.updateToLatest();
    });
  }

  checkForUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate().then(() => {
          console.log('Checking for updates...');
      }).catch((err) => {
          console.error('Error when checking for update', err);
      });
    }
  }

  updateToLatest(): void {
    console.log('Updating to latest version.');
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }
}
