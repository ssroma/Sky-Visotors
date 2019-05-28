import { Injectable } from '@angular/core';

import { Logged } from '../model/logged.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedService {

  updateLoggedChanges = new Subject<Logged[]>();
  searchFoundFromService = new Subject<Logged[]>();
  loggedToLoggedOut: Logged[] = [];

  loggeds: Logged[] = [
      //new Logged( 'Junio Antunes', 'Juntos', 'Antonio Nobrega', 'Tontos', '25-04-2019', '11:00' )
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

  removeLogged(id: number){
    this.loggeds.splice(id, 1);
    this.updateChanges();
  }

  fromServiceToLoggedOut(searchInput: string){

    this.loggeds.map( name => {
      if( searchInput == name.visitorName || searchInput == name.visitorCompany ){
        this.loggedToLoggedOut.push(name);
      } 
    })
    this.searchFoundFromService.next(this.loggedToLoggedOut);

  }

  updateChanges(){
    this.updateLoggedChanges.next(this.loggeds.slice());
  }
}
