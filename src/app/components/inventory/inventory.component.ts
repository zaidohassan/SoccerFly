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
  players: newPlayer[] = this.dataService.getPlayers();
  playerCard = [];
  toggleInventory: boolean = false;
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'team',
    'position',
    'birthday'
  ];
  data: any;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService) {}

  dataSource = new MatTableDataSource(this.players);

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.players = this.dataService.getPlayers();

    this.dataService.getPlayerData().subscribe(player => {
      let newPlayerArray = [];
      for (let i = 0; i < player.length; i++) {
        newPlayerArray.push(player[i]['data']);
      }
      this.playerCard = newPlayerArray;
    });
  }

  doFilter = (value: string) => {
    if (!this.toggleInventory) {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    } else {
    }
  };
}

// this.playerCard.filter(player => {
//   console.log(player);
//   Object.values(player).includes(value);
// });
// .map(playerCard => {
//   console.log(playerCard);
//   playerCard;
// });
