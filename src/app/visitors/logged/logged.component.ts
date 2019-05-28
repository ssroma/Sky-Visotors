import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Logged } from './../../model/logged.model';
import { Visitor } from 'src/app/model/visitor.model';
import { VisitorService } from 'src/app/services/visitor.service';
import { LoggedService } from 'src/app/services/logged.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.sass']
})
export class LoggedComponent implements OnInit {

  visitors: Visitor[];
  activateButton: boolean =  false;
  selectedUl: HTMLElement;
  toLoggedOut: Logged;
  toDeletefromVisitor: number

  toPrintInfo = {
    name: '',
    company: '',
    date: ''
  }
  @Output() loggedToprint = new EventEmitter<any>();
    

  constructor(
    private visitorService: VisitorService,
    private loggedService: LoggedService,
    private router: Router,
    private route: ActivatedRoute
  ){ }

  ngOnInit() {
    this.visitorService.updateVisitorsChange
    .subscribe((visitor: Visitor[]) => {
      this.visitors = visitor;
    })
    this.visitors = this.visitorService.getAllVisitor();
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
    this.toLoggedOut = new Logged( liText[0], liText[1], liText[4], liText[5], liText[2], liText[3] ); 
    this.toDeletefromVisitor = id;
  }

  onLogLogged(){
    if(this.activateButton){
      this.selectedUl.classList.remove("ulSelected");
      this.loggedService.addToLog(this.toLoggedOut);
      this.visitorService.removeVisitorLogged(this.toDeletefromVisitor);
      this.activateButton = false;
    }
  }

  onEditLogged(){
    //this.visitorService.editingVisitor.next(this.toDeletefromVisitor);
    if(this.activateButton){
      this.selectedUl.classList.remove("ulSelected");
      this.router.navigate( [this.toDeletefromVisitor], { relativeTo: this.route} );
      this.activateButton = false;
    }
  }

  onPrintLogged(){
    const toPrint = document.querySelector('.divCard');
    if(this.activateButton){
      this.selectedUl.classList.remove("ulSelected");
      //set the details to be sento to parent component div to be printed.
      this.toPrintInfo.name = this.toLoggedOut.visitorName;
      this.toPrintInfo.company = this.toLoggedOut.visitorCompany;
      this.toPrintInfo.date = this.toLoggedOut.dateExpected;
      // Emit the event to the parent.
      this.loggedToprint.emit(this.toPrintInfo);
      toPrint.classList.toggle('showHide');
      this.activateButton = false;
    }
  }

  onDeleteLogged(){
    if(this.activateButton){
      this.selectedUl.classList.remove("ulSelected");
      this.activateButton = false;
      this.visitorService.removeVisitorLogged(this.toDeletefromVisitor);
    }
  }




}
