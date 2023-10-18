import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppConfigModule } from '../../../layout/config/app.config.module';
import { RippleModule } from 'primeng/ripple';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        AppConfigModule,
        RippleModule,
        SharedModule
    ],
    
    declarations: [LoginComponent]
})
export class LoginModule { }
