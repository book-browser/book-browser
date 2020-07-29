import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AutofocusFixModule } from 'ngx-autofocus-fix';
import { TruncatePipe } from './pipe/truncate.pipe';
import { BookPageComponent } from './book-page/book-page.component';
import { ReplaceLineBreaksPipe } from './pipe/replace-line-breaks.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BookPageComponent,
    TruncatePipe,
    ReplaceLineBreaksPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    AutofocusFixModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
