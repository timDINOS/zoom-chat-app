import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { RecordingsComponent } from './recordings/recordings.component';
import { MeetingCreationComponent } from './meeting-creation/meeting-creation.component';
import { MeetingJoinComponent } from './meeting-join/meeting-join.component';

const routes : Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component:   ProfileComponent },
    { path: 'users', component: UsersComponent },
    { path: 'recordings', component: RecordingsComponent },
    { path: 'meeting-creation', component: MeetingCreationComponent },
    { path: 'meeting-join', component: MeetingJoinComponent },
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
