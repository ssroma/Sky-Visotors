import { Injectable } from '@angular/core';

import { Visitor } from './../model/visitor.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  updateVisitorsChange = new Subject<Visitor[]>();
  editingVisitor = new Subject<number>();
  
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
  
  getVisitor(index: number){
    return this.visitors[index];
  }

  updateVisitor(index: number, newLogged: Visitor){

    if( this.visitors[index]  ){
      this.visitors[index] = newLogged;
    }else{
      this.visitors.push(newLogged);
    }
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
