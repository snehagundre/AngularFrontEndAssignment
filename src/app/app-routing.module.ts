import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './shared/components/user-management/user-management.component';

const routes: Routes = [
 { path: '', redirectTo: '/user-management', pathMatch: 'full' },
  { path: 'user-management', component: UserManagementComponent },
  { path: '**', redirectTo: '/user-management' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
