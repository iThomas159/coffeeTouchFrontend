import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StartComponent } from './components/start/start.component';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CoffeeComponent } from './components/coffee/coffee.component';
import { BookedComponent } from './components/booked/booked.component';

const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'coffee', component: CoffeeComponent },
  { path: 'booked', component: BookedComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    CoffeeComponent,
    BookedComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

