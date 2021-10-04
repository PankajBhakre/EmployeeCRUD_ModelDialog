import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from '../app/AngularMaterial/material.module';
import { UserdataService } from './services/userdata.service';
import { SearchPipe } from './shared/search.pipe';
import { UserComponent } from './components/user/user.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AdduserComponent } from './components/adduser/adduser.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AdduserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    ToastrModule.forRoot(),
  ],
  providers: [UserdataService,SearchPipe, ToastrService],
  entryComponents:[AdduserComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
