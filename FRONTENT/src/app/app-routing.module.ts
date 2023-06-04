import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { TableRestapiComponent } from './components/table-restapi/table-restapi.component';
import { PostComponent } from './components/table-restapi/post/post.component';
import { TablefilterComponent } from './components/table-restapi/tablefilter/tablefilter.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  // route mặc định
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'pages-contact', component: PagesContactComponent },
  { path: 'pages-login', component: PagesLoginComponent },
  { path: 'pages-register', component: PagesRegisterComponent },
  { path: 'user-profile', component: UsersProfileComponent },
  // route cho trường hợp gõ sai đường dẫn
  //{ path: '**', component: PagesError404Component },
  //-------------------Orther-------------------
  { path: 'tablerestapi', component: TableRestapiComponent },
  { path: 'tablefilter', component: TablefilterComponent },
  { path: 'test-data', component: PostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy:PreloadAllModules
  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
