import { Injectable } from '@angular/core';
import { newPlayer } from '../models/NewPlayer';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  playerById: any[] = [1, 2, 3, 4, 9, 15, 23, 28, 35, 43, 44, 49, 65, 75];
  // 4, 9, 15, 23, 28 , 35,43,44,49,65,75
  players: newPlayer[];
  playerUrl: string = 'https://soccer.sportmonks.com/api/v2.0/players/';

  constructor(private http: HttpClient) {
    this.players = [
      {
        first_name: 'Tom ',
        last_name: 'Beck',
        team: 'Barcelona',
        position: 'Midfielder',
        birthday: '05/10/1985'
      },
      {
        first_name: 'Luis',
        last_name: 'Suarez',
        team: 'Manchester United',
        position: 'Forward',
        birthday: '03/24/1990'
      },
      {
        first_name: 'Daniel',
        last_name: 'Hue',
        team: 'Manchester City',
        position: 'Goalkeeper',
        birthday: '01/05/1995'
      },
      {
        first_name: 'Alex',
        last_name: 'Sanchez',
        team: 'Real Madrid',
        position: 'Defender',
        birthday: '11/09/1981'
      }
    ];
  }

  getPlayers(): newPlayer[] {
    return this.players;
  }

  getPlayerData() {
    let newArr = this.playerById
      .map(id => {
        let url = this.playerUrl + id + '?';
        return url;
      })
      .map(data => {
        return this.http.get(data);
      });

    return forkJoin(newArr);
  }

  addPlayer(player: newPlayer) {
    this.players.unshift(player);
  }
}
