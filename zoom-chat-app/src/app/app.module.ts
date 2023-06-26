import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { RecordingsComponent } from './recordings/recordings.component';
import { MeetingCreationComponent } from './meeting-creation/meeting-creation.component';
import { MeetingJoinComponent } from './meeting-join/meeting-join.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UsersComponent,
    RecordingsComponent,
    MeetingCreationComponent,
    MeetingJoinComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
