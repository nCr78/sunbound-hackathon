import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-volunteer',
  templateUrl: './find-volunteer.page.html',
  styleUrls: ['./find-volunteer.page.scss'],
})
export class FindVolunteerPage implements OnInit {

  constructor(private dataSrv: DataService, private router: Router) { }

  ngOnInit() {
  }

  createFindVolunteerRequest() {
    // this.dataSrv.createFindVolunteerRequest().then(e => this.router.navigate(['/tabs/tab1']));
  }
}
