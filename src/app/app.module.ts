import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { HomeComponent } from './home/home.component';
import { MetrikaModule } from './shared/metrika/metrika.module';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MetrikaModule.forRoot({
      id: (environment as {[key: string]: any})['analytics']?.yaMetrikaCounterId,
      webvisor: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
