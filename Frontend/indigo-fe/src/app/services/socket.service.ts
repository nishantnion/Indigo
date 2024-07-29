import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.socketUrl);
  }

  listenForFlightUpdates(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('flightUpdate', (data) => {
        observer.next(data);
      });
    });
  }

  listenForNotifications(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('appNotification', (data) => {
        observer.next(data);
      });
    });
  }
}