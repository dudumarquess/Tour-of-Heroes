import { Component, OnInit } from '@angular/core';
import { PetService } from '../pet.service';
import { Pet } from '../pet';

@Component({
  selector: 'app-pets',
  standalone: false,
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  pets: Pet[] = []; // Agora é um array de objetos Pet

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.getPets();
  }

  getPets(): void {
    this.petService.getPets().subscribe(pets => this.pets = pets);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    // Adiciona o pet como objeto { name }
    this.petService.addPet(name).subscribe(newPet => {
      this.pets.push(newPet); // Adiciona o novo pet à lista de pets
    });
  }
}
