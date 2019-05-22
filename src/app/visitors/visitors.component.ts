import { Component, OnInit } from '@angular/core';

import { Visitor } from './../model/visitor.model';
import { VisitorService } from '../services/visitor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.sass']
})
export class VisitorsComponent implements OnInit {

  LoggerdOrEdit: string;
  
  toPrintInfo = {};
  
  constructor(
    private router: Router,
    private route: ActivatedRoute
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
  }

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
