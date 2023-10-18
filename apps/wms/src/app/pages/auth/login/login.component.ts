import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthService,
  LocalStorageService,
  UserService,
} from '../../../core/services';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  rememberMe = false;
  loginFormGroup: FormGroup;
  isSubmited = false;
  authError = false;
  authMessage = 'Incorrect username or password.';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {
    this.loginFormGroup = this.formBuilder.group({});
  }
  ngOnInit(): void {
    this._initForm();
  }

  private _initForm() {
    this.loginFormGroup = this.formBuilder.group({
      userName: ['', [Validators.required]], //, Validators.email
      password: ['', Validators.required],
    });
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
  onSubmit() {
    this.isSubmited = true;
    if (this.loginFormGroup.invalid) {
      return;
    }
    const credentials = {
      userName: this.loginForm['userName'].value,
      password: this.loginForm['password'].value,
    };
    this.authService
      .login(credentials.userName, credentials.password)
      .subscribe(
        (user) => {
          this.authError = false;
          this.localStorageService.setToken(user.token || '');
          this.router.navigate(['/']);
        },
        (error: HttpErrorResponse) => {
          this.authError = true;
          if (error.status !== 400) {
            this.authMessage = 'Server error. Please try again later.';
          }
        }
      );
  }
}
