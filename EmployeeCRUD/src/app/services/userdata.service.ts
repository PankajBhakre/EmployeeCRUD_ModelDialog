import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  public getUser(){
    return [
      {id: 1,firstName: 'Frank', lastName: 'Murphy', email:'frank.murphy@test.com', role: 'User'},
      {id: 2,firstName: 'Vic', lastName: 'Reynolds', email:'vic.reynolds@test.com', role: 'Admin'},
      {id: 3,firstName: 'Gina', lastName: 'Jabowski', email:'gina.jabowski@test.com', role: 'Admin'},
      {id: 4,firstName: 'Jessi', lastName: 'Glaser', email:'jessi.glaser@test.com', role: 'User'},
      {id: 5,firstName: 'Jay', lastName: 'Bilzerian', email:'jay.bilzerian@test.com', role: 'User'},
      {id: 6,firstName: 'Pankaj', lastName: 'Bhakre', email:'xyz@test.com', role: 'Admin'},
      {id: 7,firstName: 'Raj', lastName: 'Nene', email:'raj.bilzerian@test.com', role: 'User'},
      {id: 8,firstName: 'Jay', lastName: 'Mittal', email:'jay.Mittal@test.com', role: 'Admin'},
    ]
  } 
  constructor() { }
}
