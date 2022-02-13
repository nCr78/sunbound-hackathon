import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-find-volunteer',
  templateUrl: './find-volunteer.page.html',
  styleUrls: ['./find-volunteer.page.scss'],
})
export class FindVolunteerPage implements OnInit {

  constructor(private dataSrv: DataService, private router: Router, private snackBar: ToastController) { }

  ngOnInit() {
  }

  createFindVolunteerRequest() {
    this.snackBar.create({
      message: 'Created a volunteer request',
      duration: 7800});
    // this.dataSrv.createFindVolunteerRequest().then(e => this.router.navigate(['/tabs/tab1']));
  }
}
