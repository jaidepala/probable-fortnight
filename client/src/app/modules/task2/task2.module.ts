import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Task2RoutingModule } from './task2-routing.module';

// Shared Module
    import { SharedModule } from '../../shared/shared.module';
import { Task2Component } from './task2/task2.component';


@NgModule({
    declarations: [Task2Component],
    imports: [
        CommonModule,
        Task2RoutingModule,
        SharedModule
    ]
})
export class Task2Module { }
