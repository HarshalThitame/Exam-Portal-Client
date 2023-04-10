import { Component, ElementRef, Host, Inject, Injectable, Input } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'swiper-container',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css']
})
export class SwiperComponent {
  @Input() public pager: any;
  @Input() public options: any;



  public swiper: any;
  public showPager: boolean = true;


  constructor(
    @Inject(ElementRef) private elementRef: ElementRef
  ) { }

  public ngOnInit() {
    let options = this.setDefaultOptions({}, this.options);

    const nativeElement = this.elementRef.nativeElement;
    this.swiper = new Swiper(nativeElement.children[0], this.options);
  }

  public update() {
    setTimeout(() => {
      this.swiper.update()
    });
  }

  private setDefaultOptions(dest: any, ...args: any[]) {
    for (let i = arguments.length - 1; i >= 1; i--) {
      let source = arguments[i] || {};
      for (let key in source) {
        if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
          dest[key] = source[key];
        }
      }
    }
    return dest;
  }
}

@Injectable()
@Component({
  selector: 'swiper-slide',
  template: '<div><ng-content></ng-content></div>'
})
export class SwiperSlide {
  private ele: HTMLElement;

  constructor(
    @Inject(ElementRef) elementRef: ElementRef,
    @Host() @Inject(SwiperComponent) swiper: SwiperComponent
  ) {
    this.ele = elementRef.nativeElement;
    this.ele.classList.add('swiper-slide');
    swiper.update();
  }

}
