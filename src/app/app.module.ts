import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { UserDashboardComponent } from './shared/components/user-dashboard/user-dashboard.component';
import { MaterialMdule } from './shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './shared/components/user-details/user-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManagementComponent } from './shared/components/user-management/user-management.component';
import { AdminDetailComponent } from './shared/components/admin-detail/admin-detail.component';
import { CreateStaffComponent } from './shared/components/create-staff/create-staff.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    UserDashboardComponent,
    UserDetailsComponent,
    UserManagementComponent,
    AdminDetailComponent,
    CreateStaffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialMdule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
