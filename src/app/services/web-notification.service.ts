import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class WebNotificationService {
  readonly VAPID_PUBLIC_KEY = 'BPlFnM1my8zj0tXX4ZPKX6NxWD7pTKGYW8Gn9CLEtuBwo5--dk423Ywj_ubRekSKZ6_OrZ5tTQBqh9dAlMOESKY';
  private baseUrl = 'https://our-server-api.com/notifications';

  constructor(private http: HttpClient,
              private swPush: SwPush) {}

  subscribeToNotification() {
    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => this.sendToServer(sub))
    .catch(err => console.error('Could not subscribe to notifications', err));
  }

  sendToServer(params: any) {
    this.http.post(this.baseUrl, { notification : params }).subscribe();
  }
}
