import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppLayoutModule } from './layout/app.layout.module';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import {
  DashboardComponent,
  ItemListComponent,
  ItemFormComponent,
  UserListComponent,
  UserFormComponent
} from './pages';
import { ShellComponent, SidebarComponent } from './core/components';
import { AuthInterceptor } from './core/services';

import { appRoutes } from './app.routes';

import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SidebarModule } from 'primeng/sidebar';
import { PasswordModule } from 'primeng/password';
import { FileUploadModule } from 'primeng/fileupload';
import { SplitterModule } from 'primeng/splitter';

import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';

import { ConfirmationService, MessageService } from 'primeng/api';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './state/users.reducer';
import { UsersEffects } from './state/users.effects';
import { UsersFacade } from './state/users.facade';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const UI_MODULE = [
  CardModule,
  ToastModule,
  ToolbarModule,
  TableModule,
  ButtonModule,
  ConfirmDialogModule,
  MessagesModule,
  InputNumberModule,
  InputTextModule,
  InputTextareaModule,
  InputSwitchModule,
  SidebarModule,
  PasswordModule,
  FileUploadModule,
  CalendarModule,
  SliderModule,
  MultiSelectModule,
  ContextMenuModule,
  DialogModule,
  DropdownModule,
  ProgressBarModule,
  TagModule,
  RadioButtonModule,
  SplitterModule,
  ChartModule,
  MenuModule,
];

const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    ItemListComponent,
    ItemFormComponent,
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ...UI_MODULE,
    AppLayoutModule,
    StoreDevtoolsModule,
    StoreModule.forRoot({ users: fromUsers.usersReducer }),
    EffectsModule.forRoot([UsersEffects]),
    StoreDevtoolsModule.instrument({ logOnly: !isDevMode() }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UsersFacade,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
