import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  TransportadorasComponent } from './transportadoras/transportadoras.component';
import {  SaveupdateComponent } from './saveupdate/saveupdate.component';

const routes: Routes = [{ path: '', component: TransportadorasComponent },
                        { path: 'saveupdate', component: SaveupdateComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
