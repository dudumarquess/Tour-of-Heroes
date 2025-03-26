import { Pet } from './pet'; 

export interface Hero {
    _id?: string;
    name: string;
    petId?: Pet;  // petId agora é do tipo Pet
}
