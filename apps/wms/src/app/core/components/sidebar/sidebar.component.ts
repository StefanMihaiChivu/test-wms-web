import { Component } from '@angular/core';
import { AuthService } from '../../services';

@Component({
  selector: 'wms-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  isVisible = true;
  constructor(private authService: AuthService) {}
  onLogout() {
    this.authService.logout();
  }
}
