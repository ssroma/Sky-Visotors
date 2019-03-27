import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Visitor } from './../model/visitor.model';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  updateVisitorsChange = new Subject<Visitor[]>();

  visitors: Visitor[] = [
    new Visitor( 'Joaquim Amago', 'Toros', 'Steve Breaky', 'Ultimate', '25-03-2019', '09:00')
  ]

  constructor() { }

  getAllVisitor(){
    return this.visitors.slice();
  }

  addVisitor(visitor: Visitor){
    this.visitors.push(visitor);
    this.updateAll();
  }

  removeVisitorLogged(id: number){
    this.visitors.splice(id, 1);
    this.updateAll();
  }

  updateAll(){
    this.updateVisitorsChange.next(this.visitors.slice());
  }

}
