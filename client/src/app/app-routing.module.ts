import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

    {
        path: '',
        loadChildren: './modules/qna/qna.module#QnaModule'
    },
    {
        path: 'task1',
        loadChildren: './modules/task1/task1.module#Task1Module'
    },
    {
        path: 'task2',
        loadChildren: './modules/task2/task2.module#Task2Module'
    },
    { 
        path: '**', 
        redirectTo: '/',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
