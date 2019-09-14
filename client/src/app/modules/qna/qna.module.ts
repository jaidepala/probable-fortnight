import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QnaRoutingModule } from './qna-routing.module';
import { QnaComponent } from './qna/qna.component';

// Shared Module
    import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [QnaComponent],
    imports: [
        CommonModule,
        QnaRoutingModule,
        SharedModule
    ]
})
export class QnaModule { }
