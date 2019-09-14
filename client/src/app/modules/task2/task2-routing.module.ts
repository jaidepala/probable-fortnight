import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Task2Component } from './task2/task2.component';

const routes: Routes = [
    {
        path: '',
        component: Task2Component
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Task2RoutingModule { }
