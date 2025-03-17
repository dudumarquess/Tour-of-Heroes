import { Component, OnInit} from '@angular/core';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css'
})
export class PetsComponent {
  pets: string[] = [];

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.pets = this.petService.getPets();
  }
}
