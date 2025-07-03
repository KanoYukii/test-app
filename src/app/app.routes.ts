import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { VideoGamesListComponent } from './components/video-games-list.component';
import { VideoGameDetailsComponent } from './components/video-game-details.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'video-games',
    component: VideoGamesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'video-games/:id',
    component: VideoGameDetailsComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];
