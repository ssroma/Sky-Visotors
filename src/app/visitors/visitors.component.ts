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

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    this.LoggerdOrEdit = this.router.url === '/visitors' ? 'Visitors Logged In' : 'Editing Visitor';
  }

}
