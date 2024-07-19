import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFontSize]'
})
export class FontSizeDirective {

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.fontSize='20px';
   }

}
