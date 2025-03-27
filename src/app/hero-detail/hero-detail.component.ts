import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { PetService } from '../pet.service';
import { Pet } from '../pet';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  pets: Pet[] = [];
  selectedPet: Pet | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private petService: PetService
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getPets();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Retorna string ou null
    if (id) {
      // A conversão para string é desnecessária, já que o id já é do tipo string
      this.heroService.getHero(id).subscribe(hero => this.hero = hero);
    } else {
      console.error("ID do herói não encontrado na rota");
    }
  }
  
  

  getPets(): void {
    this.petService.getPets()
      .subscribe(pets => this.pets = pets); // 🔹 Agora usamos subscribe corretamente
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero && this.selectedPet) {
      this.hero.petId = this.selectedPet; // Associando o pet ao herói
      
      this.heroService.updateHero(this.hero).subscribe({
        next: () => this.goBack(),
        error: (error) => console.error('Erro ao salvar herói:', error)
      });
    }
  }
  
  

  
}