import { Injectable } from '@angular/core';
import { newPlayer } from '../models/NewPlayer';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  players: newPlayer[];

  constructor() {
    this.players = [
      {
        first_name: 'Hello',
        last_name: 'Hydrogen',
        team: 'Barca',
        position: 'Mid',
        birthday: '5/10/2002'
      },
      {
        first_name: 'Hello',
        last_name: 'Hydrogen',
        team: 'ManU',
        position: 'GK',
        birthday: '5/10/2007'
      },
      {
        first_name: 'Hello',
        last_name: 'Hydrogen',
        team: 'City',
        position: 'Mid',
        birthday: '5/10/2005'
      },
      {
        first_name: 'Hello',
        last_name: 'Hydrogen',
        team: 'Real',
        position: 'Forward',
        birthday: '5/10/2009'
      }
    ];
  }

  getPlayers(): newPlayer[] {
    return this.players;
  }

  addPlayer(player: newPlayer) {
    this.players.unshift(player);
  }
}
