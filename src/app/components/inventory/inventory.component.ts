import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { newPlayer } from '../../models/NewPlayer';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  players: newPlayer[];
  filteredPlayers: newPlayer[];
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'team',
    'position',
    'birthday'
  ];
  // private _searchWord: string;

  // get searchWord(): string {
  //   return this._searchWord;
  // }

  // set searchWord(value: string) {
  //   this._searchWord = value;
  //   this.filteredPlayers = this.filterPlayer(value);
  // }

  // filterPlayer(searchTerm: string) {
  //   return this.players.filter(player => {
  //     player.team.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
  //   });
  // }
  dataSource = new MatTableDataSource(this.players);

  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.players = this.dataService.getPlayers();
    // this.filteredPlayers = this.players;
  }
}
