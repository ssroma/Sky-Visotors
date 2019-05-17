import { Injectable } from '@angular/core';
import { Users } from '../model/users.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor() { }

  private users: Users[] = [
    new Users('Juan Almeida', 'Cisco', 'juanAlmeida@bbh.co.uk', '07943273453', 'Manoela Farias'),
    new Users('Nathaly Bread', 'Cisco', 'natyBread@cisco.co.uk', '07943422453', 'Antonio Fagundes'),
    new Users('Julio Trevor', 'Gain Capital', 'jtrevoe@gaincapital.co.uk', '07943453453', 'Marcelo Almeida'),
    new Users('Andrew Underwood', 'Tradelink', 'andrewunder@tradelink.co.uk', '07943273453', 'Tiago Alcantara' ),
    new Users('Monica pinkblue', 'DVB', 'mona@dvb.co.uk', '07943273453', 'Marcela Andrade'),
    new Users('Arthur Bulucci', 'DVB', 'mona@dvb.co.uk', '07943273453', 'Mark Perking'),
    new Users('Rodigo Amaral', 'DVB', 'mona@dvb.co.uk', '07943273453', ' Mark Perking '),
    new Users('Antonieta Amaral', 'CCT Info', 'mona@dvb.co.uk', '07943273453', 'cisco'),
    new Users('Janaina Pascol', 'TheLight', 'mona@dvb.co.uk', '07943273453', 'Cisco'),
    new Users('Janaina Pascol', 'TheLight', 'mona@dvb.co.uk', '07943273453', 'Marcelo Alcantara'),
  ]

  getUsers(){
    return this.users.slice();
  }

  getUser(visitorName: string){
    let user: Users;
    this.users.forEach( (name, i ) => {
      if( visitorName == name.userName){
        //console.log( `This is the userService reponse ${name.userName}` )
        return user = name;
      }
    })
    return user;
  }

  addUser(users: Users){
    this.users.push(users);
  }





}
