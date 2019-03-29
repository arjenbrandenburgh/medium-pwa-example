import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';

import { WebNotificationService } from './../services/web-notification.service';

@Component({
  selector: 'app-notification-button',
  template: `
    <button (click)="submitNotification()">
       Notify me
    </button>
    <p *ngIf="isGranted" class="success">
      Notifications were granted by the user
    </p>
    <p *ngIf="!isEnabled" class="error">
      Notifications are not available in the browser or enabled in the application
    </p>
  `,
  styles: [`
    .success {
      color: green;
    }
    .error {
      color: red;
    }
  `]
})
export class NotificationComponent {
  isEnabled = this.swPush.isEnabled;
  isGranted = Notification.permission === 'granted';

  constructor(private swPush: SwPush,
              private webNotificationService: WebNotificationService) {}


  submitNotification(): void {
    this.webNotificationService.subscribeToNotification();
  }
}
