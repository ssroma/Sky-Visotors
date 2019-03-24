import { Injectable } from '@angular/core';
import { Users } from '../model/users.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor() { }

  private users: Users[] = [
    new Users('Juan Almeida', 'BBH', 'juanAlmeida@bbh.co.uk', '07943273453'),
    new Users('Nathaly Bread', 'Cisco', 'natyBread@cisco.co.uk', '07943422453'),
    new Users('Julio Trevor', 'Gain Capital', 'jtrevoe@gaincapital.co.uk', '07943453453'),
    new Users('Andrew Underwood', 'Tradelink', 'andrewunder@tradelink.co.uk', '07943273453'),
    new Users('Monica pinkblue', 'DVB', 'mona@dvb.co.uk', '07943273453'),
  ]

  getUsers(){
    return this.users.slice();
  }



}
