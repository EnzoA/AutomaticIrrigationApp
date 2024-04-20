import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[estado]'
})
export class EstadoDirective implements OnChanges {

  @Input() estado: boolean = false;
  @Input() abiertaColor: string = 'green';
  @Input() cerradaColor: string = 'red';

  constructor(private elementRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    const color = this.estado ? this.abiertaColor : this.cerradaColor;
    this.elementRef.nativeElement.style.backgroundColor = color;
  }
}
