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

    // gets players from dataservice
    this.players = this.dataService.getPlayers();

    // subscribes to method to get player from api
    this.dataService.getPlayerData().subscribe(player => {
      let newPlayerArray = [];
      for (let i = 0; i < player.length; i++) {
        newPlayerArray.push(player[i]['data']);
      }
      this.playerCard = newPlayerArray;
    });
  }

  // filters through search string on table view. The card view has a pipe to filter through
  doFilter = (value: string) => {
    if (!this.toggleInventory) {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }
  };
}
