import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterPageComponent } from './modules/counter-page/components/counter-page/counter-page.component';

const routes: Routes = [
  {
    path: 'counter',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/counter-page/counter-page.module').then(
        (m) => m.CounterPageModule
      ),
  },
  {
    path: 'list',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/list-page/list-page.module').then(
        (m) => m.ListPageModule
      ),
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: CounterPageComponent,
    // TODO: It should be HomeComponent/ Home Module
  },
  {
    path: '**',
    component: CounterPageComponent,
    // TODO: It should be PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
