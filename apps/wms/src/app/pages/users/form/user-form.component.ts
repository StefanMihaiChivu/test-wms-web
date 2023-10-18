import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { UserService } from '../../../core/services';
import { User } from '../../../core/models';



@Component({
  selector: 'wms-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  editMode = false;
  form: FormGroup;
  isSubmited = false;
  currentUserId = -1;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this._initForm();
    this._checkEditMode();
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.userService
          .getUserById(params['id'])
          .subscribe((user: User) => {
            this.currentUserId = params['id'];
            this.userForm['firstName'].setValue(user.firstName);
            this.userForm['email'].setValue(user.email);
            this.userForm['lastName'].setValue(user.lastName);
            this.userForm['image'].setValue(user.image);
          });
      }
    });
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      lastName: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  get userForm() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserId,
      firstName: this.userForm['firstName'].value,
      email: this.userForm['email'].value,
      lastName: this.userForm['lastName'].value,
      image: this.userForm['image'].value
    };
    if (this.editMode) {
      this.userService.editUser(user).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User updated succesfully',
        });
        timer(1000)
          .toPromise()
          .then(() => this.location.back());
      });
    } else {
      this.userService.addUser(user).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'New item was added succesfully',
        });
        timer(2000)
          .toPromise()
          .then(() => this.location.back());
      });
    }
  }
  onCancel() {
    this.location.back();
  }
}
