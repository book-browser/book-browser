import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { BookPageComponent } from './book-page/book-page.component';
import { RegisterComponent } from './page/register/register.component';
import { RegisterSuccessComponent } from './page/register-success/register-success.component';
import { UserVerifyComponent } from './page/user-verify/user-verify.component';
import { SearchComponent } from './page/search/search.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'book/:id', component: BookPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/success', component: RegisterSuccessComponent },
  { path: 'user/verify', component: UserVerifyComponent },
  { path: 'search', component: SearchComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
