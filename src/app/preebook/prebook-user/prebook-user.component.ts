import { Visitor } from './../../model/visitor.model';
import { Prebook } from './../../model/prebook.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrebooksService } from './../../services/prebooks.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { Subscription } from 'rxjs';
import { VisitorService } from 'src/app/services/visitor.service';
import { Users } from 'src/app/model/users.model';

@Component({
  selector: 'app-prebook-user',
  templateUrl: './prebook-user.component.html',
  styleUrls: ['./prebook-user.component.sass']
})
export class PrebookUserComponent implements OnInit, OnDestroy {

  myUserForm: FormGroup;
  prebooks: Prebook[];
  visitors: Visitor[];
  hostNameValue: string;
  hostLastEntry: Prebook;
  visitedThisHost = [];
  visitedThisHostAmount: number;
  destroySubscription: Subscription;
  reVisiting: Users = null;

  constructor(
    private userService: UsersService,
    private visitorService: VisitorService,
    private router: Router,
    private route: ActivatedRoute,
    private prebookService: PrebooksService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    // get the latest updated prebookService 
    this.destroySubscription = this.prebookService.updatePreebooksChange
      .subscribe((prebooks: Prebook[]) => {
        this.prebooks = prebooks;
    })

    this.prebooks = this.prebookService.getAll();
    this.hostNameValue = this.prebookService.getLast()['hostName'];
    this.hostLastEntry = this.prebookService.getLast();
    this.lookingForVisitor();
    this.myForm();
    
  }

  private myForm(){
    this.myUserForm = this.fb.group({
      userName: [null, Validators.required],
      companyName: [null],
      userEmail: [null],
      userPhone: [null],
      hostName: [this.hostNameValue]
    })
  }

  get userName(){
    return this.myUserForm.get('userName');
  }

  get companyName(){
    return this.myUserForm.get('companyName');
  }
  get userEmail(){
    return this.myUserForm.get('userEmail');
  }
  get userPhone(){
    return this.myUserForm.get('userPhone');
  }
  get hostName(){
    return this.myUserForm.get('hostName');
  }

  creatingUsers(){
    const users = {
      userName: this.userName.value,
      userCompany: this.companyName.value,
      userEmail: this.userEmail.value,
      userPhone: this.userPhone.value,
      hostName: this.hostName.value,
    }
    const addUser = new Users( users.userName, users.userCompany, users.userEmail, users.userPhone, users.hostName );
    this.userService.addUser(addUser);
  }

  creatingVisitor(){
    
    const visitor = {
      visitorName: this.userName.value,
      visitorCompany: this.companyName.value,
      hostName: this.hostLastEntry['hostName'],
      hostCompany: this.hostLastEntry['location'][0],
      dateExpected: this.hostLastEntry['dateExpected'],
      timeExpected: this.hostLastEntry['timeExpected'],
    }
    const addVisitor = new Visitor( visitor.visitorName, visitor.visitorCompany, visitor.hostName, visitor.hostCompany, visitor.dateExpected, visitor.timeExpected ); 
    this.visitorService.addVisitor(addVisitor);
  }

  populateWithFormWithUserCredentials(visitor: string){
    this.reVisiting = this.userService.getUser(visitor);
    this.myUserForm.setValue({
      userName : [this.reVisiting['userName'] ],
      companyName: [this.reVisiting['company']],
      userEmail: [this.reVisiting['email']],
      userPhone: [this.reVisiting['phone']],
      hostName: [this.reVisiting['hostName']],
    })
  }

  onSubmit(){
    //console.log(this.myUserForm);
    // add creatingVisitor here
    this.creatingVisitor();
    // add creating users here 
    if( this.reVisiting == null ){
      this.creatingUsers();
    }
    
    this.router.navigate(['visitors'])
  }

  lookingForVisitor(){
    let users = this.userService.getUsers();
    for(let user of users){
      if(user['hostName'].toUpperCase().trim() === this.hostNameValue.toUpperCase().trim()){
        this.visitedThisHost.push( user['userName']);
      } 
    }
    this.visitedThisHostAmount = this.visitedThisHost.length;
  }

  cancelEntry(){
    this.prebookService.removeLast();
    this.router.navigate(['visitors'])
  }

  ngOnDestroy(){
    //this.destroySubscription.unsubscribe();
  }

}
