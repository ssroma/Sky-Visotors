import { Component, OnInit } from '@angular/core';

import { Visitor } from './../model/visitor.model';
import { VisitorService } from '../services/visitor.service';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.sass']
})
export class VisitorsComponent implements OnInit {

  constructor(){}

  ngOnInit() {

  }

}
