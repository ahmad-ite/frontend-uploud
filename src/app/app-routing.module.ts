import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

import { environment } from '../environments/environment';
import { TestComponent } from './components/test/test.component';


const routes: Routes = [

  { path: '', component: TestComponent }
  ,

  { path: '**', redirectTo: '' },


];
@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { enableTracing: true, onSameUrlNavigation: 'reload', useHash: true })],
    RouterModule.forRoot(routes, { enableTracing: true, onSameUrlNavigation: 'reload', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }



