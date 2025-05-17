import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { HomeSiteComponent } from './components/site/home-site/home-site.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    { 
        path: "home-site",
        component: HomeSiteComponent
    },
    { 
        path: "login",
        component: LoginComponent
    },
    {
        path: 'home', component: HomeComponent, canActivate: [AuthGuard]
    },
    {
        path: 'dashboard', component: DashBoardComponent, canActivate: [AuthGuard]
    }
];
