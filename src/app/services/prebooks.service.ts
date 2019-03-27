import { Injectable } from '@angular/core';

import { Prebook } from './../model/prebook.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrebooksService {

  updatePreebooksChange = new Subject<Prebook[]>();

  prebooks: Prebook[] = [
    new Prebook( 'Antonio Fagundes', 'Visitor', '2019-03-24', '10:00', '2019-03-19', '12:00', ['Park House']),
    new Prebook( 'Manoela Farias', 'Constructor', '2019-03-24', '15:00', '2019-03-19', '18:00', ['Cisco']),
    new Prebook( 'Marcela Andrade', 'Constructor', '2019-03-24', '15:00', '2019-03-19', '18:00', ['Cisco']),
    new Prebook( 'Tiago Alcantara', 'Constructor', '2019-03-24', '15:00', '2019-03-19', '18:00', ['Cisco']),
    new Prebook( 'Marcelo Almeida', 'Constructor', '2019-03-24', '15:00', '2019-03-19', '18:00', ['Cisco']),
  ]
  constructor() { }

  getAll(){
    return this.prebooks.slice();
  }

  getLast(){
    let last = this.prebooks.length - 1;
    return this.prebooks[last];
  }

  addPrebook(index: Prebook){
    this.prebooks.push(index);
    this.updateAll();
  }

  removeLast(){
    //const last = this.getLast();
    const deleted = this.prebooks.pop();
    this.updateAll();
    console.log('this has been deleted.'+ " => " + deleted);
    console.log(`PrebookArray =>  ${this.prebooks.length}`);
  }

  updateAll(){
    return this.updatePreebooksChange.next(this.prebooks.slice());
  }
  
}
