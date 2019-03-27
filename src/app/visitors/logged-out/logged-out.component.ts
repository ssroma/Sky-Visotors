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

  constructor(
    private loggedService: LoggedService
  ) { }

  ngOnInit() {

    this.loggedService.updateLoggedChanges
      .subscribe( (log: Logged[]) => {
        this.logged = log;
      })
      this.logged = this.loggedService.getAllLogged();
  }

}
