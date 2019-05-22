import { Component, OnInit, ViewChild } from '@angular/core';

import { LoggedService } from './../../services/logged.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Visitor } from 'src/app/model/visitor.model';
import { VisitorService } from 'src/app/services/visitor.service';
import { FormControl, NgForm } from '@angular/forms';
import { Logged } from './../../model/logged.model';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.sass']
})
export class EditingComponent implements OnInit {

  @ViewChild('f') editingFom: NgForm;
  id: number;
  visitorToEdit: Visitor;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private visitorsServce: VisitorService,
    private loggedService: LoggedService
  ){ }

  ngOnInit() {
    
    this.route.paramMap
      .subscribe( param => {
        this.id = +param.get('id')
      
        if( this.id  !== null){
          this.visitorToEdit = this.visitorsServce.getVisitor(this.id);
          // To complay with date standard.
          let day = this.visitorToEdit.dateExpected.slice(0, 2);
          let month = this.visitorToEdit.dateExpected.slice(3, 5 );
          let year = this.visitorToEdit.dateExpected.slice(6, 11 );
          let date = `${year}-${month}-${day}`;
          
          setTimeout( () => {
            this.editingFom.setValue({
              visitorName: this.visitorToEdit.visitorName,
              visitorCompany: this.visitorToEdit.visitorCompany,
              hostName: this.visitorToEdit.hostName,
              hostCompany: this.visitorToEdit.hostCompany,
              dateExpected: date,
              timeExpected: this.visitorToEdit.timeExpected
            })
          },)
        }
      })
  }

  onSubmit(form: FormControl){
    const f = form.value;
    const updateVisitor = new Visitor(f.visitorName, f.visitorCompany, f.hostName, f.hostCompany, f.dateExpected, f.timeExpected );
    this.visitorsServce.updateVisitor(this.id, updateVisitor);
    this.router.navigate(['../'], {relativeTo: this.route } );
  }

}
