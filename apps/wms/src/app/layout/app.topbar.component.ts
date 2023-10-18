import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { AuthService, UserService } from '../core/services';
import { take } from 'rxjs';
import { User } from '../core/models';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopbarComponent implements OnInit {
  @ViewChild('menuButton') menuButton!: ElementRef;

  @ViewChild('mobileMenuButton') mobileMenuButton!: ElementRef;

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(
    public layoutService: LayoutService,
    public el: ElementRef,
    private userService: UserService,
    private authService: AuthService
  ) {}

  activeItem!: number;

  model: MegaMenuItem[] = [];

  user: User = new User();

  ngOnInit(): void {
    this.userService
      .observeCurrentUser()
      .pipe(take(2))
      .subscribe((user: User) => {
        this.user = user; 
      });
  }

  get mobileTopbarActive(): boolean {
    return this.layoutService.state.topbarMenuActive;
  }
  onLogout() {
    this.authService.logout();
  }

  onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }

  onRightMenuButtonClick() {
    this.layoutService.openRightSidebar();
  }

  onMobileTopbarMenuButtonClick() {
    this.layoutService.onTopbarMenuToggle();
  }

  focusSearchInput() {
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 0);
  }
}
