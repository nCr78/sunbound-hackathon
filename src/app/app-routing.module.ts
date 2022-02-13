import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['tabs']);
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'login',
    loadChildren: () => import('./login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'findNewRoute',
    loadChildren: () => import('./find-new-route/find-new-route.module').then(m => m.FindNewRouteModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'createNewRoute',
    loadChildren: () => import('./create-new-route/create-new-route.module').then(m => m.CreateNewRouteModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'register',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'showNearbyRoutes',
    loadChildren: () => import('./show-nearby-routes/show-nearby-routes.module').then( m => m.ShowNearbyRoutesPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'findVolunteer',
    loadChildren: () => import('./find-volunteer/find-volunteer.module').then( m => m.FindVolunteerPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
