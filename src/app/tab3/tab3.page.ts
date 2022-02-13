import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private authSrv: AuthService, private router: Router) {}

  logout() {
    this.authSrv.logout().then(e => {
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }
}
