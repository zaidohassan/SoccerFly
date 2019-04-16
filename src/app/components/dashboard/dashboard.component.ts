import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { newPlayer } from '../../models/NewPlayer';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selected = 'Goalkeeper';
  hideRequired = 'true';
  today = new Date();
  error = false;
  player: newPlayer = {
    first_name: '',
    last_name: '',
    team: '',
    position: 'Goalkeeper',
    birthday: ''
  };
  @ViewChild('userForm') form: any;

  @Output() addPlayer: EventEmitter<newPlayer> = new EventEmitter();
  constructor(private dataService: DataService) {}

  ngOnInit() {}

  onSubmit({ value, valid }: { value: newPlayer; valid: boolean }) {
    if (!valid) {
      this.error = true;
    } else {
      this.dataService.addPlayer(value);
      this.player = {
        first_name: '',
        last_name: '',
        team: '',
        position: 'Goalkeeper',
        birthday: ''
      };
      this.form.reset();
    }
  }
}
