import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Pet } from './pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private petsUrl = 'api/pets'
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.petsUrl).pipe(
      tap(_ => console.log('fetched pets')),  // Loga quando os pets são recuperados
      catchError(this.handleError<Pet[]>('getPets', []))  // Trata erros
    );
  }

  addPet(petName: string): Observable<Pet> {
    const pet: Pet = { name: petName };  // Cria um novo pet com o nome fornecido
    return this.http.post<Pet>(this.petsUrl, pet, this.httpOptions).pipe(
      tap((newPet: Pet) => console.log(`added pet: ${newPet.name}`)),  // Loga quando um pet é adicionado
      catchError(this.handleError<Pet>('addPet'))  // Trata erros
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);  // Exibe mensagem de erro
      return of(result as T);  // Retorna o valor resultante em caso de erro
    };
  }
  updatePet(pet: Pet): Observable<any> {
      return this.http.put(this.petsUrl, pet, this.httpOptions).pipe(
        tap(_ => this.log(`updated pet name=${pet.name}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
