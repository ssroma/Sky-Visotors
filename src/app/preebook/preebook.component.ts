import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// importing moment.js a labrary to help with date and time format.
import * as moment from 'moment'
import { Prebook } from '../model/prebook.model';
import { PrebooksService } from '../services/prebooks.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-preebook',
  templateUrl: './preebook.component.html',
  styleUrls: ['./preebook.component.sass']
})
export class PreebookComponent implements OnInit {

  visitorCategory = ['', 'Visitor', 'Contractor', 'Subcontractor'];
  locations = [
    { id: 1, company: 'Park House' }, 
    { id: 2, company: 'Brown Brothers Harrimwn' }, 
    { id: 3, company: 'Alvarez & Marsal' }, 
    { id: 4, company: 'Cisco' }, 
    { id: 5, company: 'DVB' }, 
    { id: 6, company: 'Gain Capital' }, 
    { id: 7, company: 'Paragon' }, 
    { id: 8, company: 'TradLink'  }, 
  ];
  todaysDate: string;
  todaysTime: string;
  todaysTimePlus: string;

  prebookingArray: Prebook;

  // form
  prebookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private prebookService: PrebooksService
  ) { }

  ngOnInit() {
    this.todaysDate = this.getTodaysDate();
    this.todaysTime = this.getTodaysTime();
    this.todaysTimePlus = this.getTodaysTimePlus();
    this.myForm();

  }
// PreebookForm.
  myForm(){
    this.prebookForm = this.fb.group({ 
      hostInput: [null, Validators.required],
      visitCategory: [null, Validators.required],
      dateTime: this.fb.group({
        dateExpected: [this.todaysDate],
        timeExpected: [this.todaysTime],
        dateEnd: [this.todaysDate],
        timeEnd: [this.todaysTimePlus]
      }),
      location: this.fb.array([], Validators.required)
    });

    this.addControls();
  }

// getters fo the form's field.
  get hostInput(){
    return this.prebookForm.get('hostInput');
  }
  get visitCategory(){
    return this.prebookForm.get('visitCategory');
  }

  get dateTime(){ // get the group. 
    return this.prebookForm.get('dateTime');
  }

  get dateExpected(){
    return this.dateTime.get('dateExpected');
  }

  get timeExpected(){
    return this.dateTime.get('timeExpected');
  }

  get dateEnd(){
    return this.dateTime.get('dateEnd');
  }

  get timeEnd(){
    return this.dateTime.get('timeEnd');
  }

  get location(){
    return this.prebookForm.get('location') as FormArray
  }
// creating a formControl to be add to the formArray.
  addControls(){
    this.locations.map((bjs, i) => {
        const control = new FormControl(null, [Validators.required, this.checkBoxCheck]);
        this.location.push( control );
    })
  }

  onSubmit(){
    
    const getLocationsName = () => {
      let arrayValue = [];
      this.prebookForm.get('location').value.forEach( (element: any, i: number) => {
        if( element === true ){
          arrayValue.push( this.locations[i].company);
        }
      });
      return arrayValue;
    }

    const hostName = this.hostInput.value;
    const visitCategory = this.visitCategory.value;
    const expectedDate = this.dateExpected.value;
    const expectedTime = this.timeExpected.value;
    const endDate = this.dateEnd.value;
    const endTime = this.timeEnd.value;
    const location = getLocationsName();

    this.prebookingArray = new Prebook(hostName, visitCategory, expectedDate, expectedTime, endDate, endTime, location);
    this.prebookService.addPrebook(this.prebookingArray);
    //console.log(this.prebookingArray);
    // navagate away. 
    this.router.navigate(['user'] );
  }

// get the Date
  getTodaysDate(){
    let today = moment().format('YYYY-MM-DD'); //new Date().toISOString().substr(0, 10);
    return today;
  }
// get the time 
  getTodaysTime(){
    let time = moment().format('HH:mm');
    return time;
  }
// get the time plus 2 hours
  getTodaysTimePlus(){
    let time = moment((new Date())).add(2, 'hour').format('HH:mm');
    return time;
  }
// update the changes on checkBoxCheck a custom validation.
  resetValidations(){
    this.location.updateValueAndValidity();
    this.location.controls.map(i =>{
      i.updateValueAndValidity();
    })
  }
// custom validator.
  checkBoxCheck(control: AbstractControl){
    if(control.value === null){
      //console.log( control.value )
    }else{
      const local = (<FormArray>control.root.get('location'));
      for(let i = 0; i < local.controls.length; i++ ){
        local.controls[i].clearValidators();
      }
    }
    return null;
  }


}
