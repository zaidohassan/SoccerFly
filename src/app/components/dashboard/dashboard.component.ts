import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { newPlayer } from '../../models/NewPlayer';
import { DataService } from '../../services/data.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  selected = 'Goalkeeper';
  hideRequired = 'true';
  today = new Date();
  player: newPlayer = {
    first_name: '',
    last_name: '',
    team: '',
    position: 'Goalkeeper',
    birthday: ''
  };
  players: newPlayer[];
  @ViewChild('userForm') form: any;
  @ViewChild('chart')
  refChart: ElementRef;
  chartData: any;

  constructor(private dataService: DataService) {
    this.chartData = {};
  }

  count = { GoalKeeper: 0, Defender: 0, MidFielder: 0, Forward: 0 };

  ngOnInit() {
    // Gets Players in Service component and sets it to array so I can use for ChartJS
    this.players = this.dataService.getPlayers();

    // counts the number of players in each position
    this.players.map(player => {
      if (player.position === 'Goalkeeper') {
        this.count.GoalKeeper++;
      } else if (player.position === 'Defender') {
        this.count.Defender++;
      } else if (player.position === 'Midfielder') {
        this.count.MidFielder++;
      } else {
        this.count.Forward++;
      }
    });

    // Reduce does the same like the map on top but is causing infitinte loop?!

    // this.count = this.players.reduce(
    //   (totals, p) => ({
    //     ...totals,

    //     [p.position]: (totals[p.position] || 0) + 1
    //   }),
    //   {}
    // );

    // initalizes the data
    this.chartData = {
      labels: ['Goalkeeper', 'Defender', 'MidFielder', 'Forward'],
      datasets: [
        {
          data: [
            this.count.GoalKeeper,
            this.count.Defender,
            this.count.MidFielder,
            this.count.Forward
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }
      ]
    };
  }

  ngAfterViewInit() {
    // chart takes a while to load to DOM and needs to be rendered after the init is intalized
    let chart = this.refChart.nativeElement;
    let ctx = chart.getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'bar',
      data: this.chartData,
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1
              }
            }
          ]
        },
        legend: {
          display: false
        }
      }
    });
  }

  // submits the data to add to players data in dataservice
  onSubmit({ value, valid }: { value: newPlayer; valid: boolean }) {
    if (!valid) {
      console.log('hi');
    } else {
      this.dataService.addPlayer(value);
      this.player = {
        first_name: '',
        last_name: '',
        team: '',
        position: 'Goalkeeper',
        birthday: ''
      };
      // this.form.reset();
    }
  }
}
