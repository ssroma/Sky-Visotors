import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
// importing moment.js a labrary to help with date and time format.
import * as moment from 'moment'
import { Prebook } from '../model/prebook.model';

@Component({
  selector: 'app-preebook',
  templateUrl: './preebook.component.html',
  styleUrls: ['./preebook.component.sass']
})
export class PreebookComponent implements OnInit {

  visitorCategory = ['Visitor', 'Contractor', 'Subcontractor'];
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
  prebookingArray: Prebook;

  // form
  prebookForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.todaysDate = this.getTodaysDate();
    this.todaysTime = this.getTodaysTime();
    this.myForm();

  }

  myForm(){
    this.prebookForm = this.fb.group({ 
      hostInput: [null, Validators.required ],
      visitCategory: ['Visitor', Validators.required],
      dateTime: this.fb.group({
        dateExpected: [this.todaysDate, Validators.required],
        timeExpected: [this.todaysTime, Validators.required],
        dateEnd: [this.todaysDate, Validators.required],
        timeEnd: [null, Validators.required]
      }),
      location: this.fb.array([])
    });

    this.addControls();
  }

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
  
  addControls(){
    this.locations.map((bjs, i) => {
        const control = new FormControl( i === 0);
        this.location.push( control );
    })
  }

  onSubmit(){
    console.log(this.prebookForm.value);
    const getLocationsName = () => {
      let arrayValue = [];
      this.prebookForm.get('location').value.forEach( (element, i) => {
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
    
  }

  getTodaysDate(){
    let today = moment().format('YYYY-MM-DD'); //new Date().toISOString().substr(0, 10);
    return today;
  }

  getTodaysTime(){
    let time = moment().format('hh:mm');
    return time;
  }
}
