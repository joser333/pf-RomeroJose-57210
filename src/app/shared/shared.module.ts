import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcatPipe } from './pipes/concat.pipe';
import { FontSizeDirective } from './directives/font-size.directive';



@NgModule({
  declarations: [
    ConcatPipe,
    FontSizeDirective
  ],
  exports:[
    ConcatPipe,
    FontSizeDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
