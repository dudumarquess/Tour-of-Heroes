import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private pets = ['Luna', 'Bob', 'Theo', 'Dara', 'Meggie'];

  getPets(): string[] {
    return this.pets;
  }
}
