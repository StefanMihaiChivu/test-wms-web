import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../../../core/services';
import { User } from '../../../core/models';

@Component({
  selector: 'wms-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent {
  users: User[] = [];
  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((result) => {
      this.users = result.users;
    });
  }

  deleteUser(userId: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.deleteUser(userId).subscribe(() => {
          this.users = this.users.filter(u => u.id != userId);
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Item deleted succesfully',
          });
        });
      },
    });
  }
}

