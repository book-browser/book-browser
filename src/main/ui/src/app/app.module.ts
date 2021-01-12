import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutofocusFixModule } from 'ngx-autofocus-fix';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookPageComponent } from './book-page/book-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NewBookComponent } from './page/new-book/new-book.component';
import { RegisterSuccessComponent } from './page/register-success/register-success.component';
import { RegisterComponent } from './page/register/register.component';
import { SearchComponent } from './page/search/search.component';
import { UserVerifyComponent } from './page/user-verify/user-verify.component';
import { ReplaceLineBreaksPipe } from './pipe/replace-line-breaks.pipe';
import { TruncatePipe } from './pipe/truncate.pipe';
import { MatchDirective } from './validator/match.directive';
import { UniqueUserDirective } from './validator/unique-user.directive';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BookPageComponent,
    TruncatePipe,
    ReplaceLineBreaksPipe,
    RegisterComponent,
    MatchDirective,
    UniqueUserDirective,
    RegisterSuccessComponent,
    UserVerifyComponent,
    SearchComponent,
    NewBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    AutofocusFixModule.forRoot()
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
