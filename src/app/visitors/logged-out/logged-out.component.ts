import { Logged } from './../../model/logged.model';
import { Component, OnInit } from '@angular/core';

import { LoggedService } from 'src/app/services/logged.service';

@Component({
  selector: 'app-logged-out',
  templateUrl: './logged-out.component.html',
  styleUrls: ['./logged-out.component.sass']
})
export class LoggedOutComponent implements OnInit {

  logged: Logged[];
  searchLogged: Logged[];
  selectedUl: HTMLElement;
  activateButton: boolean =  false;
  toDeleteFromLogged: number;

  constructor(
    private loggedService: LoggedService
  ) { }

  ngOnInit() {

    this.loggedService.updateLoggedChanges
      .subscribe( (log: Logged[]) => {
        this.logged = log;
      })

    this.logged = this.loggedService.getAllLogged();

    this.loggedService.searchFoundFromService
      .subscribe( (log: Logged[]) => {
        if(log.length > 0){
          this.logged = log;
          console.log( this.logged );
        }else{
          this.logged = this.loggedService.getAllLogged();
          console.log( this.logged );
        }
      })
  }

  selectVisitor(selected: HTMLElement, id: number){
    this.selectedUl = selected;
    let liText = [];
    selected.classList.forEach( cls => {
      if( cls === "ulSelected" ){
        selected.classList.remove("ulSelected");
        this.activateButton = false;
      }else{
        selected.classList.add("ulSelected");
        this.activateButton = true;
      }
    })
    
    selected.childNodes.forEach( (li) => {
        liText.push(li.textContent); 
    });
    this.toDeleteFromLogged = id;
  }

  onSignOut(){
    if(this.activateButton){

      this.logged.splice(this.toDeleteFromLogged, 1); 

      this.selectedUl.classList.remove('ulSelected');
      this.loggedService.removeLogged(this.toDeleteFromLogged);
     
      this.loggedService.searchFoundFromService
      .subscribe( (log: Logged[]) => {
        if(log.length > 0){
          this.logged = log;
          console.log( this.logged );
        }else{
          this.logged = this.loggedService.getAllLogged();
          console.log( this.logged );
        }
      })

    }
  }

  onDelete(){
    this.onSignOut();
  }




}
