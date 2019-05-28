import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { LoggedService } from './../services/logged.service';
import { Logged } from './../model/logged.model';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.sass']
})
export class VisitorsComponent implements OnInit {

  LoggerdOrEdit: string;
  //logged: Logged[];
  toPrintInfo = {};
  //loggedToLoggedOut: Logged[] = [];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loggedService: LoggedService
  ){}

  ngOnInit() {
    this.LoggerdOrEdit = this.router.url === '/visitors' ? 'Visitors Signed In' : 'Editing Visitor';

    this.router.events.subscribe( url =>{
      if( location.pathname == '/visitors'){
        this.LoggerdOrEdit = 'Visitors Signed In';
      }else{
        this.LoggerdOrEdit = 'Editing Visitor';
      }
    }) 

    // this.loggedService.updateLoggedChanges
    //   .subscribe( (log) => { 
    //     this.logged = log;
    //   });
  }

  // Search logged In client 

  onSearchInput(searchInput: string){
    
    // this.logged.map( name => {
    //   if( searchInput == name.visitorName || searchInput == name.visitorCompany ){
    //     this.loggedToLoggedOut.push(name);
    //   } 
    // })
    this.loggedService.fromServiceToLoggedOut( searchInput );
  }


  // Printing finctions. 

  loggedInfoToPrint($event: Object){
      this.toPrintInfo = $event;
      //console.log(this.toPrintInfo )
  }

  closePrinting(){
    const close = document.querySelector('.divCard');
    close.classList.toggle('showHide');
  }

  printing(div: HTMLElement){
    const content = div.innerHTML;
    const mywindow = window.open('', 'Print', 'height=600, width=800');

    mywindow.document.write('<html><head><title>Print</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(content);
    mywindow.document.write('</body></html>');

    mywindow.document.close();
    mywindow.focus()
    mywindow.print();
    mywindow.close();
    this.closePrinting();
    //return true;
  }

}
