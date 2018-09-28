import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject <boolean> (true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    this.logs = [
      {id: '1', text: 'Neki bezze text', date: new Date ('09/26/2018 21:37:23')},
      {id: '2', text: 'Opet neki bezze text', date: new Date ('09/26/2018 21:39:36')},
      {id: '3', text: 'Opet još više bezze text', date: new Date ('09/26/2018 21:14:15')}
    ]
   }

   getLogs(): Observable<Log[]> {
     return of(this.logs);
   }

   setFormLogs(log: Log) {
     this.logSource.next(log);
   }

   addLog(log: Log) {
     this.logs.unshift(log);
   }

   updateLog(log: Log) {
    this.logs.forEach((cur, index) =>{
      if(log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
   }

   deleteLog(log: Log) {
     this.logs.forEach((cur, index) =>{
      if(log.id === cur.id) {
        this.logs.splice(index, 1);
      }
     });
   }

   clearState() {
     this.stateSource.next(true);
   }
   
}
