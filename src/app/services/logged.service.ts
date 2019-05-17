import { Injectable } from '@angular/core';

import { Logged } from '../model/logged.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedService {

  updateLoggedChanges = new Subject<Logged[]>();

  loggeds: Logged[] = [
    
  ]

  constructor() { }

  getAllLogged(){
    return this.loggeds.slice();
  }

  addToLog(log: Logged){
    this.loggeds.push(log);
    this.updateChanges();
  }

  updateLogged(index: number, newLogged: Logged){

    if( this.loggeds[index]  ){
      this.loggeds[index] = newLogged;
    }else{
      this.loggeds.push(newLogged);
    }
    this.updateChanges();
  }

  updateChanges(){
    this.updateLoggedChanges.next(this.loggeds.slice());
  }
}
